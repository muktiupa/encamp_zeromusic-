import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const activities = [
  {
    title: 'Village Guided Walks',
    price: '₹ 600/pax',
    image: '/images/village-walk.jpg', // Replace with your actual image path
  },
  {
    title: 'Ziro Valley Sightseeing',
    price: '₹ 1500/pax',
    image: '/images/ziro-sightseeing.jpg',
  },
  {
    title: 'Fishing in Paddy Field',
    price: '₹ 800/pax',
    image: '/images/fishing.jpg',
    highlight: true,
  },
  {
    title: 'Winery Visit',
    price: '₹ 2500/pax',
    image: '/images/winery.jpg',
  },
];

const ZiroActivities = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold">Things To Do in Ziro</h2>
      <p className="text-center fst-italic text-secondary">
        Experience Ziro Beyond the Stage - Tours &amp; Nature
      </p>
      <p className="text-center text-success fst-italic">
        Personalize Your Experience with Extra Activities
      </p>
      <p className="text-center text-muted">
        At Ziro Festival, there’s more to enjoy than just great music. You can explore the scenic surroundings,
        join local village tours, try traditional food, and take part in activities like yoga or nature walks.
        It’s a perfect blend of music, culture, and nature in one unforgettable experience.
      </p>

      <div className="row mt-4">
        {activities.map((activity, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <div className={`card shadow h-100 border-0 ${activity.highlight ? 'border border-warning border-3' : ''}`}>
              <img
                src={activity.image}
                className="card-img-top"
                alt={activity.title}
                style={{ height: '250px', objectFit: 'cover' }}
              />
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <h5 className="card-title">{activity.title}</h5>
                <p className="text-success fw-bold">{activity.price}</p>
                <button className="btn btn-success px-4">Add</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZiroActivities;
