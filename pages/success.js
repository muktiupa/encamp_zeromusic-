import { useEffect, useState } from "react";
import HtmlHead from "../components/common/HtmlHead";
import Header from "../components/common/Header";
import BookingEnquiry from "../components/common/BookingEnquiry";
import BookingDetail from "../components/common/BookingDetail";
import AccommodationBookingDetails from "../components/accomodation/AccommodationBookingDetails";
import EventBookingDetails from "../components/event/EventBookingDetails";
import BookingDetailsziro from "../components/common/BookingDetailziro";
//import VehicleBookingDetails from "../components/vehicle/VehicleBookingDetails";
import Footer from "../components/common/Footer";
import AOS from "aos";
import { Tagmanageri } from "../components/common/tagmanageri";
import sendMail from "../function/sendMail";

const CustomSuccess = ({ successPageData, queryPage }) => {
  const base_url = process.env.BASEURL;
  const [successPage, setSuccessPage] = useState(null);

  useEffect(() => {
    AOS.init({ disable: "mobile" });
    AOS.refresh();
    Tagmanageri();

    if (queryPage === "experience") {
      const stored = localStorage.getItem("successpage");

      if (!stored) {
        window.location.href = "/";
        return;
      }

      try {
        const parsed = JSON.parse(stored);
        setSuccessPage(parsed);
      } catch (err) {
        console.error("Invalid localStorage data:", err);
        window.location.href = "/";
        return;
      }

      // Clear localStorage on exit
      const handleUnload = () => {
        localStorage.removeItem("successpage");
      };

      window.addEventListener("beforeunload", handleUnload);
      return () => {
        window.removeEventListener("beforeunload", handleUnload);
        localStorage.removeItem("successpage");
      };
    } else {
      // For enquiry
      setSuccessPage(successPageData);
      document.cookie =
        "successpage=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  }, []);
console.log("Success Page Data:", successPageData);
  return (
    <>
      <HtmlHead base_url={base_url} />
      <Header />

      {/* Enquiry flow */}
      {queryPage === "enquiry" && successPage && (
        <BookingEnquiry
          AOS={AOS}
          base_url={base_url}
          successpage={successPage}
        />
      )}

      {/* Experience-based flows */}
      {queryPage === "experience" && successPage && (
        <>
          {successPageData?.idfor === "itinerary" && (
            <BookingDetail
              AOS={AOS}
              base_url={base_url}
              paymentdetails={successPage}
              iten={successPage?.iten}
              sendMail={sendMail}
            />
          )}
          {successPageData?.idfor === "accommodation" && (
            <AccommodationBookingDetails
              AOS={AOS}
              base_url={base_url}
              sendMail={sendMail}
              paymentdetails={successPage}
            />
          )}
         {successPageData?.idfor === "event" && (
            <EventBookingDetails
              AOS={AOS}
              base_url={base_url}
              sendMail={sendMail}
              paymentdetails={successPage}
            />
          )}
          {successPageData.idfor === "zfm" && (
            <BookingDetailsziro
              AOS={AOS}
              base_url={base_url}
              sendMail={sendMail}
              paymentdetails={successPage}
            />
          )}
          {/*  {successPageData.idfor === "vehicle" && (
            <VehicleBookingDetails
              AOS={AOS}
              base_url={base_url}
              sendMail={sendMail}
              paymentdetails={successPage}
            />
          )} */}
        </>
      )}

      <Footer />
    </>
  );
};

export default CustomSuccess;

// ✅ Server-side cookie validation and props passing
export async function getServerSideProps(context) {
  const { req, query } = context;
  const cookies = req.headers.cookie || "";

  const match = cookies.match(/successpage=([^;]+)/);
  if (!match) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  try {
    const decoded = decodeURIComponent(match[1]);
    const successPageData = JSON.parse(decoded);
    const allowedIds = ["itinerary", "accommodation", "event", "vehicle" , "zfm"];

    if (query.page === "experience") {
      if (!allowedIds.includes(successPageData?.idfor)) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      return {
        props: {
          queryPage: query.page || null,
          successPageData,
        },
      };
    }

    return {
      props: {
        successPageData,
        queryPage: query.page || null,
      },
    };
  } catch (error) {
    console.error("Invalid cookie data", error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
