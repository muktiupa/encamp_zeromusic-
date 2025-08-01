import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';

export default function ZiroStayHighlights() {
  return (
    <div className="container py-5">
      <h2 className="text-center text-success fw-bold">Encamp Adventures</h2>
      <h4 className="text-center fw-semibold">Your Stay at Ziro</h4>
      <p className="text-center fst-italic text-muted">
        The Ultimate Camping Experience <br />
        <span className="text-success">Trusted. Comfortable. Festival-Ready.</span>
      </p>

      {/* Icons Row */}
      <div className="row text-center mb-4">
        {['Jam Session', 'Bonfire', 'Common Chill Zone', 'Clothesline'].map((item, idx) => (
          <div className="col-6 col-md-3 mb-3" key={idx}>
            <Image
              src={`https://encampadventures.com/_next/image?url=%2Fassets%2Fziro%2Fencamp%2F2.png&w=1080&q=75.png`}
              alt={item}
              width={80}
              height={80}
              className="mb-2"
            />
            <p className="small fw-semibold">{item}</p>
          </div>
        ))}
      </div>

      {/* Features List */}
      <ul className="mb-5">
        <li><strong>Bamboo Lounges & Starlit Skies:</strong> Chill under the stars in our cozy bamboo setups.</li>
        <li><strong>Music & Bonfires:</strong> Nightly bonfire jams and music sessions with fellow campers.</li>
        <li><strong>Eco-Friendly Setup:</strong> Sustainable, green, and clean campsite design.</li>
        <li><strong>Smooth Operations:</strong> Fast check-ins and hassle-free experience.</li>
        <li><strong>24/7 On-Ground Support:</strong> Always ready to assist with anything you need.</li>
        <li><strong>Future Caravan Parking:</strong> Dedicated space for road-trippers (coming soon).</li>
        <li><strong>Reliable Power Supply:</strong> Backup power so you’re never unplugged.</li>
        <li><strong>Smart Tent Allocation:</strong> Gender-specific tents, smooth check-in, and ready-to-use setups.</li>
      </ul>

      {/* Bottom Features Icons */}
      <div className="row text-center mb-5">
        {['Hygienic Washrooms', 'Toiletries', 'Zero Waste Camp', 'Clean Drinking Water'].map((item, idx) => (
          <div className="col-6 col-md-3 mb-3" key={idx}>
            <Image
              src={`/icons/feature${idx + 1}.png`}
              alt={item}
              width={80}
              height={80}
              className="mb-2"
            />
            <p className="small fw-semibold">{item}</p>
          </div>
        ))}
      </div>

      {/* Why Camp With Us Section */}
      <div className="row align-items-center">
        <div className="col-md-6">
          <h5 className="text-muted">Why Camp With Us?</h5>
          <h6 className="fst-italic text-primary">Experience, Safety & Epic Vibes</h6>
          <p className="text-success fw-semibold">10+ years of Ziro. One unforgettable stay.</p>
          <p>
            We’re not just another vendor — we’ve been part of the Ziro Music Festival journey since the early days.
            Our on-ground experience, local partnerships, and understanding of what festival-goers need is what sets us apart.
          </p>
          <p>
            From safe, supervised campsites to thoughtful details like morning chai and bonfire nights — everything we do is designed to give you the best possible experience.
          </p>
          <p>
            That’s why we’re one of the few <strong>officially listed vendors on the ZFM website every year.</strong>
          </p>
        </div>
        <div className="col-md-6 text-center">
          <div className="mb-3">
            <span className="fs-4 fw-bold">4.6 </span>
            <span className="text-warning">★★★★★</span>
            <p className="text-muted small">500+ Happy Customers!</p>
          </div>
          <Image
            src="/assets/img/zfm/camp2.jpg"
            alt="Happy campers"
            width={350}
            height={200}
            className="rounded img-fluid"
          />
        </div>
      </div>
    </div>
  );
}
