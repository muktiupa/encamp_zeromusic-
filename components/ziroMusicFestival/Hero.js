import React from 'react'

function Hero() {
  return (

        <section id='Hero'>
            <section id="book-now" className="trip__hero__area">
                <div
                    className="trip__hero__slide_vehicle"
                    style={{
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: 'url(assets/img/zfm/zfmHero.jpg)'
                    }}
                >
                    <div className="trip__hero__content p-5">
                        {/* <h6 className="text-white small fw-bold">Eco-friendly Transport</h6> */}
                        <h2 style={{ marginTop: '-12px' }}>Ziro Music Festical 2025</h2>
                        <p className="text-white">25th - 28th Sep 2025</p>
                    </div>
                </div>
            </section>
        </section>

  )
}

export default Hero