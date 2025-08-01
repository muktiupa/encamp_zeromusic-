import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ZfmVisitorTips = () => {
  return (
    <div className="container py-5">
      <h2 className="fw-bold">Tips for First-Time ZFM Visitors</h2>
      <p className="text-success fs-5 fst-italic">Read this before you pack your bags for Ziro.</p>

      <ul className="mb-4">
        <li><strong>Pack smart:</strong> Days are warm, but nights can get cold. Carry layered clothing, a raincoat, and gumboots.</li>
        <li><strong>Stay charged:</strong> Carry a power bank and don’t rely on strong network coverage — it can be patchy.</li>
        <li><strong>Cash is king:</strong> ATMs are limited and may run dry — keep cash for local eats and transport.</li>
        <li><strong>Don’t forget your ILP or PAP:</strong> Permits are mandatory to enter Arunachal. Get them in advance.</li>
        <li><strong>Try the local food:</strong> Ziro has a beautiful mix of tribal cuisine, momos, and rice beer — soak in the full experience!</li>
        <li><strong>Be respectful:</strong> Ziro is a tribal region — be mindful of local customs and keep the valley clean.</li>
      </ul>

      <h5 className="text-success fst-italic">Permits You’ll Need to Attend ZFM</h5>
      <p>
        To enter Arunachal Pradesh — whether for Ziro Music Festival or any other trip — you’ll need one of the following official permits depending on your nationality:
      </p>

      <h6><strong>For Indian Citizens (Non-Arunachal Residents):</strong></h6>
      <p>You must obtain an Inner Line Permit (ILP) to visit Ziro. You can get it:</p>
      <ul>
        <li>Online via the official Arunachal ILP portal</li>
        <li>
          Or offline from state government offices in Delhi, Kolkata, Guwahati, Shillong, Tezpur, Dibrugarh, Jorhat, and Lakhimpur
        </li>
      </ul>

      <h6><strong>For Foreign Nationals:</strong></h6>
      <p>A Protected Area Permit (PAP) is required to enter Arunachal Pradesh. This can be obtained from:</p>
      <ul>
        <li>Any Indian Mission abroad</li>
        <li>FRRO offices in Delhi, Mumbai, Kolkata</li>
        <li>Chief Immigration Officer, Chennai</li>
        <li>Or directly from the Home Ministry (India) or Home Commissioner, Arunachal Pradesh</li>
      </ul>
    </div>
  );
};

export default ZfmVisitorTips;
