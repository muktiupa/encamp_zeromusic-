import {useState,useEffect} from "react";
import Image from "next/image";
import Moment from "moment";
import Link from "next/link";

const EventBookingDetails = (props)=>{

const {AOS,base_url,paymentdetails,sendMail} = props;
const [loading , setLoading] = useState(false);
const {payment_id,order_id,ordertotal,amount,checkindate,contact,email,name,prductdetails,isadvance,tag,ordertotalobj} = paymentdetails;
const nameofproduct = prductdetails.name;
const tripindays = prductdetails.grandtotal.gdays;
const nooftravellers = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.newnopeople ? ordertotalobj.billingDetails.requirement.newnopeople : 1;  
const subtotal = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.subtotal ? ordertotalobj.billingDetails.requirement.subtotal : 0;
const total = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.actualsubtotal ? ordertotalobj.billingDetails.requirement.actualsubtotal : 0;
const rate = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.total ? ordertotalobj.billingDetails.requirement.total : 0;
const cf = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.carboncess ? ordertotalobj.billingDetails.requirement.carboncess : 0;
const gst = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.taxat5percent ? ordertotalobj.billingDetails.requirement.taxat5percent : 0;
const packagess = ordertotalobj && ordertotalobj.package ? ordertotalobj.package : '';
const gstsetting = "exclusive";
const othercharges = '';
const cfcharges = true;
const addons = ordertotalobj && ordertotalobj.hasOwnProperty('addons') ? ordertotalobj.addons.toString() : "No Addon Selected.";
const addontotal = ordertotalobj && ordertotalobj.billingDetails && ordertotalobj.billingDetails.requirement && ordertotalobj.billingDetails.requirement.addontotal ? ordertotalobj.billingDetails.requirement.addontotal : 0;
const invoicedate = Moment(new Date()).format('DD/MM/YYYY');


useEffect(() => {
    AOS.init({
        disable: 'mobile',
    });
    AOS.refresh();

  }, [AOS]);

useEffect(()=>{
const createinvoice=async()=>{
if(payment_id && order_id){
console.log("Location Created Successfully");
const ress = await fetch("/api/invoice",{
                                          method:'POST',
                                          body: JSON.stringify({payment_id,order_id,ordertotal,amount,checkindate,contact,email,name,prductdetails,isadvance,nameofproduct,nooftravellers,invoicedate,subtotal,cf,gst,gstsetting,othercharges,cfcharges,addontotal,addons,rate,total,tripindays}),
                                          headers: {"Content-type": "application/json; charset=UTF-8"} 
                                        }
                              );
    if(ress.status === 200 || ress.data === 'success' ) {
           //sending email
      let subject = `Booking Confirmation: ${nameofproduct}`;
      let html = `Dear ${name},`;
      html += "<p>" + `Thank you for choosing Encamp Adventures for ${nameofproduct}.` + "</p>"; 
      html += "<p>" + "We are pleased to confirm the details of your booking: " + "</p>";
      html +="<li>" + `Package Name: ${packagess}`+ "</li>";
      html +="<li>" + `Checkin Date: ${checkindate}`+ "</li>";
      html +="<li>" + `Stay Duration: ${tripindays}`+ "</li>";
      html +="<li>" + `Number of Guests: ${nooftravellers}`+ "</li>";
      html += "<p>" + `Please note that the balance of your trip must be paid in full no later than ${checkindate}` + "</p>";
      html += "<p>" + `Should you have any questions or concerns, please do not hesitate to contact us at support@encampadventures.com or  +91 84533 09463` + "</p>";
      html += "<p>" + `We look forward to providing you with an exceptional experience with us!` + "</p>";
      html += "<p></p><div>" + "Sincerely," + "</div>";
      html += "<div>" + "Encamp Support" + "</div>";
      html += "<div>" + "support@encampadventures.com" + "</div>";
      html += "<div>" + "+91 84533 09463" + "</div>";

     let maildata = {
        email:email,
        subject:subject,
        text:html,
        iscc:true,
        attachments:[
                    {
                      filename:`INVOICE-${order_id}.pdf`,
                      path:'/public/invoice.pdf' 
                    }]
                   };
    let mailresponse = await sendMail(maildata);
   if(mailresponse){
    console.log('Mail has been sent');
    }else{
    console.log('Mail server error');  
    }

    }
}
}
createinvoice();
setLoading(false);
},[payment_id])


return (
	  <main className="main overflow-hidden">                          
        <section className="booking__hero__area faq__hero__area" style={{backgroundImage:`url('${base_url}/assets/img/booking__bg.jpg')`}}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="booking__hero__content" data-aos="fade-up" data-aos-delay="50"
                            data-aos-duration="1000">
                            <h1>Booking {payment_id ? 'Successful!' : 'Failed!'}</h1>
                            <p>We are a purpose-driven travel enterprise offering hassle-free, end-to-end experiences. A
                                signatory to the Tourism Declares a Climate Emergency.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="information__area2">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="information2__single__blk" data-aos="fade-right" data-aos-delay="50"
                            data-aos-duration="1000">
                            <div className="information2__title">
                                <h2>Booking Information</h2>
                            </div>
                            <div className="information2__single__content">
                                <span>Booking ID</span>
                                <h4>{order_id ? order_id : ""}</h4>
                            </div>
                            <div className="information2__single__content">
                                <span>Payment ID</span>
                                <h4>{order_id ? payment_id : ""}</h4>
                            </div>
                            <div className="information2__single__content">
                                <span>Guest Name</span>
                                <h4>{order_id ? name : ""}</h4>
                            </div>
                              <div className="information2__single__content">
                                <span>Contact Details</span>
                                <h4>
                                {order_id ? ` Mobile number: ${contact}` : ''}
                                 <br/> 
                                 {order_id ? `Email: ${email}` : ''}
                                 </h4>
                            </div>
                            <div className="information2__single__content">
                                <span>Property name</span>
                                <h4>{order_id ? nameofproduct : ""}</h4>
                            </div>
                            <div className="information2__single__content">
                                <span>Order Total</span>
                                <h4>{order_id ? ordertotal : ""}</h4>
                            </div>
                             <div className="information2__single__content">
                                <span>Trip Date</span>
                                <h4>{order_id  ? checkindate : ""}</h4>
                            </div>
                          
                            {isadvance === 'yes' ? 
                            <div className="information2__single__content">
                                <span>Advance Paid</span>
                                <h4>{order_id ? Math.floor(amount/100): ""}</h4>
                            </div>:""}
                            <div className="information2__btn__blk">
                                <Link passHref href="/"><a className="common__btn">Go to Homepage</a></Link>
                            </div>
                        </div>
                    </div>
                {/* <div className="col-lg-6 col-md-6">
                        <div className="information2__right__blk information2__single__blk" data-aos="fade-left"
                            data-aos-delay="50" data-aos-duration="1000">
                            <div className="information2__title">
                                <h2>Booking Information</h2>
                            </div>
                            <div className="information2__main__wrap">
                                <div className="information2__wrap"
                                    style={{backgroundImage: `"url('assets/img/carbon_bg.jpg')"`}}>
                                    <div className="information2__top__carbon">
                                        <div className="carbon__sp__wrap">
            
                                            <Image src={`/assets/img/carbon-sp.png`} alt="carbon-sp.png" object-fit='contain' layout = 'fill'/>
                                            <div className="carbon__sp__content">
                                                <h4>{order_id ? prductdetails.grandtotal.gcf : ""}KGS</h4>
                                                <p>Carbon Saved</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="information2__tag__wrap">
                                        <div className="information2__tags">
                                            <span>#SustainableTravel</span>
                                            <span>#NorthEast</span>
                                        </div>
                                        <div className="information2__carbon__btn">
                                            <a href="#" className="common__btn">How We Calculate</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="information2__social__blk">
                                    <h4>Share On</h4>
                                    <div className="information__socials">
                                        <a href="#">Fb</a>
                                        <a href="#">Tw</a>
                                        <a href="#">In</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </div>
            </div>
        </section>
        </main>
	   )

}
export default EventBookingDetails;