import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const testimonials = [
  {
    name: 'Rajiv Mehta',
    role: 'Fashion Designer, Mumbai',
    text: `Absolutely blown away by the quality of service. Starting from fitting in season’s best locations in the itinerary & arranging wonderful properties to effortlessly accommodating last minute requests – everything was top notch. Five stars all the way!`,
    image: '/images/rajiv.png', // place in public/images
  },
  {
    name: 'Mompia Gogoi',
    role: 'Tech Lead, Bangalore',
    text: `Just a wonderful set of people. If you feel you need a fresh breath of air, you need to be with Encamp. Arranging camps at some of these locations is one heck of a task in itself. But these guys blend it with good food and service. They have literally leap-bounded my expectations.`,
    image: '/images/mompia.png', // place in public/images
  },
];

const Testimonials = () => {
  return (
    <div className="container py-5 text-center">
      <h5 className="text-muted fst-italic">Hear From Previous Encampers!</h5>
      <p className="text-success fw-semibold fst-italic">Testimonials</p>

      <div className="row justify-content-center mt-4">
        {testimonials.map((testimonial, index) => (
          <div className="col-md-5 mx-3 my-3" key={index}>
            <div className="bg-white shadow rounded p-4 position-relative">
              <div
                className="position-absolute top-0 start-50 translate-middle rounded-circle bg-success text-white p-2"
                style={{ marginTop: '-20px' }}
              >
                <i className="bi bi-quote fs-5"></i>
              </div>
              <p className="mt-4 text-muted">{testimonial.text}</p>
              <div className="d-flex align-items-center mt-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-circle me-3"
                  width="50"
                  height="50"
                />
                <div className="text-start">
                  <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
                  <small className="text-muted">{testimonial.role}</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
