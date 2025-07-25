import { useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Testimonial = ({ AOS }) => {
  useEffect(() => {
    AOS.init({ disable: "mobile" });
    AOS.refresh();

    if (typeof window !== "undefined") {
      const $ = require("jquery");
      window.$ = window.jQuery = $;
    }
  }, []);

  const responsive = {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 2 },
  };

  const testimonials = [
    {
      text: `Absolutely blown away by the quality of service. From fitting in the best locations 
              to arranging wonderful properties, everything was top-notch.`,
      name: "Rajiv Mehta",
      designation: "Fashion Designer, Mumbai",
      image: "/assets/img/rajiv_mehta.png",
    },
    {
      text: `Just a wonderful set of people. If you feel you need a fresh breath of air, you need to be with Encamp. 
              They blend location, food, and service seamlessly.`,
      name: "Mompia Gogoi",
      designation: "Tech Lead, Bangalore",
      image: "/assets/img/testimonial_2.jpg",
    },
    {
      text: `Encamp creates an amazing vibe. Their attention to hospitality and choice of remote locations 
              has completely redefined my travel experiences.`,
      name: "Nabasindu Paul",
      designation: "UI/UX Designer",
      image: "/assets/img/mompia_gogoi.png",
    },
  ];

  return (
    <section className="testimonial-area py-5">
      <div className="container text-center">
        <div className="place__title__blk aos-init">
          <span>Testimonial</span>
          <h4 className="mb-3" style={{ fontSize: "1.7rem" }}>Once an Encamper, always an Encamper!</h4>
        </div>

        <OwlCarousel
          className="owl-theme"
          responsive={responsive}
          loop
          nav={false}
          margin={24}
          stagePadding={10}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card p-4 bg-white shadow rounded">
              <div className="quote-icon mb-3 text-success">
                <i className="fas fa-quote-left fa-lg"></i>
              </div>
              <p className="testimonial-text mb-4 text-dark" style={{ fontSize: "0.9rem" }}>
                {t.text}
              </p>
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                </div>
                <div className="text-start">
                  <h6 className="mb-0 fw-bold" style={{ fontSize: "0.9rem" }}>
                    {t.name}
                  </h6>
                  <p className="text-muted" style={{ fontSize: "0.75rem" }}>
                    {t.designation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      </div>

      <style jsx>{`
        .testimonial-area {
          background-color: #f9f9f9;
        }

        .testimonial-card {
          max-width: 600px;
          margin: 0 auto;
          min-height: 300px;
        }

        .section-label {
          font-size: 0.75rem;
          letter-spacing: 1px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .quote-icon {
          font-size: 1.5rem;
        }

        @media (max-width: 768px) {
          .testimonial-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonial;
