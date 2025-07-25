import { useEffect, useState , useMemo } from 'react';
import dynamic from 'next/dynamic';
import HtmlHead from '../../components/common/HtmlHead';
import Header from '../../components/common/Header';
import adminapi from '../../api/adminapi';
import Image from 'next/image';
import Link from 'next/link';
import Footer from '../../components/common/Footer';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import debounce from 'lodash.debounce';


const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });


export default function AllPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [prevSearchTerm, setPrevSearchTerm] = useState('');
  const [allSearchResults, setAllSearchResults] = useState([]);



  const fetchSearchResults = async (query) => {
    setSearchLoading(true);
    try {
      const res = await adminapi.get(`/newsearch?search=${encodeURIComponent(query)}`);
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


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await adminapi.get('/places');
        setPlaces(res.data);
      } catch (error) {
        console.error('Error fetching places:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1000: { items: 1 },
  };

  return (
    <div>
      <HtmlHead title="Explore All Destinations" />
      <Header />
      {/* Filter Grid*/}
      <div className="position-relative pt-5" style={{ backgroundColor: '#f0f9f6' }}>
        <div className="container py-5 text-center">
          <h1 className="display-5 fw-bold mb-3 text-dark mt-5">Explore India&apos;s Hidden Gems</h1>
          <p className="lead mb-4 text-muted">Discover handpicked destinations across Northeast India</p>

          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <div className="position-relative" style={{ zIndex: 1050 }}>
                {/* Search Input */}
                <div className="input-group shadow-sm">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded-start border-end-0"
                    placeholder="Search destinations, events, or experiences..."
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
      {/* Places Grid */}
      <section className="container py-5">
        <div className="text-center mb-5">
          <h2 className="mb-3">All Destinations</h2>
          <p className="text-muted">Select a destination to explore tour packages</p>
        </div>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : places.length > 0 ? (
          <div className="row g-4">
            {places.map((place) => (
              <div className="col-12 col-sm-6 col-lg-4" key={place._id}>
                <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                  {/* Owl Carousel */}
                  <div className="position-relative" style={{ height: '250px' }}>
                    <OwlCarousel
                      className="owl-theme custom-owl-carousel h-100"
                      responsive={responsive}
                      loop
                      nav
                      dots
                      navText={[
                        '<i class="fa fa-chevron-left"></i>',
                        '<i class="fa fa-chevron-right"></i>',
                      ]}
                    >
                      {(place.images || []).map((img, i) => (
                        <div key={i} className="position-relative" style={{ height: '250px' }}>
                          <Image
                            src={img}
                            alt={place.name}
                            layout="fill"
                            objectFit="cover"
                            className="img-fluid"
                          />
                          {/* Overlay Title */}
                          <div
                            className="position-absolute w-100 text-left text-white fw-bold"
                            style={{
                              bottom: 0,
                              padding: '0.75rem 0.5rem',
                              fontSize: '3.5rem',
                              fontFamily: 'Caveat',
                              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
                              zIndex: 2,
                              textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                            }}
                          >
                            {place.state}
                          </div>
                        </div>
                      ))}
                    </OwlCarousel>
                  </div>

                  {/* Summary & Button */}
                  <div className="card-body d-flex flex-column">
                    <div
                      className="text-muted mb-1 mother dangerously-set"
                      style={{ fontSize: '0.8rem' }}
                      dangerouslySetInnerHTML={{
                        __html: place.summery || `Explore the beautiful landscapes of ${place.name}`,
                      }}
                    />
                    <div className="mt-auto">
                      <Link href={`/destinations/${place.state}`} className="text-decoration-none w-100 d-block">
                        <div
                          className="text-center py-2 rounded-pill"
                          style={{
                            backgroundColor: '#34cc9c',
                            color: '#fff',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          View Packages
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">No destinations found</p>
          </div>
        )}
      </section>

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
