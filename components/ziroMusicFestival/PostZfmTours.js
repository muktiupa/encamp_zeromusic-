import React, { useState } from 'react';

const tours = {
  Tawang: {
    image: '/images/tawang.jpg', // Replace with your actual image
    description: `Explore Northeast India's wonders with a captivating 8-day itinerary. From Dirang’s serene landscapes to Tawang’s rich history, experience Sela Pass, Tawang Monastery, and more. Embark on adventures like Bumla Pass and immerse in Sangti Valley’s beauty. End with cherished memories as you depart from Guwahati Airport.`,
  },
  Anini: {
    image: '/images/anini.jpg',
    description: `Discover the untouched beauty of Anini with breathtaking views, serene treks, and local experiences. This hidden gem in Arunachal offers peace, culture, and adventure away from the crowds. Explore tribal villages and wake up to the sound of the clouds.`,
  },
};

const PostZfmTours = () => {
  const [activeTour, setActiveTour] = useState('Tawang');

  return (
    <div className="container py-5">
      <h4 className="text-center text-muted fst-italic">Extend the Vibe – Post-ZFM Tours</h4>
      <p className="text-center text-success fst-italic">
        Post ZFM 2024, we've organized 2 tours. You can add these to your camping package on the booking screen.
      </p>

      <div className="d-flex justify-content-center gap-3 my-4">
        <button
          className={`btn ${activeTour === 'Tawang' ? 'btn-success' : 'btn-light'} fw-bold shadow`}
          onClick={() => setActiveTour('Tawang')}
        >
          Tawang Tour
        </button>
        <button
          className={`btn ${activeTour === 'Anini' ? 'btn-success' : 'btn-light'} fw-bold shadow`}
          onClick={() => setActiveTour('Anini')}
        >
          Anini Tour
        </button>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4">
          <div className="position-relative rounded overflow-hidden shadow">
            <img
              src={tours[activeTour].image}
              alt={`${activeTour} Image`}
              className="img-fluid w-100"
              style={{ maxHeight: '350px', objectFit: 'cover' }}
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 bg-light rounded-circle p-2 shadow"
              style={{ cursor: 'pointer' }}
              onClick={() => setActiveTour(activeTour === 'Tawang' ? 'Anini' : 'Tawang')}
            >
              ▶
            </span>
          </div>
        </div>

        <div className="col-md-6">
          <p className="text-muted">{tours[activeTour].description}</p>
          <button className="btn btn-success px-4 mt-2">View Tour</button>
        </div>
      </div>
    </div>
  );
};

export default PostZfmTours;
