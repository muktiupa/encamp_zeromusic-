import React from 'react';

export default function FestivalPackageCard() {
  return (
    <div className="card text-white" style={{ backgroundColor: '#3e3e3e', borderRadius: '12px', padding: '20px', width: 'fit-content' }}>
      <div className="card-body text-start">
        <h5 className="card-title fw-bold text-white">Want the full festival experience?</h5>
        <p className="card-text text-white">
          Book your pass, camping stay <br />
          & additional fun activities!
        </p>
        <a href="#" className="btn btn-warning fw-bold px-4 py-3 w-100 rounded-3">
          View Full Package
        </a>
      </div>
    </div>
  );
}
