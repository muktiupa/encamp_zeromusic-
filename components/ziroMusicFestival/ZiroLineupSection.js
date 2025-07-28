export default function ZiroLineupSection() {
  // 🖼️ Array of artist images
  const artistImages = [
    {
      src: "assets/img/zfm/a.jpg",
      alt: "Artist performing under yellow lights",
    },
    {
      src: "assets/img/zfm/b.jpg",
      alt: "Indie singer with keyboard",
    },
    {
      src: "assets/img/zfm/c.jpg",
      alt: "Rock band live at Ziro",
    },
    {
      src: "assets/img/zfm/d.jpg",
      alt: "Artist with spotlight on stage",
    },
    {
      src: "assets/img/zfm/a.jpg",
      alt: "Colorful stage at night",
    },
    {
      src: "assets/img/zfm/b.jpg",
      alt: "Solo performer at Ziro Festival",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container text-center">

        {/* Heading */}
        <h3 className="fw-bold mb-2">
          Ziro Music Festival 2025 Lineup & Artists
        </h3>

        {/* Subheading */}
        <p className="text-success fst-italic mb-4">
          Expect the unexpected — a sonic journey awaits.
        </p>

        {/* Description */}
        <p className="text-muted text-start">
          The official artist lineup for Ziro Music Festival 2025 hasn’t been announced yet — but if the past is anything to go by,
          you’re in for something magical. In previous years, the stage has hosted the likes of <strong>Kailash Kher – Kailasa</strong>,
          <strong> Hanumankind</strong>, <strong>Taba Chake</strong>, <strong>Alobo Naga</strong>, <strong>Lifafa</strong>,
          <strong> Thermal and a Quarter</strong>, <strong>The F16s</strong> and many more indie powerhouses.
        </p>

        {/* Highlight */}
        <p className="fw-semibold mt-3 text-start">
          Until the 2025 lineup drops, we’re featuring the 2024 artist lineup to give you a taste of what’s coming.
        </p>

        {/* Image Grid */}
        <div  className="row mt-4 g-1">
          {artistImages.map((artist, index) => (
            <div className="col-6 col-md-2" key={index}>
              <img
                src={artist.src}
                alt={artist.alt}
                className="img-fluid rounded shadow-sm"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
