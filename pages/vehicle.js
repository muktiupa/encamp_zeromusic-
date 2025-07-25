import { useEffect, useState } from 'react';
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';
import Home from '../components/vehicles/Home';
import BookingDetails from "../components/vehicles/BookingDetails";
import Sidebar from "../components/vehicles/Sidebar";
import Contactform from "../components/vehicles/Contactform";
import { Tagmanageri } from "../components/common/tagmanageri";
import ReferralNotification from '../components/common/ReferralNotification';
import sendMail from '../function/sendMail';
import VehicleContent from '../components/vehicles/VehicleContent';
import { useRouter } from 'next/router';


const Vehicle = () => {
    const [loading, setLoading] = useState(false);
    const [paymentdetails, setPaymentdetails] = useState(null);
    const [enquiry, setEnquiry] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [togglex, setTogglex] = useState(false);
    const base_url = process.env.BASEURL;
    const router = useRouter();
    const metaData = {
        title: "Vehicle Booking & Car Rental in Northeast India | Encamp Adventures",
        description: "Book clean, safe, and eco-friendly vehicles in Northeast India, Nepal, and Bhutan with Encamp Adventures. Flexible sightseeing and luxury caravan tours available.",
        keywords: `Encamp Adventures, Trekking, Camping, Dome Tent Stay, Ziro, Arunachal Pradesh, Assam, Meghalaya, Nagaland, Mizoram, Tripura, Sikkim, Music Festival, Outdoor Adventures, Sustainable Tourism, Carbon Offset,
    Vehicle booking in Northeast India,
    Car rental in Nepal,
    Bhutan vehicle hire,
    Luxury caravan rental in Northeast India,
    Clean and safe taxi in Northeast,
    SUV rental for Tawang, Ziro, Gangtok,
    Eco-friendly vehicle hire,
    Caravan tour in Assam, Meghalaya, Sikkim,
    Flexible sightseeing vehicle service,
    Best travel company in Northeast India,
    Offbeat boutique stay with vehicle`
    };



    const [orderbooking, setOrderbooking] = useState({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        advance: ""
    });

    useEffect(() => {
        Tagmanageri();
    }, []);


    return (
        <>
            <Loading forceloading={loading} />
            <HtmlHead urlx={router.asPath} metaData={metaData} />
            <Header theme="light" base_url={base_url} />
            <ReferralNotification />
            {paymentdetails ? (
                <BookingDetails
                    base_url={base_url}
                    paymentdetails={paymentdetails}
                    orderbooking={orderbooking}
                    setLoading={setLoading}
                />
            ) : (
                <>
                    <Home
                        orderbooking={orderbooking}
                        setOrderbooking={setOrderbooking}
                        togglex={togglex}
                        setTogglex={setTogglex}
                        setEnquiry={setEnquiry}
                    />
                    <Sidebar
                        setLoading={setLoading}
                        base_url={base_url}
                        toggle={toggle}
                        setToggle={setToggle}
                        orderbooking={orderbooking}
                        setOrderbooking={setOrderbooking}
                        paymentdetails={paymentdetails}
                        setPaymentdetails={setPaymentdetails}
                        Tagmanageri={Tagmanageri}

                    />
                    <VehicleContent />
                    <Contactform
                        toggle={togglex}
                        setToggle={setTogglex}
                        Tagmanageri={Tagmanageri}
                        sendMail={sendMail}
                        enquiry={enquiry}
                        setEnquiry={setEnquiry}

                    />
                </>
            )}

            <Footer />
        </>
    );

};

export default Vehicle;
