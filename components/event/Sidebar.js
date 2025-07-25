import { useState, useEffect } from "react";
import Tableview from "./Tableview";
import Coupon from "../common/Coupon";

const Sidebar = (props) => {

    const { data, bloading, AOS, orderbooking, setOrderbooking, base_url, toggle, setToggle, gotoPayment, error, isChecked, setIsChecked, alldata, appliedCoupon, setAppliedCoupon } = props;
    const [detailspage, setDetailspage] = useState(false);
    const addons = data && data[0] && data[0].addons ? data[0].addons : null;
    const [isaddon, setIsaddon] = useState(true);


    useEffect(() => {
        let addonactivity = addons && addons.length > 0 && addons.some((addon) => addon.tag === 'activity' && addon.id !== '' && addon.price !== "");
        let addonaddon = addons && addons.length > 0 && addons.some((addon) => addon.tag === 'addon' && addon.id !== '' && addon.price !== "");

        if (!addonactivity && !addonaddon) {
            setIsaddon(false);
        }

    }, [addons]);

    useEffect(() => {
        AOS.init({
            disable: 'mobile'
        });
        AOS.refresh();

    }, []);
    const todate = (val) => {
        let today = val ? new Date(val) : new Date();

        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;

    }
    const onChangeHandler = (e) => {
        setAppliedCoupon(null);
        let estart = data && data[0] && data[0].eventdate.startDate;
        let eend = data && data[0] && data[0].eventdate.endDate;
        if (e.target.name === 'start' && estart) {
            if (Number(new Date(e.target.value)) >= Number(new Date(estart)) && Number(new Date(e.target.value)) < Number(new Date(eend))) {
                let startc = new Date(e.target.value);
                //let endc = eend;
                let endc = todate(startc.setDate(startc.getDate() + 1));
                let trstart = { ...orderbooking.travelDate, start: e.target.value, end: endc };

                setOrderbooking({ ...orderbooking, travelDate: trstart });
            }
        }
        else if (e.target.name === 'end') {

            if (Number(new Date(e.target.value)) > Number(new Date(estart)) && Number(new Date(e.target.value)) <= Number(new Date(eend))) {
                let trend = { ...orderbooking.travelDate, end: e.target.value };

                setOrderbooking({ ...orderbooking, travelDate: trend });
            }
        }
        else if (e.target.name === 'rooms') {

            if (alldata.noofroomrequired && e.target.value >= alldata.noofroomrequired) {

                setOrderbooking({ ...orderbooking, rooms: e.target.value });
            } else {
                setOrderbooking({ ...orderbooking, rooms: 1 });
            }

        }

        else {
            setOrderbooking({ ...orderbooking, [e.target.name]: e.target.value });
        }
    }



    const selectCarbon = (val) => {
        let carbonprojarr = [...orderbooking.carbonproject];
        if (carbonprojarr.indexOf(val) > -1) {
            carbonprojarr.splice(carbonprojarr.indexOf(val), 1);
        } else {
            carbonprojarr = [...carbonprojarr, val];
        }
        setOrderbooking({ ...orderbooking, carbonproject: carbonprojarr });

    }

    const selectaddon = (val) => {
        setAppliedCoupon(null);
        let addonarr = orderbooking.addons ? [...orderbooking.addons] : [];

        if (addonarr.indexOf(val) !== -1) {
            addonarr.splice(addonarr.indexOf(val), 1);
        } else {
            addonarr = [...addonarr, val];
        }
        setOrderbooking({ ...orderbooking, addons: addonarr });

    }


    const partial = (e) => {
        if (e.target.checked === true) {
            setIsChecked(true);
            setOrderbooking({ ...orderbooking, advance: Math.floor((alldata.grand * 50) / 100) });

        } else {
            setIsChecked(false);
            setOrderbooking({ ...orderbooking, advance: "" });
        }
    }
    const advcheck = (e) => {
        setOrderbooking({ ...orderbooking, advance: e.target.value })

    }

    const gonext = (e) => {
        e.preventDefault();
        if (orderbooking.travelDate.start === "") {
            alert('Start Date Required');
            return;
        }
        if (orderbooking.travelDate.end === "") {
            alert('End Date Required');
            return;
        }
        setDetailspage(true);
    }
    const goback = (e) => {
        e.preventDefault();
        setDetailspage(false);
    }


    return (
        <>
            <div className={toggle ? "sidebar__area active" : "sidebar__area"}>
                <div className="sidebar__main__blk">
                    <div className="sidebar__title">
                        <h4 style={{ marginTop: '2.5rem', marginBottom: '2rem' }}>Checkout</h4>
                        <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', right: '10px', top: '20px' }} onClick={() => { setToggle(false) }}>close</h6>
                        {detailspage ? <h6 style={{ fontSize: '1rem', cursor: 'pointer', position: 'absolute', left: '10px', top: '20px' }} onClick={(e) => goback(e)}>Back</h6> : ''}
                    </div>

                    <form>
                        {detailspage === false ? <>
                            <div className="sidebar__time">

                                <span><i className="fa fa-clock"></i>{alldata.newdays || 0} {alldata.newdays === 1 ? 'Night' : 'Nights'} for {alldata.newnopeople} Persons,<br />Room required : {alldata.noofroomrequired}</span>
                            </div>
                            <div className="sidebar__select__wrap">

                                <div style={{ width: '100%' }} className="sidebar__select__single">
                                    <label htmlFor="">Package<small style={{ fontSize: '0.6rem', color: 'red' }}>{error && error.travellers}</small></label>
                                    <select style={{ width: '100%' }} className={error && error.travellers ? "form-select error" : "form-select"} type="number" id="accommodationtype" name="accommodationtype" onChange={(e) => onChangeHandler(e)} value={orderbooking.accommodationtype || alldata.accommodationtype}>
                                        {
                                            data && data[0] && data[0].pricing && data[0].pricing.length > 0 && data[0].pricing.map((price, lk) => {

                                                return (
                                                    <option key={lk} value={price.accommodationtype}>{`${price.accommodationtype} | ${price.price}/person`}</option>
                                                )
                                            })

                                        }
                                    </select>

                                </div>
                            </div>
                            {
                                data && data[0] && data[0].eventdate.startDate && data[0].eventdate.endDate ?

                                    <div className="sidebar__select__wrap">
                                        <div className="sidebar__select__single">
                                            <label>Checkin</label>

                                            <input className={error && error.start ? "form-select error" : "form-select"} type="date" id="start" name="start" placeholder="dd-mm-yyyy" min={data && data[0] && data[0].eventdate.startDate} max={data && data[0] && data[0].eventdate.endDate} onChange={(e) => onChangeHandler(e)} value={orderbooking.travelDate.start || ''} />
                                        </div>


                                        <div className="sidebar__select__single">
                                            <label htmlFor="">No. of Guests <small style={{ fontSize: '0.6rem', color: 'red' }}>{error && error.travellers}</small></label>
                                            <select style={{ width: '100%' }} className={error && error.travellers ? "form-select error" : "form-select"} type="number" id="travellers" name="travellers" min={1} max={20} onChange={(e) => onChangeHandler(e)} value={orderbooking.travellers || alldata.defaultno}>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                                <option value={9}>9</option>
                                                <option value={10}>10</option>

                                            </select>

                                        </div>

                                    </div>
                                    : ''
                            }

                            {isaddon ?
                                <div className="sidebar__carbon__wrap carbon__wrap2" style={{ backgroundImage: `url('${base_url}/assets/img/carbon_bg.jpg')`, maxHeight: '55rem', overflowY: 'scroll', }}>
                                    <div className="sidebar2__carbon__title">
                                        <h4>Addons</h4>
                                        <p >Add More Fun to your Stay ! Enjoy our Addon Services.</p>
                                    </div>
                                    {
                                        addons && addons.length > 0 && addons.map((addon, idc) => {
                                            if (addon.id !== '') {
                                                return (

                                                    <div key={idc} name={addon.id} style={(orderbooking.addons.indexOf(addon.id) > -1) ? { backgroundColor: '#34cc9c', cursor: 'pointer' } : { backgroundColor: '#1F272C', cursor: 'pointer' }} className="sidebar2__carbon__single__wrap position-relative" onClick={() => selectaddon(addon.id)}>

                                                        <div className="sidebar2__carbon__info">
                                                            <h4>{addon.name}</h4>
                                                            <p style={(orderbooking.addons.indexOf(addon.id) > -1) ? { color: 'black' } : { color: 'gray' }}>{`Price : ${addon.price}/- ${addon.unit}`}</p>
                                                            <a className="stretched-link"></a>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }


                                </div>
                                : ''}
                            <div className="sidebar__total__price mb-3">

                                <Tableview alldata={alldata} />

                            </div>
                            <div className="sidebar__main__btn sidebar2">
                                <button style={{ border: 'none', width: '100%' }} onClick={(e) => gonext(e)} className="common__btn">Next</button>
                            </div>
                        </> : ''}
                        {detailspage ?
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

                                <span style={{ color: 'red', marginBottom: '10px', width: '100%', paddingLeft: '10px' }}>{error && error.carbonproject ? "Select Atleast a project before submit !!!" : ""}</span>
                                <div className="sidebar__carbon__wrap carbon__wrap2" style={{ backgroundImage: `url('${base_url}/assets/img/carbon_bg.jpg')` }}>
                                    <div className="sidebar2__carbon__title">
                                        <h4>Carbon Thing</h4>
                                        <p>Choose the project you’d like to contribute to.</p>
                                    </div>
                                    <div id="carbon_soil" style={(orderbooking.carbonproject.indexOf('carbon_soil') > -1) ? { backgroundColor: '#34cc9c', cursor: 'pointer' } : { backgroundColor: '#1F272C', cursor: 'pointer' }} onClick={() => selectCarbon('carbon_soil')} className="sidebar2__carbon__single__wrap position-relative">
                                        <div className="sidebar2__carbon__img">
                                            <img src={`${base_url}/assets/img/ca1.jpg`} alt="" />
                                        </div>
                                        <div className="sidebar2__carbon__info">
                                            <h4>Soil Conservation</h4>
                                            <p style={(orderbooking.carbonproject.indexOf('carbon_soil') > -1) ? { color: 'black' } : { color: 'gray' }}>You are generating {alldata.carbonval || 0} KGs</p>
                                            <a className="stretched-link"></a>
                                        </div>
                                    </div>
                                    <div id="carbon_air" style={(orderbooking.carbonproject.indexOf('carbon_air') > -1) ? { backgroundColor: '#34cc9c', cursor: 'pointer' } : { backgroundColor: '#1F272C', cursor: 'pointer' }} onClick={() => selectCarbon('carbon_air')} className="sidebar2__carbon__single__wrap position-relative">
                                        <div className="sidebar2__carbon__img">
                                            <img src={`${base_url}/assets/img/ca2.jpg`} alt="" />
                                        </div>
                                        <div className="sidebar2__carbon__info">
                                            <h4>Air Conservation</h4>
                                            <p style={(orderbooking.carbonproject.indexOf('carbon_air') > -1) ? { color: 'black' } : { color: 'gray' }}>You are generating {alldata.carbonval || 0} KGs</p>
                                            <a className="stretched-link"></a>
                                        </div>
                                    </div>
                                    <div id="carbon_water" style={(orderbooking.carbonproject.indexOf('carbon_water') > -1) ? { backgroundColor: '#34cc9c', cursor: 'pointer' } : { backgroundColor: '#1F272C', cursor: 'pointer' }} onClick={() => selectCarbon('carbon_water')} className="sidebar2__carbon__single__wrap position-relative">
                                        <div className="sidebar2__carbon__img">
                                            <img src={`${base_url}/assets/img/ca3.jpg`} alt="" />
                                        </div>
                                        <div className="sidebar2__carbon__info">
                                            <h4>Water Conservation</h4>
                                            <p style={(orderbooking.carbonproject.indexOf('carbon_water') > -1) ? { color: 'black' } : { color: 'gray' }}>You are generating {alldata.carbonval || 0} KGs</p>
                                            <a className="stretched-link"></a>
                                        </div>
                                    </div>
                                </div>
                                <Coupon appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} payableamount={alldata.grand} applicableCategory={['event']} />

                                <div className="sidebar__total__price mb-3">

                                    <Tableview alldata={alldata} />

                                </div>

                                {data && data[0]?.isPartialAvailable && (
                                    <>
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
                                    </>
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
                            : ''
                        }
                    </form>
                </div>
            </div>
            <div className="offcanvas-overlay"></div>
        </>
    )

}
export default Sidebar;