import adminapi from "../../api/adminapi";
const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
 console.log(req.body)
  if (req.method === "POST") {
 //const tokentocheck = req.body.token;
 //adminapi.defaults.headers.common={'Authorization': 'Bearer ' + tokentocheck};
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const payment_capture = 1;
    let amount,isadvance,name;
    if(req.body.advance){
    amount = Math.round(req.body.advance) || 0;
    isadvance = "yes";
    }else{

    amount = req?.body?.bookedItenary?.grandtotal?.gprice ?? null;
   if(!amount){
     amount = req?.body?.bookedItenary?.grandtotal?.[0]?.gprice ?? 0;
   }
   
     isadvance = "no";
    }
  
    name = req.body.firstName + " " + req.body.lastName;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      let responsedata ={
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        name:name,
        email:req.body.email,
        phone:req.body.contact,
        prductdetails:req.body.bookedItenary,
        addons:req.body.addons ? req.body.addons : [],
        carbonproject:req.body.carbonproject ? req.body.carbonproject : [],
        ordertotal:req?.body?.bookedItenary?.grandtotal?.gprice ?? req?.body?.bookedItenary?.grandtotal?.[0]?.gprice,
        status:"pending",
        checkindate:(req.body.travelDate.hasOwnProperty('noofdays')) ? req.body.travelDate.start : req.body.travelDate,
        isadvance:isadvance,
        tag:(req.body.bookedItenary.category === "Location") ? 'Accomodation' : req.body.bookedItenary.category,
        clientId:req?.body?.clientId ?? null

      }
//saving the order in our database
let paymentobj = [{ 
                   order_id:response.id,
                   payment_id:"",
                   payment_link_id:"",
                   payment_url:"",
                   status:'pending',
                   t_date:"",
                   amount:Math.ceil(amount),
                   remarks:"",
                   trantype:"Website-Transfer" 
                }];
let ordertotal = {};
ordertotal.billingDetails = req.body.bookedItenary.grandtotal;
ordertotal.paymentobj = paymentobj;
ordertotal.travellers = req.body.travellers;
ordertotal.addons = req.body.addons ? req.body.addons : [];
ordertotal.carbonproject = req.body.carbonproject ? req.body.carbonproject : [];
ordertotal.package = req.body.accommodationtype ? req.body.accommodationtype : '';
 
 
let datatosave = {
        payment_id:"",
        order_id: response.id,
        signature:"",
        name:name,
        contact:req.body.contact,
        email:req.body.email,
        currency: response.currency,
        amount:response.amount,
        prductdetails:req.body.bookedItenary,
        ordertotal:ordertotal,
        status:"pending",
        checkindate:(req.body.travelDate.hasOwnProperty('noofdays')) ? req.body.travelDate.start : req.body.travelDate,
        isadvance:isadvance,
        tag:(req.body.bookedItenary.category === "Location") ? 'Accomodation' : req.body.bookedItenary.category,
        clientId:req?.body?.clientId ?? null
      };

const localresponse = await adminapi.post("/addpayment",JSON.stringify(datatosave));
       if(localresponse.data._id !== ""){
        res.status(200).json(responsedata);
      }else{
        res.status(400).json("data not save");
      }
       
        } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } 
}