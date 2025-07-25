import { useState , useContext } from "react";
import Tableview from "./Tableview";
import Coupon from "../common/Coupon";
import { initializeRazorpay } from "../razorpay/initializerazorpay";
import adminapi from "../../api/adminapi";
import { CampaignContext } from "../common/CampaignContext";

const Sidebar = ({ toggle, setToggle, orderbooking, setOrderbooking, setPaymentdetails, setLoading, Tagmanageri }) => {


    const [error, setError] = useState({});
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [bloading, setBloading] = useState(false);
    const todate = () => new Date().toISOString();
    const mobileRegex = /^[6-9]\d{9}$/;
    const { fetchParams, resetParams } = useContext(CampaignContext);


    const ValidateEmail = (input) => {
        const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return validRegex.test(input);
    };


    const onChangeHandler = (e) => {
        setOrderbooking(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };


    const partial = (e) => {
        let finalprice = appliedCoupon?.validateData?.totalPrice || orderbooking?.finalSummary?.totalPrice;
        setIsChecked(e.target.checked);
        if (e.target.checked) {
            setOrderbooking(prev => ({ ...prev, advance: finalprice * 0.5, ispartial: true }));

        } else {
            setOrderbooking(prev => ({ ...prev, advance: "", ispartial: false }));

        }
    }

    const advcheck = (e) => {
        const value = e.target.value;
        const numericValue = parseFloat(value);


        // Ensure it's a valid number
        if (isNaN(numericValue)) {
            setError(prev => ({ ...prev, advance: "Advance must be a valid number." }));
            setOrderbooking(prev => ({ ...prev, advance: value }));
            return;
        }

        // Determine which price to use
        const price = appliedCoupon?.totalPrice || orderbooking?.finalSummary?.totalPrice;

        if (price) {
            const minAdvance = price * 0.5;

            if (numericValue < minAdvance) {
                setError(prev => ({
                    ...prev,
                    advance: `Advance must be at least 50% of the total price (₹${minAdvance.toFixed(2)}).`
                }));
            } else {
                setError(prev => ({ ...prev, advance: "" }));
            }
        } else {
            // If no price is available at all
            setError(prev => ({ ...prev, advance: "Unable to validate advance: no pricing info found." }));
        }

        setOrderbooking(prev => ({ ...prev, advance: value }));
    };


    const gotoPayment = async (e) => {
        e.preventDefault();

        let validationErrors = {};

        // Required fields validation
        if (!orderbooking.firstName?.trim()) {
            validationErrors.firstName = "First name is required.";
        }
        if (!orderbooking.lastName?.trim()) {
            validationErrors.lastName = "Last name is required.";
        }
        if (!orderbooking.contact?.trim() || !mobileRegex.test(orderbooking.contact)) {
            validationErrors.contact = "Contact is required and must be a valid mobile number.";
        }
        if (!orderbooking.email?.trim() || !ValidateEmail(orderbooking.email)) {
            validationErrors.email = "Email is required.";
        }

        // Advance validation (if isChecked)
        if (isChecked) {
            const advanceValue = parseFloat(orderbooking.advance);
            const price = appliedCoupon?.validateData?.totalPrice || orderbooking?.finalSummary?.totalPrice;

            if (isNaN(advanceValue)) {
                validationErrors.advance = "Advance must be a valid number.";
            } else if (price) {
                const minAdvance = price * 0.5;
                if (advanceValue < minAdvance) {
                    validationErrors.advance = `Advance must be at least 50% of the total price (₹${minAdvance.toFixed(2)}).`;
                }
            } else {
                validationErrors.advance = "Unable to validate advance: no pricing info found.";
            }
        } else {
            setOrderbooking(prev => ({ ...prev, advance: "" }));
        }

        // If any validation errors, stop
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        setError({});
        setBloading(true);
        setLoading(true);
   
        // Pricing and summary details
        const pricingData = appliedCoupon
            ? {
                basePrice: appliedCoupon.actualAmount,
                discount: appliedCoupon.discountAmount,
                totalPrice: appliedCoupon.validateData.totalPrice,
                gst: appliedCoupon.validateData.gst,
                carboncess: appliedCoupon.validateData.carboncess,
                couponCode: appliedCoupon.code,
            }
            : {
                basePrice: orderbooking.finalSummary.basePrice,
                discount: orderbooking.finalSummary.discount || 0,
                totalPrice: orderbooking.finalSummary.totalPrice,
                gst: orderbooking.finalSummary.gst,
                carboncess: orderbooking.finalSummary.carboncess,
            };

        // Final booking object
        const finalBookingData = {
            firstName: orderbooking.firstName,
            lastName: orderbooking.lastName,
            contact: orderbooking.contact,
            email: orderbooking.email,
            ispartial: isChecked,
            advance: isChecked ? parseFloat(orderbooking.advance) : 0,
            vehicleType: orderbooking.finalSummary.vehicleType,
            vehicleCategory: orderbooking.finalSummary.vehiclecategory,
            driveType: orderbooking.finalSummary.driveType,
            passengers: orderbooking.finalSummary.passengers,
            startDate: orderbooking.finalSummary.startDate,
            endDate: orderbooking.finalSummary.endDate,
            city: orderbooking.finalSummary.city,
            state: orderbooking.finalSummary.state,
            pickupLocation: orderbooking.finalSummary.pickupLocation,
            noofdays: orderbooking.finalSummary.noofdays,
            vehicleId: orderbooking.finalSummary.pricingId,
            ...pricingData,
        };

        const res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }

        const campaignParams = fetchParams();
        

        const data = await fetch("/api/razorpayvehicle", {
            method: "POST",
            body: JSON.stringify(finalBookingData),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then((t) =>
            t.json()
        );
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            name: 'Encamp Adventures Pvt. Ltd.',
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Thank you for your Payment",
            image: "https://encampadventures.com/images/logo1.png",
            handler: async function (response) {
                if (data.id === response.razorpay_order_id) {
                    const path = `/payment/${response.razorpay_order_id}`;
                    const ordertotal = {
                        billingDetails: data.ordertotal,
                        paymentobj: [{
                            order_id: response.razorpay_order_id,
                            amount: data.amount / 100,
                            payment_url: "https://paidbydirect.com",
                            payment_id: response.razorpay_payment_id,
                            payment_link_id: response.razorpay_payment_id,
                            status: "success",
                            t_date: todate(),
                            remarks: "Online Transfer via payment gateway",
                            trantype: "Website-Transfer"
                        }],
                        addons: data.addons || [],
                        package: data.package || '',
                        travellers: data.travellers || [],
                        selectedprojects: data.carbonproject || null
                    };

                    const localresponse = await adminapi.put(
                        path,
                        JSON.stringify({
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            name: data.name,
                            amount: data.amount,
                            prductdetails: data.prductdetails,
                            ordertotal,
                            contact: data.phone,
                            email: data.email,
                            checkindate: data.checkindate,
                            city: data.city,
                            state: data.state,
                            pickupLocation: data.pickupLocation,
                            noofdays: data.noofdays,
                            status: "success",
                            isadvance: data.isadvance,
                            tag: data.tag,
                            info:campaignParams ?? null
                        })
                    );

                    if (localresponse.data !== 400) {
                        setPaymentdetails({
                            payment_id: response.razorpay_payment_id,
                            order_id: response.razorpay_order_id,
                            signature: response.razorpay_signature,
                            name: data.name,
                            amount: data.amount,
                            prductdetails: data.prductdetails,
                            ordertotal,
                            ordertotalobj: ordertotal,
                            contact: data.phone,
                            email: data.email,
                            checkindate: data.checkindate,
                            checkoutdate: data.checkoutdate,
                            city: data.city,
                            state: data.state,
                            pickupLocation: data.pickupLocation,
                            noofdays: data.noofdays,
                            isadvance: data.isadvance,
                            tag: data.tag
                        });

                        const uniqueid = localStorage.getItem("cartid");
                        localStorage.removeItem(uniqueid);
                        Tagmanageri([{ pagename: "vehicle", order_value: data.amount / 100 || 0 }], "new_booking");
                        resetParams();
                    } else {
                        setBloading(false);
                        setLoading(false);

                    }
                } else {
                    setBloading(false);
                    setLoading(false);
                }
            },
            prefill: {
                name: data.name,
                email: data.email,
                contact: data.phone
            },
            modal: {
                ondismiss: function () {
                    alert("Payment Cancelled");
                    setBloading(false);
                    setLoading(false);
                }
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

    };



    return (
        <>
            <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
                <div className="sidebar__main__blk">
                    <div className="sidebar__title">
                        <h4 style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>Checkout</h4>
                        <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', right: '10px', top: '20px' }} onClick={() => { setToggle(false) }}>close</h6>
                    </div>

                    <form>

                        <>
                            <div className="sidebar__form__wrap">
                                <span className="sidebar__lebel">Primary Traveller</span>
                                <div className="sidebar__form__single">
                                    <label htmlFor="">First Name</label>
                                    <input name="firstName" className={error && error.firstName ? "error" : "dff"} id="firstName" type="text" onChange={(e) => onChangeHandler(e)} value={orderbooking.firstName || ''} />
                                </div>
                                <div className="sidebar__form__single">
                                    <label htmlFor="">Last Name</label>
                                    <input className={error && error.lastName ? "error" : "dff"} type="text" name="lastName" id="lastName" onChange={(e) => onChangeHandler(e)} value={orderbooking.lastName || ''} />
                                </div>
                                <div className="sidebar__form__single">
                                    <label htmlFor="">Contact</label>
                                    <input type="text" className={error && error.contact ? "error" : "dff"} name="contact" id="contact" onChange={(e) => onChangeHandler(e)} value={orderbooking.contact || ''} />
                                </div>
                                <div className="sidebar__form__single">
                                    <label htmlFor="">Email</label>
                                    <input type="email" className={error && error.email ? "error" : "dff"} name="email" id="email" onChange={(e) => onChangeHandler(e)} value={orderbooking.email || ''} />
                                </div>
                            </div>


                            <Coupon appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} payableamount={orderbooking?.finalSummary?.basePrice ?? null} applicableCategory={['vehicle']} validate={true} />

                            <div className="sidebar__total__price mb-3">

                                {orderbooking?.finalSummary && (
                                    <Tableview
                                        alldata={{
                                            ...orderbooking.finalSummary,
                                            ...(appliedCoupon?.validateData && appliedCoupon.validateData),
                                            ...(appliedCoupon?.discountAmount && { discount: appliedCoupon.discountAmount }),
                                        }}
                                    />
                                )}

                            </div>


                            <div className="sidebar__form__single" style={{ width: '100%' }}>
                                <input
                                    type="checkbox"
                                    name="ispartial"
                                    style={{ width: '15px', height: 'auto', position: 'absolute', marginTop: '15px' }}
                                    onClick={(e) => partial(e)}
                                />
                                <label
                                    htmlFor="ispartial"
                                    style={{ marginLeft: '30px', marginTop: '10px' }}
                                >
                                    Pay Advance and book?
                                </label>
                            </div>

                            {isChecked && (
                                <div className="sidebar__form__single" style={{ width: '100%' }}>
                                    <input
                                        className={error && error.advance ? "error" : "dff"}
                                        type="text"
                                        name="advance"
                                        placeholder="Enter amount 50% of invoice value or higher"
                                        style={{ padding: "8px 3px", width: "100%" }}
                                        value={orderbooking.advance}
                                        onChange={(e) => advcheck(e)}
                                    />
                                </div>
                            )}


                            {Object.values(error).filter(err => err !== '').length > 0 && (
                                <div className="light-red-div">
                                    <ul>
                                        {Object.values(error).filter(err => err !== '').map((err, e) => (
                                            <li key={e}>{err}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="sidebar__main__btn sidebar2">
                                <button style={{ border: 'none', width: '100%' }} onClick={(e) => gotoPayment(e)} className="common__btn" disabled={bloading ? true : false}>{bloading ? <span className="spinner-border" role="status"></span> : 'Pay Now'}</button>
                            </div>

                        </>

                    </form>
                </div>
            </div>
            <div className="offcanvas-overlay"></div>

        </>
    );
};

export default Sidebar;
