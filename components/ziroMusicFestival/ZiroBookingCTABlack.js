// components/ZiroBookingCTABlack.js

export default function ZiroBookingCTABlack() {
  return (
    <div style={{ backgroundColor: "#000000" }} className="py-5 w-100">
      <div className="container text-white">
        <div className="row align-items-center">
          {/* Left Text Section */}
          <div className="col-lg-7 mb-4 mb-lg-0">
            <h2 className="fw-bold">
              Ready to Book Your <br />
              Ziro Festival 2025 Experience?
            </h2>
            <p className="text-warning fs-5 mt-3 fst-italic">
              Your Ziro Music Festival Adventure Starts Here
            </p>
            <p className="text-success fst-italic">
              Limited tents. Unlimited memories.
            </p>
            <p className="text-light">
              Skip the hassle — get your discounted festival tickets, premium
              camping, and epic local experiences in one smooth booking.
              Lock in your spot now and party stress-free!
            </p>
            <a
              href="#booking"
              className="btn btn-success btn-lg mt-3 fw-bold px-4"
            >
              Book My All-In-One Ziro Package
            </a>
          </div>

          {/* Right Image Section */}
          <div className="col-lg-5 text-center">
            <img
              src="/images/ziroMan.png"
              alt="Ziro Festival Guy"
              className="img-fluid rounded"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
