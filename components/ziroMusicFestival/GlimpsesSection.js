export default function GlimpsesSection() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">

          {/* 👉 YouTube Video Embed */}
          <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center"
  style={{
   backgroundImage: 'url("assets/img/zfm/boxes.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain', // makes background image small
          padding: '60px',
          borderRadius: '12px',
  }}
>
  <div className="ratio ratio-16x9 rounded shadow">
    <iframe
      className="rounded"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/oOM2SYzj614?si=nbaEJDHRZ5OUNzsu"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  </div>
</div>


          {/* 👉 Glimpses Content */}
          <div className="col-md-6">
            <h4 className="fw-bold mb-3">
              Glimpses of Ziro Music Festival 2024 with Encamp!
            </h4>
            <p>
              Set in the misty, pine-covered Ziro Valley of Arunachal Pradesh, Ziro Music Festival is more than just music — it’s a 4 day escape into nature, culture, and unforgettable vibes.
            </p>
            <p>
              Expect powerful indie lineups, local artists, camping under stars, and a tribe of music lovers from across India who return each year for one reason:
            </p>
            <p className="fw-semibold">
              Ziro feels like home!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
