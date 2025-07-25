import HtmlHead from '../../../components/common/HtmlHead';
import Header from '../../../components/common/Header';
import adminapi from "../../../api/adminapi";
import { useMemo, useState, useEffect } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Faq from '../../../components/faq/Faq';
import WhyChooseEncamp from '../component/WhyChooseEncamp';
import WhyVisit from '../component/WhyVisit';
import Testimonial from "../component/Testimonial";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../../../components/common/Footer';
import Contactform from '../component/Contactform';
import { Tagmanageri } from '../../../components/common/tagmanageri';
import sendMail from '../../../function/sendMail';

export default function StatePlaces({ placeobj = [], state }) {
  const place = placeobj?.[0] ?? null;
  const allPackages = place?.linked_itineraries ?? [];
  const allAccommodations = place?.linked_accommodations ?? [];
  const allEvents = place?.linked_events ?? [];
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toggle, setToggle] = useState(false);

  const router = useRouter();

  // Filters
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [itemsPerAccPage, setItemsPerAccPage] = useState(6);
  const [itemsPerEventPage, setItemsPerEventPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentAccPage, setCurrentAccPage] = useState(1);

  const filteredAccommodations = allAccommodations; // Or apply any filter later
  const startAccIndex = (currentAccPage - 1) * itemsPerAccPage;
  const endAccIndex = startAccIndex + itemsPerAccPage;
  const visibleAccommodations = filteredAccommodations.slice(startAccIndex, endAccIndex);
  const [activeModal, setActiveModal] = useState({ index: null, slide: 0 });
  const [currentEventPage, setCurrentEventPage] = useState(1);

  const startEventIndex = (currentEventPage - 1) * itemsPerEventPage;
  const endEventIndex = startEventIndex + itemsPerEventPage;

  const visibleEvents = allEvents.slice(startEventIndex, endEventIndex);


  const handleOpenModal = (accIndex, imgIndex) => {
    const acc = allAccommodations[accIndex];

    setActiveModal({
      index: accIndex,
      slide: imgIndex,
      acc,
      images: acc?.images || [],
    });

    // Defer to ensure modal content is rendered
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const carouselEl = document.querySelector('#accModalCarousel');
        if (carouselEl && window.bootstrap?.Carousel) {
          const bsCarousel =
            window.bootstrap.Carousel.getInstance(carouselEl) ||
            new window.bootstrap.Carousel(carouselEl);
          bsCarousel.to(imgIndex);
        }
      }
    }, 300);
  };

  // Unique durations
  const uniqueDurations = useMemo(() => {
    const durations = allPackages.map(pkg => pkg.duration?.trim()).filter(Boolean);
    return [...new Set(durations)];
  }, [allPackages]);

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    let result = [...allPackages];

    if (selectedDuration) {
      result = result.filter(pkg => pkg.duration === selectedDuration);
    }

    if (selectedType) {
      result = result.filter(pkg => pkg.type === selectedType);
    }

    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === 'amount') return parseFloat(a.amount) - parseFloat(b.amount);
        if (sortBy === 'duration') return (a.duration || '').localeCompare(b.duration);
        if (sortBy === 'pax') return (a.group_size || 0) - (b.group_size || 0);
        return 0;
      });
    }

    return result;
  }, [allPackages, selectedDuration, selectedType, sortBy]);

  // Pagination slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visiblePackages = filteredPackages.slice(startIndex, endIndex);

  // Pick one random image per package
  const randomImageMap = useMemo(() => {
    const map = {};
    allPackages.forEach(pkg => {
      if (Array.isArray(pkg.images) && pkg.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * pkg.images.length);
        map[pkg.id] = pkg.images[randomIndex];
      }
    });
    return map;
  }, [allPackages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('bootstrap/dist/js/bootstrap.bundle.min.js')
        .then((bs) => {
          window.bootstrap = bs;
        })
        .catch((err) => console.error('Bootstrap JS load failed', err));
    }
  }, []);
  useEffect(() => {
    Tagmanageri();
    const updateItemsPerPage = () => {
      const isMobile = window.innerWidth < 768; // bootstrap breakpoint
      const value = isMobile ? 3 : 6;
      setItemsPerPage(value);
      setItemsPerAccPage(value);
      setItemsPerEventPage(value);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

const generateSlug = (text = '') => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')  // Remove special characters except hyphens
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Collapse multiple hyphens
    .trim();
};


  const getItineraryUrl = (pkg) => {
  if (!pkg?.name || !pkg?.id || !state) return '#';

  const nameUrl = generateSlug(pkg.name);
  return `/destinations/${state}/itinerary/${nameUrl}/${pkg.id}`;
};

const getAccomodationPage = (filter = {}) => {
  const name = filter.name || "";
  const id = filter.id || "";
  

  if (name && id) {
    const nameUrl = generateSlug(name);
    return `/destinations/${state}/accommodation/${nameUrl}/${id}`;
  }

  return "#";
};
const getEventPage = (filter = {}) => {
  const name = filter.name || "";
  const id = filter.id || "";
  

  if (name && id) {
    const nameUrl = generateSlug(name);
    return `/destinations/${state}/event/${nameUrl}/${id}`;
  }

  return "#";
};

  const formatEventDate = (start, end) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };

    try {
      const startDate = new Date(start).toLocaleDateString('en-IN', options);
      const endDate = new Date(end).toLocaleDateString('en-IN', options);
      return startDate === endDate ? startDate : `${startDate} - ${endDate}`;
    } catch {
      return "Date TBD";
    }
  };


  return (
    <div>
      <HtmlHead />
      <HtmlHead urlx={router.asPath} images={place?.images ?? null} metaData={place?.metaData ?? null} />
      <Header />
      <Contactform
        AOS={AOS}
        Tagmanageri={Tagmanageri}
        toggle={toggle}
        setToggle={setToggle}
        sendMail={sendMail}
        state={place?.state ?? null}
      />
      {/* Hero Section with Bootstrap Carousel */}
      <section className="hero__slider__section position-relative">
        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {place?.images?.map((img, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  width={1920}
                  height={900}
                  className="d-block w-100 object-fit-cover"
                  style={{ height: "85vh", objectFit: "cover" }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {place?.images?.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true" />
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}

          {/* Overlay Content */}
          <div className="carousel-caption text-start d-none d-md-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.42)', padding: '10px', borderRadius: '10px' }}>
            <h2 className="text-white fw-bold display-6 mb-1">
              {place?.state} Tour Package
            </h2>
            <h1 className="text-white fw-bold display-5 mb-3">
              {place?.name}
            </h1>
            <div
              className="white-content mb-4"
              style={{ maxWidth: "600px", fontWeight: 300 }}
              dangerouslySetInnerHTML={{
                __html: place?.summery || `Explore the most scenic and culturally rich places in ${place?.state}`,
              }}
            />
            <Link href="#explore" passHref>
              <a
                className="common__btn"
                onClick={() => setToggle(true)}
              >
                Enquire Now
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="container py-4" id="explore">
        {/* Description */}
        <div className="py-2 py-md-4" style={{ fontWeight: 300 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: place?.description || `Explore the most scenic and culturally rich experiences in ${place?.state}`,
            }}
          />
        </div>
      </section>

      {/* package Section */}
      {visiblePackages?.length > 0 && <section className="container py-4" id="packages">
        <div className="place__title__blk aos-init">
          <span>Looking for Tours ? </span>
          <h4 className="mb-3" style={{ fontSize: "1.7rem" }}>Explore {state} Tour Packages for Couples,Families and Solo Travellers</h4>
        </div>
        {/* Filter Section */}
        <div className="d-md-none text-end mb-2 px-2">
          <button
            className="btn btn-outline-success btn-sm px-3 py-1 rounded-pill"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <i className="fas fa-filter me-1"></i> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <div
          className={`container py-3 ${showMobileFilters ? '' : 'd-none'} d-md-block`}
          id="explore"
        >
          <div className="container py-3" id="explore">
            <div className="row align-items-center">
              <div className="col-md-8 d-flex gap-3 align-items-center flex-wrap">
                {/* Type of Trip Filter */}
                <div className="position-relative" style={{ minWidth: '165px' }}>
                  <select
                    className="form-select form-select-sm ps-5 rounded-pill"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    style={{
                      height: '40px',
                      backgroundColor: '#34cc9c',
                      color: '#fff',
                      border: '1px solid #2bb38d',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <option value="">Type of Trip</option>
                    <option value="group" style={{ color: '#000' }}>Group Trip</option>
                    <option value="private" style={{ color: '#000' }}>Private Trip</option>
                  </select>
                  <div className="position-absolute d-flex align-items-center" style={{
                    top: 0,
                    left: '12px',
                    height: '100%',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-users text-white" style={{ fontSize: '0.85rem' }}></i>
                  </div>
                </div>

                {/* Duration Filter */}
                <div className="position-relative" style={{ minWidth: '180px' }}>
                  <select
                    className="form-select form-select-sm ps-5 rounded-pill"
                    value={selectedDuration}
                    onChange={e => setSelectedDuration(e.target.value)}
                    style={{
                      height: '40px',
                      backgroundColor: '#34cc9c',
                      color: '#fff',
                      border: '1px solid #2bb38d',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <option value="">All Durations</option>
                    {uniqueDurations.map((d, i) => (
                      <option key={i} value={d} style={{ color: '#000' }}>{d}</option>
                    ))}
                  </select>
                  <div className="position-absolute d-flex align-items-center" style={{
                    top: 0,
                    left: '12px',
                    height: '100%',
                    pointerEvents: 'none'
                  }}>
                    <i className="fas fa-calendar-alt text-white" style={{ fontSize: '0.85rem' }}></i>
                  </div>
                </div>
              </div>

              {/* Sort By Filter */}
              <div className="col-md-4 d-flex justify-content-md-end mt-3 mt-md-0">
                <div className="d-flex align-items-center">
                  <span className="me-2 text-muted d-none d-md-block" style={{ fontSize: '0.9rem' }}>
                    Sort By:
                  </span>
                  <div className="position-relative" style={{ minWidth: '180px' }}>
                    <select
                      className="form-select form-select-sm ps-5 rounded-pill"
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value)}
                      style={{
                        height: '40px',
                        backgroundColor: '#34cc9c',
                        color: '#fff',
                        border: '1px solid #2bb38d',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease-in-out',
                      }}
                    >
                      <option value="">Most Popular</option>
                      <option value="amount" style={{ color: '#000' }}>Price (Low to High)</option>
                      <option value="duration" style={{ color: '#000' }}>Duration</option>
                      <option value="pax" style={{ color: '#000' }}>Group Size</option>
                    </select>
                    <div className="position-absolute d-flex align-items-center" style={{
                      top: 0,
                      left: '12px',
                      height: '100%',
                      pointerEvents: 'none'
                    }}>
                      <i className="fas fa-sort text-white" style={{ fontSize: '0.85rem' }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {visiblePackages?.length ? (
            visiblePackages.map((pkg) => (
              <div className="col-12 col-sm-6 col-lg-4 mb-4" key={pkg.id}>
                <div className="destination__single__slide position-relative">
                  {/* 🖼️ Image + Badge */}
                  <div className="position-relative">
                    {randomImageMap[pkg.id] && (
                      <Image
                        src={randomImageMap[pkg.id]}
                        alt={pkg.name}
                        width={800}
                        height={450}
                        className="img-fluid w-100"
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    )}

                    {/* Type Badge */}
                    <div
                      className="position-absolute px-2 py-1 rounded text-white fw-semibold"
                      style={{
                        top: '10px',
                        right: '10px',
                        fontSize: '0.75rem',
                        backgroundColor: pkg?.type === 'group' ? '#34cc9c' : '#f4bc1c',
                      }}
                    >
                      {pkg?.type === 'group' ? 'Group' : 'Private'}
                    </div>

                    {/* Name with Tooltip */}
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>{pkg.name}</Tooltip>}
                      delay={{ show: 300, hide: 100 }}
                      trigger={['hover', 'focus']}
                    >
                      <div
                        className="position-absolute px-2 py-1 text-white fw-bold"
                        style={{
                          bottom: '20px',
                          left: '10px',
                          fontSize: '0.9rem',
                          background: 'rgba(0, 0, 0, 0.5)',
                          borderRadius: '0.25rem',
                          maxWidth: '80%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'default',
                        }}
                        title={pkg.name} // fallback if JS fails
                      >
                        {pkg.name}
                      </div>
                    </OverlayTrigger>
                  </div>
                  <div className="pt-4 d-flex flex-column h-100">
                    <div
                      className="d-flex justify-content-between align-items-center mb-3 px-2 py-1"
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: '#333',
                        backgroundColor: '#f8fefc',
                      }}
                    >
                      <i className="fas fa-map-marker-alt" style={{ color: '#34cc9c', fontSize: '0.8rem' }}></i>
                      <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>{pkg.location}</Tooltip>}
                        delay={{ show: 300, hide: 100 }}
                        trigger={['hover', 'focus']}
                      >
                        <span
                          style={{
                            flex: '0 0 75%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            color: '#000',
                            cursor: 'default',
                          }}
                          title={pkg.location}
                        >
                          {pkg.location}
                        </span>
                      </OverlayTrigger>

                      <span
                        style={{
                          flex: '0 0 20%',
                          textAlign: 'right',
                          border: '1px solid #34cc9c',
                          borderRadius: '5px',
                          padding: '2px 10px',
                          color: '#34cc9c',
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {pkg.duration}
                      </span>
                    </div>

                    <ul
                      className="list-unstyled mb-3 activity-list"
                      style={{
                        fontSize: '0.7rem',
                        lineHeight: '1.3',
                        height: '7.5rem',
                        overflow: 'hidden',
                        fontWeight: 500,
                        borderBottom: '1px solid #d1d1d1', // ✅ new border
                        paddingBottom: '6px',
                      }}
                    >

                      {pkg?.activities?.slice(0, 3).map((activity, idx) => (
                        <li className="d-flex align-items-start mb-1" key={idx}>
                          <span className="newcheck me-2">
                            <i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i>
                          </span>
                          {activity.name}
                        </li>
                      ))}
                      {pkg?.activities?.length > 3 && (
                        <li className="text-muted" style={{ fontSize: '0.65rem' }}>
                          + {pkg.activities.length - 3} more activities
                        </li>
                      )}
                    </ul>
                    <div className="d-flex justify-content-center mt-auto pt-2">
                      <Link href={getItineraryUrl(pkg)} passHref>
                        <a
                          className="d-flex border-0 overflow-hidden text-decoration-none"
                          style={{
                            width: '100%',
                            maxWidth: '280px',
                            height: '38px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: '999px',
                          }}
                        >
                          {/* Left Side: Price (55%) */}
                          <div
                            className="d-flex align-items-center justify-content-start px-3 bg-white rounded-start-pill"
                            style={{
                              width: '55%',
                              color: '#34cc9c',
                              fontWeight: 700,
                              fontSize: '0.8rem',
                              borderRight: '1px solid #e0e0e0',
                              whiteSpace: 'nowrap',
                              height: '100%',
                            }}
                          >
                            ₹ {pkg.amount}
                          </div>

                          {/* Right Side: CTA (45%) */}
                          <div
                            className="d-flex align-items-center justify-content-center px-3 rounded-end-pill"
                            style={{
                              width: '45%',
                              backgroundColor: '#34cc9c',
                              color: '#fff',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              whiteSpace: 'nowrap',
                              height: '100%',
                            }}
                          >
                            View Itinerary
                          </div>
                        </a>
                      </Link>

                    </div>



                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No packages available for this selection.</p>
            </div>
          )}
        </div>
        {/* Pagination */}
        {filteredPackages.length > itemsPerPage && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm" style={{ gap: '4px' }}>
                {Array.from({ length: Math.ceil(filteredPackages.length / itemsPerPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      style={{
                        borderRadius: '6px',
                        borderColor: '#34cc9c',
                        color: '#34cc9c',
                        fontSize: '0.75rem',
                        minWidth: '32px',
                        textAlign: 'center',
                        padding: '0.25rem 0.6rem',
                      }}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </section>}
      {/* Whychoose Visit Section */}
      <WhyChooseEncamp place={place} state={state} />
      {/* Accommodation Section */}
      {allAccommodations?.length > 0 && <section className="container py-2" id="locations">
        <div className="place__title__blk aos-init">
          <span>Looking for just Accomodations?</span>
          <h4 className="mb-3" style={{ fontSize: "1.7rem" }}>Encamp&apos;s Handpicked Stays in {state}</h4>
        </div>
        <div className="row">
          {visibleAccommodations.length ? (
            visibleAccommodations.map((acc, index) => {
              const images = acc?.images ?? [];
              const minPrice = acc.pricing?.length
                ? Math.min(...acc.pricing.map(p => parseFloat(p.price)))
                : null;

              return (
                <div className="col-12 col-sm-6 col-lg-4 mb-4" key={acc._id || index}>
                  <div className="destination__single__slide position-relative">
                    <div className="position-relative">
                      <div id={`accCarousel-${index}`} className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                          {images.map((img, i) => (
                            <div
                              key={i}
                              className={`carousel-item ${i === 0 ? 'active' : ''}`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleOpenModal(index, i)}
                            >
                              <Image
                                src={img}
                                alt={`Accommodation ${acc.name} ${i + 1}`}
                                width={800}
                                height={450}
                                className="d-block w-100"
                                style={{ height: '180px', objectFit: 'cover' }}
                              />
                            </div>
                          ))}
                        </div>
                        {/* Type Badge */}
                        <div
                          className="position-absolute px-2 py-1 rounded text-white fw-semibold"
                          style={{
                            top: '10px',
                            right: '10px',
                            fontSize: '0.75rem',
                            backgroundColor: '#f4bc1c',
                          }}
                        >
                          {acc?.locationtype ?? 'Stay'}
                        </div>

                        {/* Add name badge here */}
                        <div
                          className="position-absolute px-2 py-1 text-white fw-bold"
                          style={{
                            bottom: '20px',
                            left: '10px',
                            fontSize: '0.9rem',
                            background: 'rgba(0, 0, 0, 0.5)',
                            borderRadius: '0.25rem',
                            maxWidth: '80%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'default',
                            zIndex: 1  // Ensure it appears above carousel controls
                          }}
                          title={acc.name}
                        >
                          {acc.name}
                        </div>

                        {images.length > 1 && (
                          <>
                            <button className="carousel-control-prev" type="button" data-bs-target={`#accCarousel-${index}`} data-bs-slide="prev">
                              <span className="carousel-control-prev-icon" aria-hidden="true" />
                              <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target={`#accCarousel-${index}`} data-bs-slide="next">
                              <span className="carousel-control-next-icon" aria-hidden="true" />
                              <span className="visually-hidden">Next</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 d-flex flex-column h-100">
                      <div
                        className="d-flex justify-content-between align-items-center mb-3 px-2 py-1"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#333',
                          backgroundColor: '#f8fefc',
                        }}
                      >
                        <span className="d-flex align-items-center" style={{ gap: '4px' }}>
                          <i className="fas fa-map-marker-alt" style={{ color: '#34cc9c', fontSize: '0.8rem' }}></i>
                          {acc.district}, {acc.state}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            borderRadius: '5px',
                            backgroundColor: '#e6f4ec',
                            padding: '2px 8px',
                            color: '#34cc9c',
                            fontWeight: 600,
                          }}
                        >
                          {acc.locationtype || 'Stay'}
                        </span>
                      </div>


                      {acc?.thingstodo?.length > 0 && <ul className="list-unstyled mb-3 activity-list" style={{ fontSize: '0.7rem', lineHeight: '1.3', height: '6rem', overflow: 'hidden', fontWeight: 500, borderBottom: '1px solid #d1d1d1', paddingBottom: '6px' }}>
                        {acc?.thingstodo?.slice(0, 3).map((act, idx) => (
                          <li className="d-flex align-items-start mb-1" key={idx}>
                            <span className="newcheck me-2"><i className="fas fa-check" style={{ fontSize: '0.6rem' }}></i></span>
                            {act.label}
                          </li>
                        ))}
                        {acc?.thingstodo?.length > 3 && (
                          <li className="text-muted" style={{ fontSize: '0.65rem' }}>
                            + {acc.thingstodo.length - 3} more activities
                          </li>
                        )}
                      </ul>}

                      <div className="d-flex justify-content-center mt-auto pt-2">
                        <Link href={getAccomodationPage({ name: acc.name, id: acc.id })} passHref>
                          <a className="d-flex border-0 overflow-hidden text-decoration-none" style={{ width: '100%', maxWidth: '280px', height: '38px', fontSize: '0.75rem', fontWeight: 600, borderRadius: '999px' }}>
                            <div className="d-flex align-items-center justify-content-start px-3 bg-white rounded-start-pill" style={{ width: '55%', color: '#34cc9c', fontWeight: 700, fontSize: '0.8rem', borderRight: '1px solid #e0e0e0', whiteSpace: 'nowrap', height: '100%' }}>
                              {minPrice ? `₹${minPrice} Onwards` : 'Price NA'}
                            </div>
                            <div className="d-flex align-items-center justify-content-center px-3 rounded-end-pill" style={{ width: '45%', backgroundColor: '#34cc9c', color: '#fff', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap', height: '100%' }}>
                              View Stay
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No accommodations found.</p>
            </div>
          )}
        </div>

        {filteredAccommodations.length > itemsPerAccPage && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm" style={{ gap: '4px' }}>
                {Array.from({ length: Math.ceil(filteredAccommodations.length / itemsPerAccPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentAccPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      style={{
                        borderRadius: '6px',
                        borderColor: '#34cc9c',
                        color: '#34cc9c',
                        fontSize: '0.75rem',
                        minWidth: '32px',
                        textAlign: 'center',
                        padding: '0.25rem 0.6rem',
                      }}
                      onClick={() => setCurrentAccPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </section>}
      {/* Why Visit Section */}
      {place && <WhyVisit place={place} />}
      {/* Events Section */}
      {allEvents?.length > 0 && <section className="container py-2" id="events">
        <div className="place__title__blk aos-init">
          <span>Looking for Upcoming Events?</span>
          <h4 className="mb-3" style={{ fontSize: "1.7rem" }}>Exciting Events in {state}</h4>
        </div>
        <div className="row">
          {allEvents.length ? (
            visibleEvents.map((event, index) => {
              const image = event?.images?.[0] ?? '/default-event.jpg'; // fallback image
              const minPrice = event.pricing?.length
                ? Math.min(...event.pricing.map(p => parseFloat(p.price)))
                : null;

              return (
                <div className="col-12 col-sm-6 col-lg-4 mb-4" key={event._id || index}>
                  <div className="destination__single__slide position-relative">
                    <div className="position-relative">
                      <Image
                        src={image}
                        alt={`Event ${event.name}`}
                        width={800}
                        height={450}
                        className="d-block w-100"
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                      {/* Type Badge */}
                      <div
                        className="position-absolute px-2 py-1 rounded text-white fw-semibold"
                        style={{
                          top: '10px',
                          right: '10px',
                          fontSize: '0.75rem',
                          backgroundColor: '#34cc9c',
                        }}
                      >
                        {'Event'}
                      </div>
                      {/* Name Badge */}
                      <div
                        className="position-absolute px-2 py-1 text-white fw-bold"
                        style={{
                          bottom: '20px',
                          left: '10px',
                          fontSize: '0.9rem',
                          background: 'rgba(0, 0, 0, 0.5)',
                          borderRadius: '0.25rem',
                          maxWidth: '80%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          cursor: 'default',
                        }}
                        title={event.name}
                      >
                        {event.name}
                      </div>
                    </div>

                    <div className="pt-4 d-flex flex-column h-100">
                      <div
                        className="d-flex justify-content-between align-items-center mb-3 px-2 py-1"
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: '#333',
                          backgroundColor: '#f8fefc',
                        }}
                      >
                        <span className="d-flex align-items-center" style={{ gap: '4px' }}>
                          <i className="fas fa-map-marker-alt" style={{ color: '#34cc9c', fontSize: '0.8rem' }}></i>
                          {event.district}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            borderRadius: '5px',
                            backgroundColor: '#34cc9c',
                            padding: '2px 8px',
                            color: '#fff',
                            fontWeight: 600,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {formatEventDate(event.eventdate?.startDate, event.eventdate?.endDate)}
                        </span>

                      </div>

                      {event?.summery && <div className="px-2 mb-1" style={{ fontSize: '0.75rem', color: '#555', height: '4rem', overflow: 'hidden' }}>
                        {event?.summery ?? ""}
                      </div>}

                      <div className="d-flex justify-content-center mt-auto pt-2">
                        <Link href={getEventPage({ name: event.name, id: event.id })} passHref>                        
                          <a className="d-flex border-0 overflow-hidden text-decoration-none" style={{
                            width: '100%',
                            maxWidth: '280px',
                            height: '38px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: '999px'
                          }}>
                            <div className="d-flex align-items-center justify-content-start px-3 bg-white rounded-start-pill"
                              style={{
                                width: '55%',
                                color: '#34cc9c',
                                fontWeight: 700,
                                fontSize: '0.8rem',
                                borderRight: '1px solid #e0e0e0',
                                whiteSpace: 'nowrap',
                                height: '100%'
                              }}
                            >
                              {minPrice ? `₹${minPrice}` : 'Free'}
                            </div>
                            <div className="d-flex align-items-center justify-content-center px-3 rounded-end-pill"
                              style={{
                                width: '45%',
                                backgroundColor: '#34cc9c',
                                color: '#fff',
                                fontSize: '0.75rem',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                height: '100%'
                              }}
                            >
                              View Event
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No upcoming events found.</p>
            </div>
          )}
        </div>
        {allEvents.length > itemsPerEventPage && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm" style={{ gap: '4px' }}>
                {Array.from({ length: Math.ceil(allEvents.length / itemsPerEventPage) }, (_, i) => (
                  <li key={i} className={`page-item ${currentEventPage === i + 1 ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      style={{
                        borderRadius: '6px',
                        borderColor: '#34cc9c',
                        color: '#34cc9c',
                        fontSize: '0.75rem',
                        minWidth: '32px',
                        textAlign: 'center',
                        padding: '0.25rem 0.6rem',
                      }}
                      onClick={() => setCurrentEventPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

      </section>}
      {/* Faq */}
      <section className="container py-4" id="faq">
        <div className="place__title__blk aos-init">
          <span>Have Questions?</span>
          <h4 className="mb-3" style={{ fontSize: "1.7rem" }}>Frequently Asked Questions</h4>
        </div>
        <div className="d-flex flex-column align-items-center w-100">
          <Faq faqdata={place?.faq ?? ''} disableheader={true} />
        </div>
      </section>
      {/* Accommodation Modal */}
      {activeModal.acc && (
        <div
          className="modal fade show"
          id="accModal"
          tabIndex="-1"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0,0,0,0.8)',
            zIndex: 1055,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflowY: 'auto'
          }}
          aria-hidden="false"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" style={{ zIndex: 1060 }}>
            <div className="modal-content bg-dark">
              <div className="modal-header border-0">
                <h5 className="modal-title text-white">{activeModal.acc.name}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  style={{ zIndex: 1070 }}
                  onClick={() => setActiveModal({ index: null, slide: 0, acc: null, images: [] })}
                />
              </div>
              <div className="modal-body p-0">
                <div id="accModalCarousel" className="carousel slide" data-bs-ride="carousel">
                  {/* Carousel content remains the same */}
                  <div className="carousel-inner">
                    {activeModal.images.map((img, i) => (
                      <div
                        key={i}
                        className={`carousel-item ${i === activeModal.slide ? 'active' : ''}`}
                      >
                        <Image
                          src={img}
                          alt={`Preview ${activeModal.acc.name} ${i + 1}`}
                          width={1280}
                          height={720}
                          className="d-block w-100"
                          style={{ objectFit: 'contain', maxHeight: '80vh' }}
                        />
                      </div>
                    ))}
                  </div>

                  {activeModal.images.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#accModalCarousel"
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#accModalCarousel"
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Testimonial Section */}
       <Testimonial AOS={AOS} />
      {/* Footer */}
      <Footer />


    </div>
  );
}

export async function getServerSideProps(context) {
  const { state } = context.params;

  try {
    const res = await adminapi.get(`/place/state/${state}`);
    return {
      props: {
        placeobj: res?.data ?? [],
        state
      },
    };
  } catch (error) {
    console.error('Error fetching places:', error.message);
    return {
      props: {
        placeobj: [],
        state
      },
    };
  }
}
