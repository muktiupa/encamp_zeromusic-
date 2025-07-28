'use client';
import React from 'react';
import Image from 'next/image';

export default function ZiroFestivalPackage() {
  return (
    <section className="py-5 bg-dark text-white text-center">
      <div className="container">
        {/* Heading */}
        <h2 className="fw-bold mb-2 text-light">
          EnCamp’s Ziro Festival Package: Music, Stay & Beyond
        </h2>
        <p className="text-warning fst-italic">
          Your all-in-one pass to ZFM 2025 — with exclusive discounts and zero hassle.
        </p>

        {/* Image */}
        <div className="my-4">
          <Image
            src="/assets/img/zfm/ziro-festival.jpg"
            alt="Ziro Festival"
            className="img-fluid rounded border"
            width={1200}
            height={600}
            layout="responsive"
          />
        </div>

        {/* Description */}
        <div className="text-light px-2 px-md-5">
          <p className='text-light'>
            Ziro Music Festival isn’t just a concert — it’s a 4-day getaway into the mountains
            where indie music meets tribal culture. Hosted in the heart of Ziro Valley, the vibe is
            raw, real, and unforgettable.
          </p>

          <p className="fw-bold text-light">
            But here’s the best part: we handle everything for you. From your festival pass to your
            campsite stay, and even local experiences — book your entire Ziro journey in one place.
          </p>

          <p className='text-light'>
            No juggling tickets, hotels, permits, or cabs. Just show up and soak in the music,
            views, and vibrant energy:
          </p>
        </div>

        {/* Bullet Points */}
        <ul className="list-unstyled text-start mx-auto d-inline-block px-3">
          <li>• Festival Ticket Included</li>
          <li>• Premium Campsite Stay</li>
          <li>• Local Activities & Tours</li>
          <li>• Permits, Pick-up Services & Assistance Handled</li>
        </ul>

        {/* Button */}
        <div className="mt-4">
          <a href="#" className="btn btn-light btn-lg px-4 fw-bold">
            View Complete Package
          </a>
        </div>
      </div>
    </section>
  );
}
