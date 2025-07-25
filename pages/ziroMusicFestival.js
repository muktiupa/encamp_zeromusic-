import React from 'react'
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Link from "next/link";



const Content = () => {
    return (
        <section>
            <section id="book-now" className="trip__hero__area">
                <div
                    className="trip__hero__slide_vehicle"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: 'url(assets/img/zmf/zmf.jpg)'
                    }}
                >
                    <div className="trip__hero__content p-5">
                        {/* <h6 className="text-white small fw-bold">Eco-friendly Transport</h6> */}
                        <h2 style={{ marginTop: '-12px' }}>Ziro Music Festical 2025</h2>
                        <p className="text-white">25th - 28th Sep 2025</p>
                    </div>
                </div>
            </section>
        </section>
    );
}




function ziroMusicFestival() {

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

  return (
    <>
	   <HtmlHead metaData={metaData}/>
       <Header/>
       <Content/>
       <Footer/>
	   </>
  )
}
export default ziroMusicFestival;

