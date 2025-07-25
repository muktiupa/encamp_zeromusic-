import { useState, useEffect } from "react";
import Moment from "moment";

const BookingDetailziro = (props) => {
  const { AOS, base_url, paymentdetails, iten, sendMail } = props;
  const {
    payment_id,
    order_id,
    ordertotal,
    amount,
    checkindate,
    contact,
    email,
    name,
    prductdetails,
    isadvance,
    tag,
    ordertotalobj,
    selectedaddondata
  } = paymentdetails;
  const nameofproduct = prductdetails;
 
  const nooftravellers = ordertotalobj.hasOwnProperty("travellers")
    ? ordertotalobj.travellers
    : 1;
    let addontotal = selectedaddondata?.reduce((total, addon) => {
  return total + +addon.price;
}, 0) || 0;


  
    addontotal =addontotal * nooftravellers;

  const subtotal = ordertotalobj.hasOwnProperty("subtotal")
    ? ordertotalobj.subtotal
    : 0;
  const cf = ordertotalobj.hasOwnProperty("cf") ? ordertotalobj.cf : 0;
  const gst = ordertotalobj.hasOwnProperty("gst") ? ordertotalobj.gst : 0;
  const gstsetting = "inclusive";
  const othercharges = cf;
  const cfcharges = false;
  const producttotal = +subtotal - +addontotal;
  const invoicedate = Moment(new Date()).format("DD/MM/YYYY");

  useEffect(() => {
    AOS.init({
      disable: "mobile",
    });
    AOS.refresh();
  }, [AOS]);

  useEffect(() => {
    const createinvoice = async () => {
      if (payment_id && order_id) {
        const ress = await fetch("/api/invoice", {
          method: "POST",
          body: JSON.stringify({
            payment_id,
            order_id,
            ordertotal,
            amount,
            checkindate,
            contact,
            email,
            name,
            prductdetails,
            isadvance,
            nameofproduct:btoa(nameofproduct),
            iten,
            nooftravellers,
            invoicedate,
            subtotal,
            cf,
            gst,
            gstsetting,
            othercharges,
            cfcharges,
            selectedaddondata,
            addontotal,
            producttotal,
            addons:true
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
          timeout: 5000,
        });
        if (ress.status === 200 || ress.data === "success") {
          //sending email
          let subject = `Booking Confirmation: Encamp ZFM 2024 Package`;
                let html = `<div style={{
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                  padding: 20,
                  backgroundColor: "#f7f9fc",
                  color: "#333",
                  maxWidth: 600,
                  margin: "auto",
                  borderRadius: 5
                }}
              >
                <h2 style={{ color: "#2c3e50" }}>
                  Dear ${name},
                </h2>
                <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                  Warm greetings from <strong>Encamp Adventures!</strong>
                </p>
                <div
                  style={{
                    padding: 20,
                    backgroundColor: "#fff",
                    borderRadius: 5,
                    marginBottom: 20
                  }}
                >
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    We are absolutely delighted to confirm your booking for the camping
                    experience for Encamp Ziro. Your stay at the
                    much-awaited Ziro Festival of Music 2024 is confirmed.
                  </p>
                  <h3>Trip Details</h3>
                  <p><strong>Product:</strong> ${prductdetails}</p>
                  <p><strong>Check-in Date:</strong> ${checkindate}</p>
                  ${selectedaddondata && selectedaddondata.length > 0
                    ? `<h3>Addons</h3>
                  <ul>
                        ${selectedaddondata.map(
                    (addon) =>
                      `<li>${addon.name} - Price: Rs ${addon.price}/-</li>`
                        )
                        .join("")}
                      </ul>`
                  : ""}

                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    We would like to express our gratitude for choosing
                    <a
                      href="https://encampadventures.com"
                      target="_blank"
                      style={{ color: "#3498db", textDecoration: "none" }}
                    >
                      Encamp Adventures
                    </a>
                    . As a responsible tourism company, we aim to rejuvenate your mind and
                    body and make a positive environmental impact.
                  </p>
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    Please check out our
                    <a
                      href="https://drive.google.com/file/d/19qAXkmJsjOQSEGCeIggOVrBGpA6vmeEL/view?usp=drivesdk"
                      style={{ color: "#3498db", textDecoration: "none" }}
                    >
                      Sustainability Guidelines &amp; Things to Carry
                    </a>
                    . These guidelines will help you pack accordingly and contribute to our
                    #ZeroWasteCamp initiative.
                  </p>
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    Remember to carry your Covid vaccination certificate and valid ID proof.
                    These are mandatory for the Inner Line Permits to enter Arunachal Pradesh.
                  </p>
                  <ul
                    style={{
                      paddingLeft: 20,
                      marginBottom: 20,
                      fontSize: 16,
                      lineHeight: "1.5"
                    }}
                  >
                    <li>
                      <a
                        href="https://www.google.com/maps/d/u/0/edit?mid=1V0mXPhGW2WFNpXCePjV6L3LbWa8uCAE&usp=sharing"
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        Camp Route Map from Naharlagun
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://youtu.be/UzbHEYkr24M"
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        Encamp Ziro Video
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://youtu.be/4Te1zRg6KXQ"
                        style={{ color: "#3498db", textDecoration: "none" }}
                      >
                        Sustainability Initiatives Video
                      </a>
                    </li>
                  </ul>
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    Thank you for choosing Encamp Adventures. We look forward to welcoming you
                    to Ziro for this extraordinary adventure.
                  </p>
                  <p style={{ marginBottom: 20, fontSize: 16, lineHeight: "1.5" }}>
                    Sincerely,
                    <br />
                    <strong>Encamp Support</strong>
                    <br />
                    <a
                      href="mailto:support@encampadventures.com"
                      style={{ color: "#3498db", textDecoration: "none" }}
                    >
                      support@encampadventures.com
                    </a>
                    <br />
                    +919643182259
                  </p>
                </div>
                </div>`;


          let maildata = {
            email: email,
            iscc: true,
            subject: subject,
            text: html,
            attachments: [
              {
                filename: `INVOICE-${order_id}.pdf`,
                path: "/public/invoice.pdf",
              },
            ],
          };
          let mailresponse = await sendMail(maildata);
          if (mailresponse) {
            console.log("Mail has been sent");
          } else {
            console.log("Mail server error");
          }
        }
      }
    };
    createinvoice();
  }, [payment_id]);

  return (
    <main className="main overflow-hidden">
      <section
        className="booking__hero__area faq__hero__area"
        style={{
          backgroundImage: `url('${base_url}/assets/img/booking__bg.jpg')`,
        }}
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
                  We are a purpose-driven travel enterprise offering
                  hassle-free, end-to-end experiences. A signatory to the
                  Tourism Declares a Climate Emergency.
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
                  <h4>{order_id ? order_id : ""}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Payment ID</span>
                  <h4>{order_id ? payment_id : ""}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Traveller Name</span>
                  <h4>{order_id ? name : ""}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Contact Details</span>
                  <h4>{order_id ? `Mobile number: ${contact}` : ""}</h4>
                  <h4>{order_id ? `Email: ${email} ` : ""}</h4>
                </div>
                <div className="information2__single__content">
                  <span>Trip</span>
                  <h4>{order_id ? nameofproduct : ""}</h4>
                </div>
                {selectedaddondata && selectedaddondata.length > 0 && (
                  <div className="information2__single__content">
                    <span>Addons</span>
                    <h4>
                      {selectedaddondata.map((addon, index) => (
                        <span key={index}>
                          {addon.name}-- Price: {addon.price}
                          {index < selectedaddondata.length - 1 && ", "}
                        </span>
                      ))}
                    </h4>
                  </div>
                )}
                <div className="information2__single__content">
                  <span>Order Total</span>
                  <h4>Rs: {order_id ? ordertotal : ""}/-</h4>
                </div>
                <div className="information2__single__content">
                  <span>Trip Date</span>
                  <h4>{order_id ? checkindate : ""}</h4>
                </div>

                {isadvance === "yes" ? (
                  <div className="information2__single__content">
                    <span>Advance Paid</span>
                    <h4>{order_id ? Math.floor(amount / 100) : ""}</h4>
                  </div>
                ) : (
                  ""
                )}

              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default BookingDetailziro;
