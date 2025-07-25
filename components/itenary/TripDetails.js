import { useState, useEffect, memo } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Moment from 'moment';
import { loadRazorpayWidget } from "../../function/loadrazorpaywidget";
import Itenarydetails from "./Itenarydetails";
import LockBanner from "../common/LockBanner";

const TripDetails = (props) => {
    const router = useRouter()
    const { AOS, toggle, setToggle, togglesx, setTogglesx, description, totalcf, totalpricetag, tripdetails, isgrouptrip, data, setSelectedGrouptrip, itenaryobj, setAddonData, addonData, base_url, showModal, setShowModal, setIsenquried, isenquried, sendMail , toggles , setToggles } = props;

    const [isLess, setIsLess] = useState(true);
    const [haslockedprice,setHaslockedprice] = useState(false);

    let tripdate = data?.length > 0 && data[0]?.tempObj?.length > 0 ? data[0].tempObj[data[0].tempObj.length - 1].selectedRange : undefined;
    if (!tripdate) {
        let tripdatexc = data?.[0]?.itineraryindex?.[0]?.commondetails?.grouptrip ?? undefined;
        if (tripdatexc) {
            tripdate = tripdatexc;
        } else {
            tripdate = '';
        }

    }


    useEffect(() => {
        AOS.init({
            disable: 'mobile'
        });
        AOS.refresh();

    }, [AOS]);

    useEffect(() => {
        let pp = totalpricetag?.value ?? null;
        if (pp) {
            loadRazorpayWidget(pp);
        }

    }, [totalpricetag]);


    const getShortdescription = (desc) => {
        let shortdes = desc?.indexOf('</p>') ?? -1;
        if (!shortdes) {
            return null;
        }
        if (shortdes !== -1 && shortdes <= 500) {
            return desc?.substr(0, shortdes) ?? '';

        } else {
            return desc?.substr(0, 500) ?? '';
        }


    }

    const addGroupdata = (data) => {
        setToggle(true);
        setSelectedGrouptrip(data);

    }

useEffect(() => {
        const storedLocks = JSON.parse(localStorage.getItem('lockPrice')) || [];
        if (data?.[0]?._id && storedLocks.some(lock => lock.itineraryId === data?.[0]?._id)) {
          setHaslockedprice(true);
        }
       
      }, [data]);


    return (
        <section id="tripdetails" className="details__area">
            <div className="container">
                <div className="row jackman">
                    <div className="col-lg-8">
                        <div className="details__tab__blk" data-aos="fade-up" data-aos-delay="50" data-aos-duration="1000">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => router.push('#tripdetails')} className="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#tripdetails" type="button" role="tab" aria-controls="home"
                                        aria-selected="true">Trip details</button>

                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => router.push('#beauty')} className="nav-link" id="profile-tab" data-bs-toggle="tab"
                                        data-bs-target="#profile" type="button" role="tab" aria-controls="profile"
                                        aria-selected="false">Photos</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => router.push('#itenaryas')} className="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                        aria-selected="false">Itinerary</button>
                                </li>


                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="trip__tab__title">
                                                <h2>Trip details</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-12" dangerouslySetInnerHTML={{ __html: isLess ? getShortdescription(description) : description }}>
                                        </div>

                                    </div>

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="trip_tab_btn">
                                                <div onClick={() => setIsLess(!isLess)} style={{ cursor: 'pointer', color: '#34CC9C' }}><a>{isLess ? 'Read More' : 'Read Less'}<i className="fa fa-chevron-right"></i></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    {isgrouptrip && data?.[0].itineraryindex?.[0]?.commondetails?.grouptrip?.length > 0 && <div className="row">
                                        <div className="col-lg-12">
                                            <div style={{ marginTop: '3rem' }} className="trip__tab__title">
                                                <h2 style={{ fontSize: '1.8rem' }}>Upcoming Group Trips</h2>
                                            </div>
                                            <div className="grouptablecontainer">
                                                <table className="grouptable">
                                                    <thead>
                                                        <tr>
                                                            <th>Trip Dates</th>
                                                            <th>Price/pax</th>
                                                            <th>Group Size</th>
                                                            <th></th>
                                                        </tr>

                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data[0].itineraryindex[0].commondetails.grouptrip.map((gg, kk) => {
                                                                return (
                                                                    <tr key={kk}>
                                                                        <td>
                                                                            <div className="calendar-date">
                                                                                <span className="calendar-day">{Moment(gg?.startdate)?.format('DD') ?? ''}</span>
                                                                                <span className="calendar-month-year">{Moment(gg?.startdate)?.format('MMM YYYY') ?? ''}</span>
                                                                            </div>
                                                                        </td>
                                                                        <td>₹{gg?.groupprice ?? ""}</td>
                                                                        <td>{gg?.noofperson ?? ""}</td>
                                                                        <td><button className="book-now-btn" onClick={() => addGroupdata(gg)}>Book</button></td>

                                                                    </tr>

                                                                )
                                                            })

                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                    }
                                    <div style={{ width: '100%', paddingTop: "4rem" }}>
                                        <Itenarydetails AOS={AOS} base_url={base_url} itenaryobj={itenaryobj} setAddonData={setAddonData} addonData={addonData} togglesx={togglesx} setTogglesx={setTogglesx} showModal={showModal} setShowModal={setShowModal} isenquried={isenquried} setIsenquried={setIsenquried} />
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="details__sitebar__main" >

                            {totalcf ? <div className={haslockedprice ? `carbon__sp__wrap d-none d-lg-block` : `carbon__sp__wrap_new d-none d-lg-block`}>

                                <Image src={`/assets/img/carbon-sp.png`} alt={`carbon-sp.png`} object-fit='contain' layout='fill' />
                                <div className="carbon__sp__content">
                                    <h4>{`${totalcf}KGS`}</h4>
                                    <p>Carbon Footprint</p>
                                </div>
                            </div> : ""}
                            <div className="sitebar__price modified iten">
                                <Image src={`/assets/img/price_tag.svg`} alt={`price_tag.svg`} object-fit='contain' layout='fill' />
                                <span><i className="fa fa-inr"></i>{totalpricetag?.tag ?? ''}</span>

                            </div>

                            <div className="trip__sitebar__title">
                                <h4>Trip summary</h4>
                                <p>{tripdetails}</p>
                            </div>

                            <div className="sitebar__btn__blk">
                                <div id="itineary_booking" className="common__btn sidebar-open" style={{ width: '100%', cursor: 'pointer', marginBottom: '1rem' }} onClick={() => setToggle(!toggle)}>Book Now</div>
                                <div id="razorpay-affordability-widget"></div>
                            </div>
                            <LockBanner totalpricetag={totalpricetag} data={data} sendMail={sendMail} tag={"itinerary"} />
                            <hr></hr>
                            <h6 className="text-xs">Have questions? </h6>
                            <p style={{ fontSize: "0.8rem" }}>
                                We&apos;re ready to assist!
                            </p>
                            <div id="itineary_enquiry" className="common__btn sidebar-open"
                                style={{
                                    width: "100%",
                                    cursor: "pointer",
                                    backgroundColor: "rgb(251, 204, 4)",
                                }}
                                onClick={() => setTogglesx(!togglesx)}>
                                Enquire Now
                            </div>
                            <div className="sitebar2__main__blk">
                                <div style={{ flexDirection: 'column' }} className="sitebar__requirment__blk green">
                                    <div className="requirment__img__blk">
                                        <Image src={`/assets/img/re2.svg`} layout='fill' object-fit='contain' alt="re2.svg" />
                                    </div>
                                    <div className="requirments__content">
                                        <h5>Need help customising  this itenerary ? </h5>
                                        <p>Our travel experts can help you choose the best hotels, and transportation options to get you to your desired destinations.They are knowledgeable about the best destinations,attractions,and activities to include in your customized itinerary.</p>
                                        <div className="sitebar__btn__blk">
                                            <div id="itineary_customize" className="common__btn sidebar-open" style={{ width: '100%', cursor: 'pointer', backgroundColor: '#FBCC04' }} onClick={() => setToggles(true)}>Request Custom Itinerary</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default memo(TripDetails);