import React from 'react'
import HtmlHead from '../components/common/HtmlHead';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Link from "next/link";
import Hero from '../components/ziroMusicFestival/Hero';
import InfoCard from '../components/ziroMusicFestival/InfoCard';
import About from '../components/ziroMusicFestival/About';
import ZiroStorySection from '../components/ziroMusicFestival/ZiroStorySection';
import ZiroLineupSection from '../components/ziroMusicFestival/ZiroLineupSection';
import GlimpsesSection from '../components/ziroMusicFestival/GlimpsesSection';
import TicketPricingSection from '../components/ziroMusicFestival/TicketPricingSection';
import ZiroFestivalPackage from '../components/ziroMusicFestival/ZiroFestivalPackage';
import HowToReachZiro from '../components/ziroMusicFestival/HowToReachZiro';
import PickupServiceForm from '../components/ziroMusicFestival/PickupServiceForm';
import WhereToStay from '../components/ziroMusicFestival/WhereToStay';
import ZiroFestivalBasecamp from '../components/ziroMusicFestival/ZiroFestivalBasecamp';
import ZiroStayHighlights from '../components/ziroMusicFestival/ZiroStayHighlights';
import ZfmVisitorTips from '../components/ziroMusicFestival/ZfmVisitorTips';
import ZiroActivities from '../components/ziroMusicFestival/ZiroActivities';
import PostZfmTours from '../components/ziroMusicFestival/PostZfmTours.js';
import Testimonials from '../components/ziroMusicFestival/Testimonials.js';
import ZfmDiaries from '../components/ziroMusicFestival/ZfmDiaries.js';
import ZiroBookingCTABlack from '../components/ziroMusicFestival/ZiroBookingCTABlack.js';






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
       <Hero/>
       <div className="container py-5">
      <div className="row g-4 align-items-start">
        <About/>
        <InfoCard/>
    </div>
    </div>
    <ZiroStorySection/>
    <ZiroLineupSection/>
    <GlimpsesSection/>
    <TicketPricingSection/>
    <ZiroFestivalPackage/>
    <HowToReachZiro/>
    <PickupServiceForm/>
    <WhereToStay/>
    <ZiroFestivalBasecamp/>
    <ZiroStayHighlights/>
    <ZfmVisitorTips/>
    <ZiroActivities/>
    <PostZfmTours/>
    <Testimonials/>
    <ZfmDiaries/>
    <ZiroBookingCTABlack/>

       <Footer/>
	   </>
  )
}
export default ziroMusicFestival;

