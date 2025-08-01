import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZfmDiaries = () => {
  return (
    <div className="container py-5 text-center">
      <h3 className="fw-bold">ZFM Diaries – Peek into the Experience</h3>
      <p className="text-success fst-italic">
        A Glimpse into the Vibe – Past ZFM Moments
      </p>

      <div className="ratio ratio-16x9 shadow rounded overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/oOM2SYzj614?si=JytSWm23n1g41655"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default ZfmDiaries;
