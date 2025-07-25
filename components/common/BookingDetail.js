import {useEffect} from "react";
import Moment from "moment";
import Link from "next/link";

const BookingDetails = (props)=>{

const {AOS,base_url,paymentdetails,iten,sendMail} = props;
const {payment_id,order_id,ordertotal,amount,checkindate,contact,email,name,prductdetails,isadvance,tag,ordertotalobj,carbonadjustmentdetails} = paymentdetails;
const nameofproduct = (tag ==='Accomodation') ? prductdetails.name : prductdetails.itineraryindex[0].nameite;
const tripindays = prductdetails.grandtotal.gdays;
const nooftravellers = ordertotalobj && ordertotalobj.hasOwnProperty('travellers') ? ordertotalobj.travellers : 1;
const subtotal = ordertotalobj && ordertotalobj.hasOwnProperty('subtotal') ? ordertotalobj.subtotal : 0;
const cf = ordertotalobj && ordertotalobj.hasOwnProperty('cf') ? ordertotalobj.cf : 0;
const gst = ordertotalobj && ordertotalobj.hasOwnProperty('gst') ? ordertotalobj.gst : 0;
const gstsetting = "exclusive";
const othercharges = '';
const cfcharges = true;
const carboncertifivateurl = `https://admin.carbontrace.in/certificate/client/${carbonadjustmentdetails.client_id}?sale_order_id=${carbonadjustmentdetails.sale_order_id}`;


const invoicedate = Moment(new Date()).format('DD/MM/YYYY');

useEffect(() => {
    AOS.init({
        disable: 'mobile'
    });
    AOS.refresh();

  }, [AOS]);

useEffect(()=>{
const createinvoice=async()=>{
if(payment_id && order_id){
     const res = await fetch("/api/pdf",{
                                         method: "POST",
                                         body: JSON.stringify({payment_id,order_id,ordertotal,amount,checkindate,contact,email,name,prductdetails,isadvance,nameofproduct,iten,nooftravellers}),
                                         headers: {"Content-type": "application/json; charset=UTF-8"} 
                                        });
    if(res.status === 200 || res.data === 'success'){
      console.log("Iteneary Created Successfully");
      const ress = await fetch("/api/invoice",{
                                                method:'POST',
                                                body: JSON.stringify({payment_id,order_id,ordertotal,amount,checkindate,contact,email,name,prductdetails,isadvance,nameofproduct,iten,nooftravellers,invoicedate,subtotal,cf,gst,gstsetting,othercharges,cfcharges}),
                                                headers: {"Content-type": "application/json; charset=UTF-8"} 
                                              }
                              );
    if(ress.status === 200 || ress.data === 'success' ) {
           //sending email
      let subject = `Booking Confirmation: ${nameofproduct}`;
      let html = `Dear ${name},`;
      html += "<div>" + `Thank you for choosing Encamp Adventures for your upcoming trip.` + "</div>"; 
      html += "<div>" + "We are pleased to confirm the details of your booking: " + "</div>";
      html +="<li>" + `Trip Start Date: ${checkindate}`+ "</li>";
      html +="<li>" + `Trip Duration: ${tripindays}`+ "</li>";
      html +="<li>" + `Number of Guests: ${nooftravellers}`+ "</li>";
      html += "<div>" + `Please note that the balance of your trip must be paid in full no later than ${checkindate}` + "</div>";
      html += "<div>" + `Should you have any questions or concerns, please do not hesitate to contact us at support@encampadventures.com or  +919643182259` + "</div>";
      html += "<div>" + `We look forward to providing you with an exceptional experience with us!` + "</div>";
      html += "<p></p><div>" + "Sincerely," + "</div>";
      html += "<div>" + "Encamp Support" + "</div>";
      html += "<div>" + "support@encampadventures.com" + "</div>";
      html += "<div>" + "+919643182259" + "</div>";

     let maildata = {
        email:email,
        subject:subject,
        text:html,
        iscc:true,
        attachments:[{
                      filename:`Trip-Details-${iten}.pdf`,
                      path:'/public/details.pdf'
                    },
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


     }else{
       console.log("Invoice creation error");  
    } 
}


}
createinvoice();
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
                                <span>Traverller</span>
                                <h4>{order_id ? name : ""}</h4>
                            </div>
                              <div className="information2__single__content">
                                <span>Contact Details</span>
                                <h4>{order_id ? ` Mobile number: - ${contact} Email: - ${email} `: ""}</h4>
                            </div>
                            <div className="information2__single__content">
                                <span>Trip</span>
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
                            <div className="information2__single__content">
                                <span>Carbon footprint during the Trip </span>
                                <h4>{carbonadjustmentdetails?.carbon_footprint ?? ''}</h4>
                                <small>Certificate of Carbon nutralization: <Link href ={carboncertifivateurl} passHref legacyBehavior><a target="_new">click here</a></Link></small>
                            </div>
                              <div className="information2__btn__blk">
                                <Link passHref href="/"><a className="common__btn">Go to Homepage</a></Link>
                            </div>
                        </div>
                    </div>
              
                </div>
            </div>
        </section>
        </main>
	   )

}
export default BookingDetails;