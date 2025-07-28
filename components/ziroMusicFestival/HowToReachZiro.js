import Link from 'next/link';


export default function HowToReachZiro() {
  return (
    <section className="py-5 bg-white text-dark">
      <div className="container">
        {/* Heading */}
        <h2 className="fw-bold text-center mb-2">
          How to Reach Ziro Valley for ZFM 2025
        </h2>
        <p className="text-center text-info fst-italic mb-4">
          Three ways to get to India’s most scenic music festival.
        </p>

        {/* Introduction */}
        <p className="mb-3">
          Ziro Valley, tucked away in the mountains of Arunachal Pradesh, is accessible but requires
          some planning. Here’s a quick guide on the best ways to reach this beautiful destination
          comfortably. Please note that foreigners traveling to Arunachal Pradesh need a Protected
          Area Permit (PAP), and Indians need an Inner Line Permit (ILP), which you should arrange
          prior to your journey.
        </p>

        {/* Travel Methods */}
        <div className="mb-3">
          <p>
            <strong>1. By Train (Most Popular)</strong><br />
            Take the overnight Donyi Polo Express from Guwahati to Naharlagun. From there, shared
            taxis take ~3 hours to reach Ziro.
          </p>
          <p>
            <strong>2. By Air</strong><br />
            Fly to Holongi (Itanagar), Lilabari, or Dibrugarh airports. Ziro is 3.5 to 5 hours away
            by road depending on the airport.
          </p>
          <p>
            <strong>3. By Road</strong><br />
            You can drive or take a taxi from Guwahati (~9 hrs), Naharlagun (~3 hrs), or Dibrugarh
            (~5 hrs). Roads are beautiful but may be rough in patches.
          </p>
        </div>

        {/* Tip Section */}
        <p className="fst-italic">
          Want a detailed breakdown of routes, travel tips & options?
        </p>
        <p className="fw-bold">
  <Link href="/guide/how-to-reach-ziro" className="text-decoration-none text-secondary">
    Read Our Complete Guide on How to Reach Ziro →
  </Link>
</p>

        <hr className="my-5" />

        {/* Travel Help Section */}
        <h5 className="text-success fw-semibold">Need Help with Travel?</h5>
        <p>
          Reaching Ziro can be tricky — but not when you book with us. We offer convenient pick-up
          and drop services from nearby travel hubs including Naharlagun Railway Station and Holongi
          Airport, so you don’t have to worry about a thing.
        </p>
        <p>
          Our pre-arranged, chargeable transfers are reliable, comfortable, and synced with the
          festival schedule. Whether you’re flying solo or in a group, we’ve got a seat waiting for
          you.
        </p>
        <p>
          Add it to your package during checkout and we’ll take care of the rest.
        </p>
      </div>
    </section>
  );
}
