
import { useState,  memo , useContext} from "react";
import adminapi from "../../api/adminapi";
import { useRouter } from "next/router";
import { CampaignContext } from "../common/CampaignContext";

const Sidebar = (props) => {
  const {
    getAddonsName,
    datax,
    initializeRazorpay,
    Tagmanageri,
    bloading,
    setBloading,
    base_url,
    toggle,
    setToggle,
    salert,
    setSalert,
    todayprice,
    durationtext,
    checkindate
  } = props;
  const [orderbooking, setOrderbooking] = useState({
    travelDate: "",
    travellers: 1,
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    addons: [],
    bookedItenary: [],
    advance: "",
    isChecked: false,
    token: "",
  });
  const [error, setError] = useState({
    travelDate: "",
    travellers: "",
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    addons: "",
    bookedItenary: "",
    advance: "",
  });

  const router = useRouter();
  const [finalsubmit, setFinalsubmit] = useState(false);
  const [selectedaddondata,setSelectedaddondata] = useState(null);
   const { fetchParams, resetParams } = useContext(CampaignContext);

  const getmaxpeoplearr = () => {
    let number = 1;
    let maxnumber = 0;
    let x = 1;

    maxnumber = number + 9;
    x = Number(number);

    let arr = [];
    for (x; x < maxnumber + 1; x++) {
      arr = [...arr, x];
    }

    return arr;
  };


  const calculationc = (pricexx, numberofperson, addon) => {
    let calcul = pricexx ? pricexx : todayprice;
    if (addon) {
      calcul = calcul + addon;
    }
    if (numberofperson) {
      calcul = calcul * numberofperson;
    }

    const wholedata = {
      cf: Math.ceil((calcul * 0.025).toFixed(2)),
      tax: 0,
      subtotal: Math.ceil((calcul + calcul * 0.025).toFixed(2)),
      base: calcul,
    };

    return wholedata;
  };

  const validateEmail = (emails) => {
    let validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (emails.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeHandler = (e) => {
    setOrderbooking({ ...orderbooking, [e.target.name]: e.target.value });
  };

  const selectAddon = (val, either) => {
    let carbonprojarr = orderbooking.addons;
    let addonsdata = datax.addons;   
    const selectedAddon = addonsdata.find(addon => addon.id === val);
    if (selectedAddon && selectedAddon.either) {
        carbonprojarr = carbonprojarr.filter(addonId => {
            const addon = addonsdata.find(addon => addon.id === addonId);
            return !addon || !addon.either || addon.id === val;
        });
    }

    const addonIndex = carbonprojarr.indexOf(val);
    if (addonIndex !== -1) {
        carbonprojarr.splice(addonIndex, 1);
    } else {
        carbonprojarr.push(val);
    }
  let addondataf = getAddonDataxc(carbonprojarr,addonsdata);
   setSelectedaddondata(addondataf);
    setOrderbooking({...orderbooking, addons: carbonprojarr});
}

const getAddonDataxc = (addons, addonsdata) => {
 
  if (addons) {
   
    let addonsdataxc = addons.map((addon) => {
      return addonsdata.find((sdd) => sdd.id === addon) ?? null;
    });
   
    return addonsdataxc;
  }
  return null;
};

  const getaddonprice = () => {
    let addonselected = orderbooking.addons;
    let totc = 0;
    addonselected &&
      addonselected.map((sss) => {
        datax.addons.map((sd) => {
          if (sd.id === sss) {
            totc += sd.price;
          }
        });
      });
    return totc;
  };

  const gotoPayment = async (e, data) => {
    e.preventDefault();


    let acterror = { ...error };
    if (data.travellers === "") {
      acterror = { ...acterror, travellers: "Minimum 2" };
    } else {
      acterror = { ...acterror, travellers: "" };
    }
    if (data.firstName === "") {
      acterror = { ...acterror, firstName: "FirstName Required" };
    } else {
      acterror = { ...acterror, firstName: "" };
    }
    if (data.lastName === "") {
      acterror = { ...acterror, lastName: "LastName Required" };
    } else {
      acterror = { ...acterror, lastName: "" };
    }
    if (
      data.contact === "" ||
      data.contact.length < 10 ||
      data.contact.length > 13
    ) {
      acterror = { ...acterror, contact: "Mobile Number Required" };
    } else {
      acterror = { ...acterror, contact: "" };
    }
    if (data.email === "" || !validateEmail(data.email)) {
      acterror = { ...acterror, email: "Email Required" };
    } else {
      acterror = { ...acterror, email: "" };
    }

    setError(acterror);
    let setter = true;
    for (let obj in acterror) {
      if (acterror[obj] !== "") {
        setter = false;
        break;
      }
    }

    if (setter === false || !setter) {
      setFinalsubmit(false);
      return;
    }

    let orderbookingdata = calculationc(
      todayprice,
      orderbooking.travellers,
      getaddonprice()
    );

    let astokendata = {
      ...data,
      orderbookingdata: orderbookingdata,
      addons: getAddonsName(data.addons),
      nameofpackage: durationtext,
      checkindate:checkindate
    };
    makePayment(astokendata);
    setFinalsubmit(false);
  };

  const todate = () => {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
  };

  const makePayment = async (cartdata) => {
    setBloading(true);
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      setSalert({ ...salert, fail: "Razorpay SDK Failed to load" });
      setBloading(false);
      return;
    }
    const campaignParams = fetchParams();
    const data = await fetch("/api/razorpayforziro", {
      method: "POST",
      body: JSON.stringify(cartdata),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    }).then((t) => t.json());

    var options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      name: "Encamp Adventures Pvt. Ltd.",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your Payment",
      image: "https://encampadventures.com/images/logo1.png",
      handler: async function (response) {
        if (data.id == (await response.razorpay_order_id)) {
          let path = `/payment/${response.razorpay_order_id}`;
          let ordertotal = {};
          ordertotal.addons = getAddonsName(cartdata.addons);
          ordertotal.prouctdetails = data.prductdetails;
          ordertotal.billingDetails = cartdata.orderbookingdata.subtotal;
          ordertotal.paymentobj = [
            {
              order_id: response.razorpay_order_id,
              amount: data.amount / 100,
              payment_url: "https://paidbydirect.com",
              payment_id: response.razorpay_payment_id,
              payment_link_id: response.razorpay_payment_id,
              status: "success",
              t_date: todate(),
              remarks: "Online Transfer via payment gateway",
              trantype: "Website-Transfer",
            },
          ];
          ordertotal.travellers = cartdata.travellers;
          ordertotal.subtotal = cartdata.orderbookingdata.base;
          ordertotal.cf = cartdata.orderbookingdata.cf;
          ordertotal.gst = cartdata.orderbookingdata.tax;

          const localresponse = await adminapi.put(
            path,
            JSON.stringify({
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              name: data.name,
              amount: data.amount,
              prductdetails: data.prductdetails,
              ordertotal: ordertotal,
              contact: data.phone,
              email: data.email,
              checkindate: checkindate,
              status: "success",
              isadvance: data.isadvance,
              tag: "Ziro_Festival",
              info:campaignParams ?? null
            })
          );

          if (localresponse.data !== 400) {
            // Validate payment at serverv - using webhooks is a better idea.
           let ppdetail = {
              payment_id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,
              signature: response.razorpay_signature,
              name: data.name,
              amount: data.amount,
              prductdetails: data.prductdetails,
              ordertotal: data.ordertotal,
              contact: data.phone,
              email: data.email,
              checkindate: data.checkindate,
              isadvance: data.isadvance,
              ordertotalobj: ordertotal,
              selectedaddondata:selectedaddondata
            };
             let cccheck = {idfor : "zfm"}
             document.cookie = `successpage=${encodeURIComponent(JSON.stringify(cccheck))}; path=/; max-age=300`;
             localStorage.setItem('successpage', JSON.stringify(ppdetail));
            let uniqueid = localStorage.getItem("cartid");
            localStorage.removeItem(uniqueid);
            setSalert({
              ...salert,
              success: "Payment transaction has been success",
              fail: "",
            });

            Tagmanageri(
              [{ pagename: "zfm-2025", order_value: data.amount / 100 || 0 }],
              "new_booking"
            );
            resetParams();
             const queryParams = new URLSearchParams({
                ...(campaignParams || {}),
                page: "experience", 
              }).toString();

     await router.push(`/success?${queryParams}`);
          } else {
            setSalert({
              ...salert,
              fail: "Payment transaction has been Failed",
            });
            setBloading(false);
          }
        } else {
          //if payment not verified
          setSalert({
            ...salert,
            fail: "Payment transaction verification pending",
          });
          setBloading(false);
        }
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.phone,
      },
      modal: {
        ondismiss: function () {
          // Handle the payment window being closed by the user
          alert("Payment Cancelled");
          setBloading(false);
        },
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${parseInt(day, 10)}-${months[parseInt(month, 10) - 1]}-${year}`;
  }

  return (
    <>
      {bloading ? <div className="loader">Loading...</div> : ""}
      <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
        <div className="sidebar__main__blk">
          <div className="sidebar__title">
            <h4>Checkout</h4>
            <h6
              style={{
                fontSize: "1rem",
                cursor: "pointer",
                position: "absolute",
                right: "10px",
                top: "20px",
              }}
              onClick={() => {
                setToggle(false);
              }}
            >
              close
            </h6>
          </div>

          <form>
            <div className="sidebar__time">
              {`${datax.name}`}
              <br />
              {`${formatDate(datax.duration.from)} to ${formatDate(
                datax.duration.to
              )}`}
            </div>

            <div className="sidebar__select__wrap">
              <div className="sidebar__select__single">
                <label htmlFor="">
                  No. of Travellers{" "}
                  <small style={{ fontSize: "0.6rem", color: "red" }}>
                    {error && error.travellers}
                  </small>
                </label>
                <select
                  className={
                    error && error.travellers
                      ? "form-select error"
                      : "form-select"
                  }
                  type="number"
                  id="travellers"
                  name="travellers"
                  onChange={(e) => onChangeHandler(e)}
                  value={orderbooking.travellers || 2}
                >
                  {getmaxpeoplearr() &&
                    getmaxpeoplearr().map((asx, key) => {
                      return (
                        <option key={key} value={asx}>
                          {asx}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>

            <div className="sidebar__form__wrap">
              <span className="sidebar__lebel">Primary Traveller</span>
              <div className="sidebar__form__single">
                <label htmlFor="">First Name</label>
                <input
                  name="firstName"
                  className={error && error.firstName ? "error" : "dff"}
                  id="firstName"
                  type="text"
                  onChange={(e) => onChangeHandler(e)}
                  value={orderbooking.firstName}
                />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Last Name</label>
                <input
                  className={error && error.lastName ? "error" : "dff"}
                  type="text"
                  name="lastName"
                  id="lastName"
                  onChange={(e) => onChangeHandler(e)}
                  value={orderbooking.lastName}
                />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Contact</label>
                <input
                  type="text"
                  className={error && error.contact ? "error" : "dff"}
                  placeholder="xxxxx-xxxxx"
                  name="contact"
                  id="contact"
                  onChange={(e) => onChangeHandler(e)}
                  value={orderbooking.contact}
                />
              </div>
              <div className="sidebar__form__single">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className={error && error.email ? "error" : "dff"}
                  placeholder="your@domain.com"
                  name="email"
                  id="email"
                  onChange={(e) => onChangeHandler(e)}
                  value={orderbooking.email}
                />
              </div>
            </div>

            <span
              style={{
                color: "red",
                marginBottom: "10px",
                width: "100%",
                paddingLeft: "10px",
              }}
            >
              {error && error.carbonproject
                ? "Select Atleast a project before submit !!!"
                : ""}
            </span>
            <div
              className="sidebar__carbon__wrap carbon__wrap2"
              style={{
                backgroundImage: `url('${base_url}/assets/img/carbon_bg.jpg')`,
              }}
            >
              <div className="sidebar2__carbon__title">
                <h4>Add ons</h4>
                <p style={{ color: "white" }}>Choose Addons </p>
              </div>
              {datax.addons &&
                datax.addons.map((addon, kwy) => {
                  if (addon.price > 0) {
                    return (
                      <div
                        id={addon.id}
                        key={kwy}
                        style={
                          orderbooking.addons.indexOf(addon.id) > -1
                            ? { backgroundColor: "#34cc9c", cursor: "pointer" }
                            : { backgroundColor: "#1F272C", cursor: "pointer" }
                        }
                        onClick={() =>
                          selectAddon(
                            addon.id,
                            addon.either ? addon.either : null
                          )
                        }
                        className="sidebar2__carbon__single__wrap position-relative"
                      >
                        <div className="sidebar2__carbon__info">
                          <h4>{addon.name}</h4>
                          <p
                            style={{ color: "white" }}
                          >{`Price: ₹${addon.price} /pax`}</p>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
            <div className="sidebar__total__price mb-3">
              <h4>
                <br />
                <small style={{ fontSize: "0.7rem" }}>
                  <span className="text-left">Subtotal: </span>
                  <span className="text-right">
                    {
                      calculationc(
                        todayprice,
                        orderbooking.travellers,
                        getaddonprice()
                      ).base
                    }{" "}
                    /-
                  </span>
                </small>
                <br />
                <small style={{ fontSize: "0.7rem" }}>
                  <span>Payment Gateway charges @2.5%:</span>
                  <span>
                    {" "}
                    {
                      calculationc(
                        todayprice,
                        orderbooking.travellers,
                        getaddonprice()
                      ).cf
                    }{" "}
                    /-
                  </span>
                </small>
                <hr />
                Total: ₹{" "}
                {
                  calculationc(
                    todayprice,
                    orderbooking.travellers,
                    getaddonprice()
                  ).subtotal
                }{" "}
                /-
              </h4>
            </div>
            {Object.values(error).filter((err) => err !== "").length > 0 && (
              <div className="light-red-div">
                <ul>
                  {Object.values(error)
                    .filter((err) => err !== "")
                    .map((err, e) => (
                      <li key={e}>{err}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className="sidebar__main__btn sidebar2">
              <button
                onClick={(e) => gotoPayment(e, orderbooking)}
                style={{ border: "none", width: "100%" }}
                className="common__btn"
                disabled={bloading ? true : false}
              >
                {bloading ? (
                  <span className="spinner-border" role="status"></span>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="offcanvas-overlay"></div>
    </>
  );
};
export default memo(Sidebar);
