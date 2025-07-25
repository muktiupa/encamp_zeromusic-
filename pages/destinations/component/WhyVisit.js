import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

export default function WhyVisit({ place }) {
  const [activityImages, setActivityImages] = useState([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (Array.isArray(place?.addons)) {
      const collected = place.addons
        .filter(addon => addon.tag === 'activity' && Array.isArray(addon.images))
        .flatMap(addon =>
          addon.images.map(img => ({
            url: img,
            name: addon.name || '',
            latlong: addon.latlong || '',
            id: addon.id || '',
            type: addon.activitytype || 'Activity',
          }))
        );
      setActivityImages(collected);
    }
  }, [place]);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1000: { items: 1 },
  };

  if (!activityImages.length && !place?.why_visit) return null;


  return (
    <section className="bg-dark text-white py-5">
      <div className="container text-center">
        <h2 className="fw-bold mb-4 text-white" style={{ fontSize: '1.7rem' }}>
          Why {place?.state || 'This Place'} Should Be Your Next Trip?
        </h2>

        {/* Image Slider */}
        {activityImages.length > 0 && (
          <div className="slider-container mx-auto mb-4">
            <OwlCarousel
              className="owl-theme"
              responsive={responsive}
              loop
              nav
              dots={false}
              navText={[
                '<i class="fas fa-chevron-left"></i>',
                '<i class="fas fa-chevron-right"></i>',
              ]}
            >
              {activityImages.map((item, idx) => (
                <div key={idx} className="position-relative rounded overflow-hidden">
                  <div
                    className="w-100"
                    style={{
                      backgroundImage: `url('${item.url}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '400px',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    }}
                  />

                  <div
                    className="position-absolute text-white bg-dark bg-opacity-75 rounded px-2 py-1 small text-end"
                    style={{
                      top: '10px',
                      right: '10px',
                      zIndex: 2,
                      fontSize: '0.75rem',
                    }}
                  >
                    {item.latlong && (
                      <div>
                        <i className="fas fa-map-marker-alt me-1 text-success"></i>
                        {item.latlong}
                      </div>
                    )}
                    <div className="text-uppercase">{item.type}</div>
                  </div>

                  <div
                    className="position-absolute text-white fw-semibold px-3 py-2"
                    style={{
                      bottom: '12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '1.6rem',
                      fontFamily: 'cursive',
                      textShadow: '0 0 6px rgba(0,0,0,0.8)',
                      zIndex: 2,
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}
            </OwlCarousel>
          </div>
        )}

        {/* Description */}
        {place?.whychoose && (
          <div
            className="text-start text-white p-4 rounded"
            style={{ maxWidth: '700px', margin: '0 auto', fontSize: '0.85rem' }}
          >
            <p className="mb-3 text-muted" style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>
              Some places show you new sights. {place?.state} makes you feel something deeper.
            </p>

            <div
              className={`why-text ${expanded ? 'expanded' : ''} dangerously-set dangerously-set-brand`}
              dangerouslySetInnerHTML={{ __html: place?.whychoose ?? '' }}
            />

            <div className="text-center">
              <button
                onClick={() => setExpanded(prev => !prev)}
                className="btn btn-warning rounded-pill fw-bold px-4 py-2 mt-3"
                style={{ fontSize: '0.8rem' }}
              >
                {expanded ? 'Read Less' : 'Read More'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .slider-container {
          max-width: 700px;
        }

         .owl-wrapper {
          max-width: 700px;
          margin: 0 auto;
        }
        .owl-theme.owl-nav {
          margin-top: 0;
        }
        .owl-theme.owl-nav [class*='owl-'] {
          position: absolute;
          transform: translateY(-50%);
          top: 50%;
          background: rgba(0, 0, 0, 0.6);
          color: white !important;
          padding: 8px 12px;
          border-radius: 50%;
          font-size: 1.2rem;
        }
        .owl-theme.owl-nav .owl-prev {
          left: 10px;
        }
        .owl-theme.owl-nav.owl-next {
          right: 10px;
        }

        .why-text {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
        }

        .why-text.expanded {
          -webkit-line-clamp: unset;
          display: block;
        }

        .why-text ol {
          padding-left: 1.25rem;
        }

        .why-text li {
          margin-bottom: 0.8rem;
          font-size: 0.85rem;
          color: #444;
        }

        .why-text li strong {
          color: #222;
          font-weight: 600;
        }

        .why-text p {
          margin-bottom: 0.75rem;
        }
      `}</style>
    </section>
  );
}
