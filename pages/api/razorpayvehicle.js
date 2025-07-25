import adminapi from "../../api/adminapi";
const Razorpay = require("razorpay");
const shortid = require("shortid");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  try {
    const {
      firstName,
      lastName,
      contact,
      email,
      ispartial,
      advance,
      vehicleType,
      vehicleCategory,
      driveType,
      passengers,
      basePrice,
      discount,
      totalPrice,
      gst,
      carboncess,
      couponCode,
      clientId,
      startDate,
      endDate,
      city,
      pickupLocation,
      state,
      noofdays,
      vehicleId
    } = req.body;

    const amount = ispartial ? Math.round(advance) : Math.round(totalPrice);
    const name = `${firstName} ${lastName}`;
    const currency = "INR";
    const payment_capture = 1;

    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: shortid.generate(),
      payment_capture,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const productDetails = {
      vehicleType,
      vehicleId,
      vehicleCategory,
      driveType,
      passengers,
      basePrice,
      discount,
      gst,
      carboncess,
      totalPrice,
      couponCode: couponCode || null,
      startDate,
      endDate,
      city,
      pickupLocation,
      state,
      noofdays,
    };

    // Razorpay + our DB payload
    const paymentobj = [{
      order_id: razorpayOrder.id,
      payment_id: "",
      payment_link_id: "",
      payment_url: "",
      status: "pending",
      t_date: "",
      amount: amount,
      remarks: "",
      trantype: "Website-Transfer",
    }];

    const ordertotal = {
      billingDetails: {
        basePrice,
        gst,
        carboncess,
        discount,
        totalPrice,
        couponCode: couponCode || null,
        travellers: passengers,
      },
      paymentobj,
      travellers: passengers,
      addons: [],
      carbonproject: [],
      package: `${vehicleCategory} - ${vehicleType}`,
      name,
      email,
      contact,
      startDate,
      endDate,
      pickupLocation,
      city,
      state,
      noofdays,
    };

    const datatosave = {
      payment_id: "",
      order_id: razorpayOrder.id,
      signature: "",
      name,
      contact,
      email,
      currency,
      amount: razorpayOrder.amount,
      prductdetails: productDetails,
      ordertotal,
      status: "pending",
      checkindate: startDate,
      checkoutdate: endDate,
      city,
      state,
      noofdays,
      isadvance: ispartial ? "yes" : "no",
      tag: "Vehicle Booking",
      clientId: clientId || null,
    };

    // Save to backend
    const localresponse = await adminapi.post("/addpayment", JSON.stringify(datatosave));

    if (localresponse?.data?._id) {
      res.status(200).json({
        id: razorpayOrder.id,
        currency: razorpayOrder.currency,
        amount: razorpayOrder.amount,
        name,
        email,
        phone: contact,
        travellers: passengers,
        prductdetails: productDetails,
        package: `${vehicleCategory} - ${vehicleType}`,
        addons: [],
        carbonproject: [],
        ordertotal: ordertotal,
        totalPrice: totalPrice,
        status: "pending",
        checkindate: startDate,
        checkoutdate: endDate,
        city,
        state,
        noofdays,
        isadvance: ispartial ? "yes" : "no",
        tag: "Vehicle Booking",
        clientId: clientId || null,
      });
    } else {
      res.status(400).json({ error: "Failed to save payment locally." });
    }

  } catch (err) {
    console.error("Payment Error:", err);
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}
