import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Link from "next/link";

const CancellationPolicy=()=>{


return(
	   <>
	   <HtmlHead/>
       <Header/>
       <Content/>
       <Footer/>
	   </>
	  )
}
export default CancellationPolicy;

const Content=()=>{

return(
	  <section className="service__area" style={{paddingTop:'8rem'}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="service__main__blk" data-aos="fade-right" data-aos-delay="80" data-aos-duration="1000">
                            <div className="service__topbar">
                            <h2 className="mt-5">Cancellation and Refund Policy by Encamp Adventure Pvt Ltd</h2>
                             <div>
                             <h2><br/><br/>1. Cancellation Process</h2>
                              
                              <ul>
                                  <li>Cancellations will only be accepted through the email address associated with the booking. Customers must reply to the email of the payment receipt received at the time of booking for any cancellation requests.</li>
                                  <li>No cancellations will be entertained over phone calls or WhatsApp messages.</li>
                                  <li>For any queries and feedback please write an email to <a href="mailto:support@encampadventures.com">support@encampadventures.com</a></li>
                              </ul>
                              
    <h2><br/><br/>2. Booking Amount</h2>
    <p>The booking amount is non-refundable under any circumstances.</p>

    <h2><br/><br/>3. Unforeseen Circumstances</h2>
    <ul>
         <li>In case of government orders, harsh weather conditions, protests, landslides, or any other unforeseen circumstances, Encamp Adventure Pvt Ltd will strive to work out the best possible alternate plans or trips/treks.</li>
         <li>If certain activities are canceled, the organization will provide the best possible alternatives, but no refunds will be issued.</li>
    </ul>
    <h2><br/><br/>4. Natural Calamity/Unforeseen Circumstances (Trek or Trip Cancellation)</h2>
       <ul>
         <li>If a trek is called off at the last moment due to a natural calamity or unforeseen circumstances (e.g., rain, snowfall, earthquake, landslides, strike, bandh), Encamp Adventure Pvt Ltd will issue a trek voucher for the full amount.</li>
         <li>The voucher can be redeemed for the same trek or another trek within the next 365 days from the trek departure date.</li>
         <li>If a trek or trip cannot be completed due to natural calamity or unforeseen circumstances, no refund will be provided.</li>
     </ul>

    <h2><br/><br/>5. Extra Expenses</h2>
    <p>Any extra expenses incurred due to natural calamity or unforeseen circumstances (e.g., rain, snowfall, earthquake, landslides, strike, bandh) will be borne by the customer. The company will not be liable for such additional costs.</p>

    <h2><br/><br/>6. Peak Season and Popular Places</h2>
    <p>Cancellation policies may differ during peak seasons and for popular destinations. Customers are advised to check the specific cancellation terms applicable during these periods.</p>

    <h2><br/><br/>7. Communication</h2>
    <p>All communication regarding cancellations, refunds, or alternative arrangements must be conducted through the official email channel.</p>
    <p>This Cancellation Policy is subject to change, and any updates will be communicated through official channels. Customers are encouraged to review the policy regularly for any modifications.</p>

    <h2><br/><br/>8. Cancellation by Customers</h2>
    
    <h2 className="mt-5">8.1 Group Tours: Weekend Getaways</h2>
    <ul>
    <li>Cancellations made 30 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. Batch Shifting is also available.</li>
    <li>Cancellations made between 29-16 Days before the departure date will receive a 75% refund. No refund on the booking amount. Batch Shifting also available.</li>
    <li>Cancellations made between 15-10 Days before the departure date will receive a 50% refund. No refund on the booking amount.</li>
    <li>No refunds will be provided for cancellations made within 9 Days of the scheduled departure. No refund shall be issued for the booking amount.</li>
    </ul>
    <h2 className="mt-5">8.2 Group Tours : Domestic Tours </h2>
    <ul>
    <li>Cancellations made 45 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. Batch Shifting is also available.</li>
    <li>Cancellations made between 44-30 days before the departure date will receive a 75% refund.No refund will be issued on the booking amount. Batch Shifting is also available.</li>
    <li>Cancellations made between 29-21 Days before the departure date will receive a 50% refund.No refund will be issued on the booking amount.Batch Shifting is also available.</li>
    <li>Cancellations made between 21-15 Days before the departure date will receive a 25% refund.No refund will be issued on the booking amount.</li>
    <li>No refunds will be provided for cancellations made within 14 Days of the scheduled departure. No refund shall be issued for the booking amount.</li>
    </ul>
    <h2 className="mt-5">8.3 Group Tours: International Tours</h2> 
     <ul>
     <li>Cancellations made 60 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. Batch Shifting is also available.
     </li> 
     <li>Cancellations made between 59-46 days before the departure date will receive a 75% refund.No refund will be issued on the booking amount.Batch Shifting is also available.
     </li> 
     <li>Cancellations made between 46-31 Days before the departure date will receive a 50% refund.No refund will be issued on the booking amount
     </li> 
     <li>No refunds will be provided for cancellations made within 30 Days of the scheduled departure. No refund shall be issued for the booking amount. 
     </li>
     </ul>
     <h2 className="mt-5">8.4 Private Tours: Domestic Tours</h2>
      <ul>
     <li>Cancellations made 45 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity.
     </li> 
     <li>Cancellations made between 30-45 days before the departure date will receive a 50% refund.No refund will be issued on the booking amount
     </li> 
     <li>No refunds will be provided for cancellations made within 30 Days of the scheduled departure. No refund shall be issued for the booking amount.
     </li>
     </ul>
     <h2 className="mt-5">8.5 Private Tours: International Tours</h2>
      <ul>
     <li>Cancellations made 60 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. 
     </li>
     <li>Cancellations made between 59-46 days before the departure date will receive a 75% refund.No refund will be issued on the booking amount.
     </li> 
     <li>Cancellations made between 46-31 Days before the departure date will receive a 50% refund.No refund will be issued on the booking amount
     </li> 
     <li>No refunds will be provided for cancellations made within 30 Days of the scheduled departure. No refund shall be issued for the booking amount. 
     </li>
     </ul>
     <h2 className="mt-5">8.6 Events and Festivals</h2> 
     <ul>
     <li>Cancellations made 30 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity.
     </li> 
     <li>Cancellations made between 29-15 days before the departure date will receive a 50% refund.No refund will be issued on the booking amount.
     </li> 
     <li>No refunds will be provided for cancellations made within 14 Days of the scheduled departure. No refund shall be issued for the booking amount. 
     </li>
     </ul>
      <h2 className="mt-5">8.7 Accommodations on Website</h2>
      <ul>
     <li>Cancellations made 30 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity.
     </li> 
     <li>Cancellations made between 29-15 days before the departure date will receive a 50% refund.No refund will be issued on the booking amount. 
     </li>
     <li>No refunds will be provided for cancellations made within 14 Days of the scheduled departure. No refund shall be issued for the booking amount.
     </li>
     </ul>
     <h2 className="mt-5">8.8 Camping Accommodations</h2>
     <ul>
     <li>Cancellations made 15 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. Not applicable during festivals and events. 
     </li>
     <li>Cancellations made between 14-7 days before the departure date will receive a 50% refund.No refund will be issued on the booking amount.Not applicable during festivals and events.
     </li> 
     <li>No refunds will be provided for cancellations made within 6 Days of the scheduled departure. No refund shall be issued for the booking amount 
     </li>
     </ul>
     <h2 className="mt-5">8.9 Outdoor Learning Program for Schools</h2>
     <ul>
     <li>Cancellations made 45 days prior to the scheduled departure date will be eligible for a full refund. Booking amount will be refunded as a credit note voucher with lifetime validity. Date Shifting option is also available
     </li> 
     <li>Cancellations made between 44-30 days before the departure date will receive a 50% refund.No refund will be issued on the booking amount.Date Shifting option is also available
     </li> 
     <li>Cancellations made between 29-15 days before the departure date will receive a 20% refund.No refund will be issued on the booking amount.
     </li> 
     <li>No refunds will be provided for cancellations made within 14 Days of the scheduled departure. No refund shall be issued for the booking amount
    </li>
    </ul>

    <h2><br/><br/>9. License and Travel Documents</h2>
    <p>Before embarking on your adventure with Encamp Tourism Pvt Ltd, ensure all travel documents, including visas and necessary paperwork, are in order. Please carry a valid ID. Failure to obtain necessary entry permissions may result in the inability to issue a refund. Additionally, possessing a valid motorcycle license and required documentation is mandatory.</p>

    <h2><br/><br/>10. Indemnification</h2>
    <p>In the rare event that participants cause any issues during the tour, they may be responsible for covering associated costs.</p>

    <h2><br/><br/>11. Amendment and Modifications</h2>
    <p>Terms and conditions may be updated, and by continuing to use services, participants agree to abide by the latest version.</p>

    <h2><br/><br/>12. Waiver</h2>
    <p>Leniency in some situations does not imply a waiver of rights by Encamp Adventures Pvt Ltd.</p>

    
    <h2><br/><br/>13. Severability 
    </h2>
    <p>If any terms are deemed illegal or unenforceable, the remaining ones still apply. 
    </p>
    <h2><br/><br/>14. Governing Law
    </h2>
    <p>In case of disputes, all legal matters will be governed under the jurisdiction of Guwahati High court. 
    </p>
    <h2><br/><br/>15. Termination 
    </h2>
    <p>Encamp Tourism Pvt Ltd. reserves the right to discontinue services in case of a breach of the rules. 
    </p>
    <h2><br/><br/>16. Complaints, Suggestions & Comments 
    </h2>
    <p>Feedback is invaluable. Whether a complaint, suggestion, or comment, participants are encouraged to share it during the tour or via email within 14 days of the issue. 
    </p>
    <h2><br/><br/>17. Itinerary Changes
    </h2>
    <p>Flexibility is key. In unforeseen circumstances, tour plans may be adjusted or canceled. A minimum of four(4) bookings is required for group tours, , and refunds will be promptly issued if minimum bookings are not met.
    </p>
    <h2><br/><br/>18. Booking, Cancellations, and Refund 
    </h2>
    <p>Prices may fluctuate, and the final cost will be provided upon booking. Full payment is required before receiving travel documents. Missed tours or early arrivals/ departures incur additional expenses. 
    </p>
    <h2><br/><br/>19. Revision Fees
    </h2>
    <p>Changes to tour dates or itineraries within 45 days of the tour date may have additional costs, similar to canceling. 
    </p>
    <h2><br/><br/>20. Cancellation for Non-Payment 
    </h2>
    <p>Failure to make timely payments may result in the cancellation of bookings with associated fees. 
    </p>
    <h2><br/><br/>21. Refund 
    </h2>
    <p>Refund requests will be determined by the Encamp Tourism Pvt Ltd. team, and processing may take up to 15 days. No refunds will be provided for unused services. 
    </p>
    <h2><br/><br/>22. No Warranty 
    </h2>
    <p>Content is offered &quot;as is,&quot; and while efforts are made to provide accurate information, perfection is not guaranteed.
    </p>

    <h2><br/><br/>23. Disclaimer of Liability 
    </h2>
    <p>Encamp Tourism Pvt Ltd. cannot assume responsibility for accidents, lost luggage, delays, or fines during the tour. 
    </p>
    <h2><br/><br/>24. Exclusions and Limitations 
    </h2>
    <p>Liability limits are deemed fair and reasonable, and participants are appreciated for their understanding. 
    </p>



    <h2><br/><br/>25. General Refund Conditions</h2>
    <ol>
        <li>Refunds will be processed using the same payment method used for the original transaction.</li>
        <li>Any additional charges incurred during the refund process (e.g., bank fees) may be deducted from the refund amount.</li>
        <li>Refund requests must be submitted in writing via email to <a href="mailto:refund@encampadventures.com">refund@encampadventures.com</a>.</li>
        <li>Refunds will be processed within 5 business days from the date of receiving the refund request.</li>
    </ol>
    <p>This Refund Policy is subject to change, and any modifications will be communicated to customers through our official communication channels.</p>

    <h2><br/><br/>26. Refund Process</h2>
    <p>Encamp Tourism Pvt Ltd. initiates the refund within 72 working hours after necessary approvals. Subsequently, it takes 10-14 working days for the credit to become visible in your respective bank accounts.</p>

                             </div>                                                                                                                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	  )

}