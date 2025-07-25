const VehicleContent = () => {
    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                <h1 className="fw-bold display-6">Book Clean, Reliable & Affordable Vehicles</h1>
                <p className="text-muted">Across Northeast India, Nepal & Bhutan – With <strong>Encamp</strong></p>
                <span className="badge bg-success fs-6 mt-2">
                    <i className="bi bi-star-fill me-1"></i> Rated 4.6★ by 15,000+ Travelers
                </span>
            </div>

            <div className="row mb-5">
                <div className="col-md-6">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold mb-3" style={{fontSize:'1.5rem'}}>Why Book with Encamp?</h5>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <i className="bi bi-cash-coin me-2 text-primary"></i>
                                    <strong>Instant 10% Discount</strong> on all online bookings. No promo code needed.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-map me-2 text-primary"></i>
                                    <strong>Flexible Sightseeing</strong> – no extra cost for small detours.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-tree me-2 text-success"></i>
                                    <strong>Eco-Friendly Travel</strong> – low-emission vehicles & carbon tracking.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-person-check me-2 text-dark"></i>
                                    <strong>Professional Drivers</strong> – no haggling, no hidden costs.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-shield-check me-2 text-warning"></i>
                                    <strong>Clean, Maintained Vehicles</strong> – sanitized daily.
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-globe-asia-australia me-2 text-info"></i>
                                    <strong>Local Experts</strong> help plan your routes for free.
                                </li>
                                <li>
                                    <i className="bi bi-house-heart me-2 text-danger"></i>
                                    <strong>Access Unique Stays</strong> – boutique homestays & eco-retreats.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mt-4 mt-md-0">
                    <div className="card shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="card-title fw-bold mb-3" style={{fontSize:'1.5rem'}}>Vehicle Options for Every Traveler</h5>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">SUV, Sedan, Luxury Caravans & Tempo Travellers</li>
                                <li className="list-group-item">4x4s for treks and off-road terrain</li>
                                <li className="list-group-item">Airport pickups in Guwahati, Siliguri, Kathmandu & Paro</li>
                                <li className="list-group-item">Intercity Transfers – Assam to Bhutan & Nepal</li>
                                <li className="list-group-item">
                                    <strong>Luxury Caravans:</strong> AC caravans with beds, kitchen, and scenic spots
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <h4 className="fw-bold mb-2">Travel Better With Encamp</h4>
                <p className="text-muted">Easy booking. Clean rides. Expert support. Real local impact.</p>
                <a href="#book-now" className="btn btn-dark btn-lg px-4">
                    <i className="bi bi-car-front me-2"></i>Book Now
                </a>
            </div>
        </div>

    );
}
export default VehicleContent;