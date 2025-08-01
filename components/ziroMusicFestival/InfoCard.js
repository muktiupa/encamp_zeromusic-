import React from 'react'
import FestivalPackageCard from './FestivalPackageCard'

function InfoCard() {
  return (
    <>
    {/* Right: Ticket Info */}
        <div className="col-12 col-md-5">
          <div className="p-4 bg-light rounded shadow">
            <h4 className="text-success fst-italic mb-3">ZFM DETAILS</h4>
            <p><strong>Where?</strong><br />Biiri, Ziro, Arunachal Pradesh 791120</p>
            <p><strong>When?</strong><br />25th – 28th Sep 2025</p>
            <p className="fw-bold">Why pay more? Get tickets at a discounted price!</p>
            <button className="btn btn-warning w-100 py-3 mb-2 fw-bold">Buy Tickets</button>
            <div className="d-flex gap-2">
              <span className="text-decoration-line-through text-muted">₹9,000</span>
              <span className="fw-bold">₹8,400</span>
            </div>
          </div>
          <div className="pt-4" >
          <FestivalPackageCard/>
          </div>
        </div>

    </>
  )
}

export default InfoCard