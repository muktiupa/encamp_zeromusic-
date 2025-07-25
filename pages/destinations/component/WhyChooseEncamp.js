import Image from 'next/image';
import IconValue from './IconValue';
import IconNature from './IconNature';
import IconExperience from './IconExperience';
import IconCustomization from './IconCustomization';

export default function WhyChooseEncamp({ place, state }) {

const randomImage = Array.isArray(place?.images) && place.images.length > 0
  ? place.images[Math.floor(Math.random() * place.images.length)]
  : '/whychoose.png';

  return (
    <>
      <section className="container py-3 px-2">
        <div className="row align-items-center">
          {/* Left: Text Content */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h4 className="mb-3 fw-bold text-start" style={{ fontSize: '1.7rem' }}>
              Why Choose Encamp for Your {state} Trip?
            </h4>
            <div
              className="dangerously-set text-start"
              style={{ fontSize: '0.75rem', lineHeight: 1.6 }}
              dangerouslySetInnerHTML={{ __html: place?.why || '' }}
            />
          </div>

          {/* Right: Image & Rating */}
          <div className="col-md-6 text-center">
            <div className="position-relative">
              <Image
                src={randomImage}
                alt="Encamp campsites"
                width={512}
                height={340}
                className="img-fluid rounded shadow-sm"
                style={{ objectFit: 'cover', borderRadius: '12px' }}
              />
              <div
                className="position-absolute top-0 end-0 d-flex align-items-center bg-white px-2 py-1 rounded-pill shadow-sm"
                style={{ margin: '10px', fontSize: '0.75rem', fontWeight: 600 }}
              >
                <Image src="/assets/img/google.png" alt="Google" width={50} height={16} />
                <span className="ms-2">4.6</span>
                <span className="ms-1 text-warning">★★★★★</span>
              </div>
              <div
                className="position-absolute bottom-0 start-50 translate-middle-x bg-dark text-white px-3 py-1 rounded-pill shadow"
                style={{ bottom: '10px', fontSize: '0.75rem', fontWeight: 600 }}
              >
                500+ Happy Customers!
              </div>
            </div>
          </div>
        </div>

        {/* Feature Icons */}
        <div className="row mt-4 text-center">
          <div className="col-6 col-md-3 mb-4">
            <IconCustomization />
            <h6 className="fw-bold mt-2" style={{ fontSize: '0.8rem' }}>
              Conscious Customization
            </h6>
            <p className="text-muted" style={{ fontSize: '0.7rem' }}>
              Tailored To Your Ethical Choices
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <IconNature />
            <h6 className="fw-bold mt-2" style={{ fontSize: '0.8rem' }}>
              Nature-Based Experiences
            </h6>
            <p className="text-muted" style={{ fontSize: '0.7rem' }}>
              Properties with a view and a local touch
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <IconExperience />
            <h6 className="fw-bold mt-2" style={{ fontSize: '0.8rem' }}>
              Encamp Travel Experience
            </h6>
            <p className="text-muted" style={{ fontSize: '0.7rem' }}>
              Trust our Guest-Centric Approach
            </p>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <IconValue />
            <h6 className="fw-bold mt-2" style={{ fontSize: '0.8rem' }}>
              Value for Money
            </h6>
            <p className="text-muted" style={{ fontSize: '0.7rem' }}>
              Good Value For The Price You Pay
            </p>
          </div>
        </div>
      </section>

      {/* Section-specific styling */}
    <style jsx>{`
  .dangerously-set {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #2e2e2e;
  }

  .dangerously-set * {
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit;
  }

  .dangerously-set ul {
    padding-left: 1.25rem;
    margin-bottom: 1 rem;
    list-style-type: disc;
  }

  .dangerously-set ul li {
    margin-bottom: 0.5rem;
    font-weight: 400;
    display: list-item;
    list-style-position: outside;
  }

  .dangerously-set ul li h1,
  .dangerously-set ul li h2,
  .dangerously-set ul li h3,
  .dangerously-set ul li h4,
  .dangerously-set ul li h5,
  .dangerously-set ul li h6,
  .dangerously-set ul li strong,
  .dangerously-set ul li span {
    all: unset;
    display: inline;
    font-weight: 600;
    color: inherit;
  }
`}</style>


    </>
  );
}
