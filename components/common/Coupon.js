import React, { useState, useEffect } from 'react';
import adminapi from '../../api/adminapi';

const Coupon = ({ setAppliedCoupon, payableamount, appliedCoupon, applicableCategory, reseter, setReseter , idx=null , validate = false }) => {
    const [couponCode, setCouponCode] = useState('');
    const [isApplied, setIsApplied] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const applyCoupon = async ({ purchaseAmount, categories , code }) => {
        if (!purchaseAmount || !categories) {
            setMessage('Invalid coupon code');
            return;
        }
        if (appliedCoupon) {
            setIsApplied(true);
            setMessage('Coupon is already applied');
            return;
        }
        setLoading(true);
        try {
            const response = await adminapi.post('/applycoupon', { code, purchaseAmount, categories });
            if (response.data) {
                let datax = response?.data;
                if(validate){
                   let reres = await adminapi.get(`/validatetax/${datax?.finalAmount}`);
                     if(reres?.data){
                      setAppliedCoupon({...datax , validateData : reres?.data});
                     }else{
                        setAppliedCoupon(datax);
                     }
                }else{
                  setAppliedCoupon(datax);
                }
                setIsApplied(true);
                setMessage('Coupon is applied successfully');
   
            } else {
                setMessage('Invalid coupon code');
            }
        } catch (error) {
            setMessage(error?.response?.data?.message ?? 'Error applying coupon');
        } finally {
            setLoading(false);
        }
    };

    const removeCoupon = () => {
    let isalreadyapplied = getAlreadyappliedcoupon(idx);
   if(isalreadyapplied){
    let couponcodearr = localStorage.getItem('lockPrice');
    if (couponcodearr) {
        let couponcodedata = JSON.parse(couponcodearr);
        
        // Filter out the coupon with the matching itineraryId
        let updatedCouponData = couponcodedata.filter((x) => x.itineraryId !== idx);

        // Save updated data back to local storage
        localStorage.setItem('lockPrice', JSON.stringify(updatedCouponData));
    }

   }

        setIsApplied(false);
        setCouponCode('');
        setAppliedCoupon(null);
        setMessage('');
    
    };

    const getAlreadyappliedcoupon=(newid)=>{
        let couponcodearr = localStorage.getItem('lockPrice');
        if(couponcodearr){
            let couponcodedata = JSON.parse(couponcodearr); 
          //now check if data[0]._id is in couponcodedata as itineraryId
          let couponcodeobj = couponcodedata.find((x) => x.itineraryId === newid);
          if(couponcodeobj){
             return couponcodeobj;
          }
    }
}

    useEffect(() => {
        if (reseter) {
           /*  setIsApplied(false);
            setCouponCode('');
            setAppliedCoupon(null);
            setMessage('');
            setLoading(false); */
        }

       
    }, [reseter]);



useEffect(() => {
        if(idx){
       let couponcodeobj = getAlreadyappliedcoupon(idx);
       if(couponcodeobj){
        const callfn =async()=>{
         await applyCoupon({ code: couponcodeobj?.couponCode, purchaseAmount: couponcodeobj.actualprice, categories: [couponcodeobj.tag]});
        }
        callfn();
       }
       
     }
    }, [idx]);

    return (
        <div style={{ width: '100%' }} className="coupon-container">
            <div
                style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                className="sidebar__total__price mb-3"
            >
                {!isApplied ? (
                    <>
                        <div style={{ width: '60%' }} className="sidebar__form__single">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                                className="dff"
                            />
                            {message && !isApplied && <p style={{ color: 'red', fontSize: '0.8rem' }}>{message}</p>}
                        </div>
                        <button
                            type="button"
                            disabled={loading}
                            style={{
                                border: 'none',
                                width: '38%',
                                marginLeft: '5px',
                                padding: '5px 8px',
                                backgroundColor: 'lightgrey',
                                borderRadius: '5px',
                                maxHeight: '2.8rem',
                            }}
                            className="coupon__btn"
                            onClick={() => applyCoupon({ purchaseAmount: payableamount, categories: applicableCategory , code : couponCode })}
                        >
                            {loading ? 'Loading...' : 'Apply'}
                        </button>
                    </>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <p style={{ color: 'green', fontSize: '0.8rem', margin: 0, flex: 1 }}>{message}</p>
                        <button
                            type="button"
                            onClick={() => removeCoupon()}
                            style={{
                                border: 'none',
                                marginLeft: '5px',
                                padding: '5px 8px',
                                backgroundColor: 'lightgrey',
                                borderRadius: '5px',
                                maxHeight: '2.8rem',
                            }}
                        >
                            Remove Coupon
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Coupon;
