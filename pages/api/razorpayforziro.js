import adminapi from "../../api/adminapi";
const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {

  if (req.method === "POST") {
 //const tokentocheck = req.body.token;
 const nameofpackage = req?.body?.nameofpackage ?? '';

// adminapi.defaults.headers.common={'Authorization': 'Bearer ' + tokentocheck};
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
    amount = Math.round(req.body.orderbookingdata.subtotal) || 0;
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
 let addons = req.body.addons && req.body.addons.length > 0 ? req.body.addons.toString() : '';
 const currentYear = new Date().getFullYear();
  
    try {
      const response = await razorpay.orders.create(options);
      let responsedata ={
        id: response.id,
        currency: response.currency,
        amount: response.amount,
        name:name,
        email:req.body.email,
        phone:req.body.contact,
        prductdetails: `${nameofpackage} Encamp ZFM ${currentYear} Package`,
        ordertotal:req.body.orderbookingdata.subtotal,
        status:"pending",
        checkindate: req?.body?.checkindate ?? '',
        isadvance:isadvance,
        tag: 'Ziro_Festival'

      }
      console.log(responsedata);
//saving the order in our database
let paymentobj = [{ 
                   order_id:response.id,
                   payment_id:"",
                   payment_link_id:"",
                   payment_url:"",
                   status:'pending',
                   t_date:"",
                   amount:Math.ceil(amount),
                   remarks: addons!=='' ? `${nameofpackage} Encamp ZFM ${currentYear} Package , Add-ons: ` + addons : `${nameofpackage} Encamp ZFM ${currentYear} Package`,
                   trantype:"Website-Transfer" 
                }];
let ordertotal = {};
ordertotal.billingDetails = req.body.orderbookingdata.subtotal;
ordertotal.paymentobj = paymentobj;
ordertotal.travellers = req.body.travellers;

 
let datatosave = {
        payment_id:"",
        order_id: response.id,
        signature:"",
        name:name,
        contact:req.body.contact,
        email:req.body.email,
        currency: response.currency,
        amount:response.amount,
        prductdetails: addons!=='' ? `${nameofpackage}  Encamp ZFM ${currentYear} Package , Add-ons: ` + addons : `${nameofpackage}  Encamp ZFM ${currentYear} Package`,
        ordertotal:ordertotal,
        status:"pending",
        checkindate:req?.body?.checkindate ?? '',
        isadvance:isadvance,
        tag:'Ziro_Festival'
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