export const initializeRazorpay =()=>{
return new Promise((resolve)=>{
const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
 script.onload = () => {
        resolve(true);
      };
 script.onerror = (error) => {
        resolve(false);
        console.log(error);
      };
document.body.appendChild(script);

})

}