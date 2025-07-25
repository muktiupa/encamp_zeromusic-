import { useEffect } from "react";
import Moment from "moment";
import Link from "next/link";
import sendMail from "../../function/sendMail";

const BookingDetails = (props) => {
  const { base_url, paymentdetails, setLoading } = props;

  const {
    payment_id,
    order_id,
    amount,
    checkindate,
    checkoutdate,
    contact,
    email,
    name,
    prductdetails,
    isadvance,
    ordertotal,
    noofdays
  } = paymentdetails;

  const vehicleName = ordertotal?.package ?? '';
  const noOfTravellers = ordertotal?.travellers || prductdetails?.passengers || "1";
  const totalPrice = prductdetails?.totalPrice || 0;
  const advancePaid = isadvance === "yes" && prductdetails ? Math.floor(amount / 100) : 0;

  const state = prductdetails?.state || "";
  const city = prductdetails?.city || "";
  const pickupLocation = prductdetails?.pickupLocation || "";

  const formattedCheckin = Moment(checkindate).format("DD MMMM YYYY");
  const formattedCheckout = Moment(checkoutdate).format("DD MMMM YYYY");
  const invoiceDate = Moment().format("DD/MM/YYYY");
  const drivetype= prductdetails?.drivetype ?? ""



  useEffect(() => {
    const createInvoice = async () => {
      if (payment_id && order_id) {
        const invoiceData = {
          payment_id,
          order_id,
          vehicleName,
          amount,
          checkindate,
          checkoutdate,
          contact,
          email,
          name,
          isadvance,
          noOfTravellers,
          invoiceDate,
          totalPrice,
          advancePaid,
          city,
          state,
          pickupLocation,
          noofdays,
          gst: prductdetails?.gst || 0,
          cf: prductdetails?.carboncess || 0,
          discount: prductdetails?.discount || 0,
          appliedCoupon: prductdetails?.couponCode || null,
          basePrice: prductdetails?.basePrice || 0,
          drivetype: prductdetails?.drivetype ?? "",
        };

        const res = await fetch("/api/vehicleinvoice", {
          method: "POST",
          body: JSON.stringify(invoiceData),
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          const subject = `Booking Confirmation: ${vehicleName} (${drivetype})`;
          let html = `Dear ${name},<br/><br/>`;
          html += `Thank you for choosing Encamp Adventures for your vehicle booking.<br/><br/>`;
          html += `<strong>Booking Details:</strong><br/>`;
          html += `Vehicle: ${vehicleName} (${drivetype})<br/>`;
          html += `Booking from: ${formattedCheckin} to ${formattedCheckout} (${noofdays} day${noofdays > 1 ? "s" : ""})<br/>`;
          html += `Pickup Location: ${pickupLocation}<br/>`;
          html += `City/State: ${city}, ${state}<br/>`;
          html += `Number of Travellers: ${noOfTravellers}<br/>`;
          html += `Total Amount: ₹${totalPrice}<br/>`;
          if (isadvance === "yes") {
            html += `Advance Paid: ₹${advancePaid}<br/>`;
          }
          html += `<br/>`;
          html += `<p style="color:red; text-align:center; font-weight:bold;">***Note: Per day usage includes up to 8 hours or 200 km. Additional charges apply for exceeding limits.***</p>`;
          html += `<br/>For any assistance, feel free to reach out to us at <a href="mailto:support@encampadventures.com">support@encampadventures.com</a> or call +91 84533 09463.<br/><br/>`;
          html += `We look forward to providing you an exceptional travel experience!<br/><br/>`;
          html += `Sincerely,<br/>Encamp Support<br/>support@encampadventures.com<br/>+91 84533 09463`;
          console.log(html);

          const mailData = {
            email,
            subject,
            text: html,
            iscc: true,
            attachments: [
              {
                filename: `INVOICE-${order_id}.pdf`,
                path: "/public/vehicleinvoice.pdf",
              },
            ],
          };

          const mailResponse = await sendMail(mailData);
          console.log(mailResponse ? "Mail sent" : "Mail sending failed");
        }

        setLoading(false);
      }
    };

    createInvoice();
  }, [payment_id]);

  return (
    <main className="main overflow-hidden">
      <section
        className="booking__hero__area faq__hero__area"
        style={{ backgroundImage: `url('${base_url}/assets/img/booking__bg.jpg')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="booking__hero__content"
                data-aos="fade-up"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <h1>Booking {payment_id ? "Successful!" : "Failed!"}</h1>
                <p>
                  We are a purpose-driven travel enterprise offering hassle-free, end-to-end
                  experiences. A signatory to the Tourism Declares a Climate Emergency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="information__area2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div
                className="information2__single__blk"
                data-aos="fade-right"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <div className="information2__title">
                  <h2>Booking Information</h2>
                </div>
                <div className="information2__single__content">
                  <span>Booking ID</span>
                  <h4>{order_id}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Payment ID</span>
                  <h4>{payment_id}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Guest Name</span>
                  <h4>{name}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Contact Details</span>
                  <h4>
                    Mobile: {contact} <br />
                    Email: {email}
                  </h4>
                </div>
                <div className="information2__single__content">
                  <span>Vehicle Name</span>
                  <h4>{vehicleName}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Number of Travellers</span>
                  <h4>{noOfTravellers}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Trip Dates</span>
                  <h4>
                    {formattedCheckin} to {formattedCheckout} <br />
                    ({noofdays} day{noofdays > 1 ? "s" : ""})
                  </h4>
                </div>
                <div className="information2__single__content">
                  <span>Pickup Location</span>
                  <h4>{pickupLocation}</h4>
                </div>
                <div className="information2__single__content">
                  <span>City / State</span>
                  <h4>{city}, {state}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Total Amount</span>
                  <h4>₹{totalPrice}</h4>
                </div>
                {isadvance === "yes" && (
                  <div className="information2__single__content">
                    <span>Advance Paid</span>
                    <h4>₹{advancePaid}</h4>
                  </div>
                )}
                <div className="information2__single__content">
                  <span>Note</span>
                  <h4 style={{ color: "red", fontWeight: "bold" }}>
                    *** Per day usage includes up to 8 hours or 200 km. Additional charges apply for exceeding limits. ***
                  </h4>
                </div>
                <div className="information2__btn__blk">
                  <Link href="/" passHref>
                    <a className="common__btn">Go to Homepage</a>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right section - optional */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookingDetails;
