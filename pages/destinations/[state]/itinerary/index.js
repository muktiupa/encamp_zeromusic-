import HtmlHead from '../../../../components/common/HtmlHead';
import Header from '../../../../components/common/Header';
import adminapi from "../../../../api/adminapi";
import { useMemo, useState, useEffect } from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Faq from '../../../../components/faq/Faq';
import WhyChooseEncamp from '../../component/WhyChooseEncamp';
import WhyVisit from '../../component/WhyVisit';
import Testimonial from "../../component/Testimonial";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../../../../components/common/Footer';
import Contactform from '../../component/Contactform';
import { Tagmanageri } from '../../../../components/common/tagmanageri';
import sendMail from '../../../../function/sendMail';
import debounce from 'lodash.debounce';

export default function ItineraryPage({ placeobj = [], state }) {
  const place = placeobj?.[0] ?? null;
  const allPackages = place?.linked_itineraries ?? [];
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [toggle, setToggle] = useState(false);
  //search section
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [allSearchResults, setAllSearchResults] = useState([]);
  const router = useRouter();


  const fetchSearchResults = async (query) => {
    setSearchLoading(true);
    try {
      const res = await adminapi.get(`/newsearch?search=${encodeURIComponent(query)}&context=itinerary&state=${state}`);
      const results = res.data.results || [];
      setAllSearchResults(results); // Keep a full copy
      setSearchResults(results);    // Current filtered version
    } catch (error) {
      console.error('Search failed:', error);
      setAllSearchResults([]);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };


  const debouncedSearch = debounce((query) => {
    if (query.length >= 3) fetchSearchResults(query);
  }, 400);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setSearchResults([]);
      setAllSearchResults([]);
      setPrevSearchTerm(searchTerm);
      return;
    }

    if (searchTerm.length > prevSearchTerm.length) {
      // Typing forward → Fetch
      debouncedSearch(searchTerm);
    } else {
      // Typing backward → Filter locally
      const filtered = allSearchResults.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filtered);
    }

    setPrevSearchTerm(searchTerm);
  }, [searchTerm]);

  // Auto-update tabs and active tab when searchResults change
  useEffect(() => {
    const categories = [...new Set(searchResults.map(item => item.category))];
    const allTabs = ['All', ...categories];

    // Reset tab if current activeTab no longer exists
    if (!allTabs.includes(activeTab)) {
      setActiveTab('All');
    }
  }, [searchResults]);


  // Derive tabs only from current filtered search results
  const tabs = useMemo(() => {
    return ['All', ...new Set(searchResults.map(item => item.category))];
  }, [searchResults]);

  const filteredResults = useMemo(() => {
    return searchResults.filter(item =>
      activeTab === 'All' ? true : item.category === activeTab
    );
  }, [searchResults, activeTab]);

  const visibleResults = useMemo(() => {
    return filteredResults.slice(0, visibleCount);
  }, [filteredResults, visibleCount]);

  // Filters
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModal, setActiveModal] = useState({ index: null, slide: 0 });

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
      {/* Filter Grid*/}
      <div className="position-relative pt-5" style={{ backgroundColor: '#f0f9f6' }}>
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bold mb-3 text-dark mt-5">Explore {state}&apos;s Hidden Gems</h1>
          <p className="lead mb-4 text-muted">Discover handpicked destinations across {state} India</p>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="position-relative" style={{ zIndex: 1050 }}>
                {/* Search Input */}
                <div className="input-group shadow-sm">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-start border-end-0"
                    placeholder={`Search experiences of ${state}...`}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setVisibleCount(6);
                    }}
                  />
                  <span className="input-group-text bg-white rounded-end border-start-0">
                    <i className="fas fa-search text-muted"></i>
                  </span>
                </div>

                {/* Filter Tabs */}
                {searchTerm && (
                  <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
                    {tabs.map(tab => (
                      <button
                        key={tab}
                        className={`btn btn-sm rounded-pill ${activeTab === tab ? 'btn-success text-white' : 'btn-outline-success'}`}
                        onClick={() => {
                          setActiveTab(tab);
                          setVisibleCount(6);
                        }}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                )}
                {/* Filtered Results */}
                {searchTerm.length >= 3 && (
                  <div className="bg-white border rounded shadow mt-3 position-absolute z-index-100 search-dropdown">
                    {searchLoading ? (
                      <div className="px-3 py-4 text-center text-muted">
                        <div className="spinner-border text-success" role="status"></div>
                      </div>
                    ) : visibleResults.length > 0 ? (
                      <>
                        {visibleResults.map((item, idx) => (
                          <div
                            key={idx}
                            className="d-flex border-bottom px-3 py-3 search-result-item"
                            style={{ alignItems: 'stretch', gap: '1rem' }}
                          >
                            {/* Column 1: Image */}
                            <div
                              style={{
                                width: '120px',
                                height: '80px',
                                flexShrink: 0,
                                borderRadius: '0.5rem',
                                overflow: 'hidden',
                              }}
                            >
                              <Image
                                src={item.images?.[0] ?? '/default.jpg'}
                                alt={item.name}
                                width={120}
                                height={80}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                              />
                            </div>

                            {/* Column 2: Title + Description */}
                            <div className="flex-grow-1 d-flex flex-column justify-content-between">
                              <div>
                                <h6 className="fw-semibold mb-1" style={{ fontSize: '0.9rem' }}>
                                  {item.name}{' '}
                                  <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                                    ({item.category})
                                  </span>
                                </h6>
                                <p
                                  className="mb-0 dangerously-set description"
                                  style={{
                                    fontSize: '0.75rem',
                                    color: '#555',
                                    lineHeight: 1.4,
                                    maxHeight: '5.6em',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                  }}
                                  dangerouslySetInnerHTML={{ __html: item.description }}
                                />
                              </div>
                            </div>

                            {/* Column 3: Visit + Price */}
                            <div
                              className="d-flex flex-column justify-content-between text-end"
                              style={{ minWidth: '120px' }}
                            >
                              <Link href={item.link}>
                                <button className="btn btn-outline-success btn-sm rounded-pill px-3">Visit</button>
                              </Link>

                              {item.price && (
                                <div
                                  className="mt-2"
                                  style={{
                                    fontSize: '0.7rem',
                                    color: '#2d5f4e',
                                    fontWeight: 500,
                                    whiteSpace: 'pre-line',
                                    textAlign: 'right',
                                  }}
                                  dangerouslySetInnerHTML={{ __html: item.price }}
                                />
                              )}
                            </div>
                          </div>
                        ))}

                        {/* Show More button if needed */}
                        {filteredResults.length > visibleResults.length && (
                          <div className="text-center py-2">
                            <button
                              className="btn btn-sm btn-outline-success rounded-pill px-4 fw-semibold"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => setVisibleCount(visibleCount + 6)}
                            >
                              Show More
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="px-3 py-2 text-muted">No results found.</div>
                    )}
                  </div>
                )}

                {searchTerm.length > 0 && searchTerm.length < 3 && (
                  <div className="px-3 py-2 mt-3 text-muted border bg-white rounded">
                    Type at least 3 characters to search.
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Why Visit Section */}
      {place && <WhyVisit place={place} />}

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
      {/* Styles */}
      <style jsx global>{`
        .custom-owl-carousel .owl-nav {
          position: absolute;
          top: 50%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          transform: translateY(-50%);
          padding: 0 10px;
        }
        .custom-owl-carousel .owl-nav button {
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .custom-owl-carousel .owl-nav button:hover {
          background: #34cc9c !important;
          color: #fff !important;
        }
        .mother {
          font-size: 0.7rem;
          line-height: 1.4;
          color: #6c757d;
        }
        .mother p {
          font-size: 0.8rem;
          color: rgb(41, 41, 41);
        }
        .input-group input:focus {
          box-shadow: 0 0 0 0.2rem rgba(52, 204, 156, 0.25);
          border-color: #34cc9c;
        }
        .input-group-text {
          background-color: #fff;
          border-color: #dee2e6;
        }
        .form-control::placeholder {
          color: #adb5bd;
          font-style: italic;
        }
        .z-index-100 {
          z-index: 1000;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        .search-dropdown {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}
.description {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
  max-height: 5.6em; /* 4 lines * line-height */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}
  .search-dropdown {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
}
.search-result-item:hover {
  background-color: #f8fdfc;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}
.description {
  font-size: 0.8rem;
  color: #555;
  line-height: 1.4;
  max-height: 5.6em; /* 4 lines */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
}

.badge {
  font-size: 0.65rem;
  padding: 0.25em 0.5em;
  border-radius: 0.5rem;
}
  .search-result-item {
  transition: background-color 0.2s ease-in-out;
}
.search-result-item:hover {
  background-color: #f0f9f6;
  cursor: pointer;
}

      `}</style>

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
