export const loadRazorpayWidget = (amnt) => {
  const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const amount = amnt ? +amnt * 100 : null;
  if (window.RazorpayAffordabilitySuite && amount) {
    const widgetConfig = {
      key: key,
      amount: amount,
      currency: "INR",
    };

    const rzpAffordabilitySuite = new window.RazorpayAffordabilitySuite(
      widgetConfig
    );
    rzpAffordabilitySuite.render();
  }
};
