// components/WhereToStay.js
import React from 'react';
import Image from 'next/image';

export default function WhereToStay() {
  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Where to Stay?</h2>
        <p className="text-success fst-italic">
          Book early, stay close — camping is the festival way.
        </p>
      </div>

      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="rounded shadow overflow-hidden">
            <Image
              src="/assets/img/zfm/camp.jpg"
              alt="Tents in campsite"
              width={600}
              height={400}
              className="img-fluid"
            />
          </div>
        </div>

        <div className="col-md-6">
          <p>
            Accommodation in Ziro during the festival is limited and usually gets booked months in advance.
            Hotels are few and far between, and homestays are scattered across the valley — often far from the venue.
          </p>
          <p>
            That’s why most festival-goers choose to camp close to the action — for the vibe, the community, and the convenience.
            Whether you're traveling solo, with friends, or as a couple, our official campsite options offer something for everyone —
            from budget tents to premium stays with added perks like bonfires, local experiences, and 24×7 support.
          </p>
        </div>
      </div>
    </section>
  );
}
