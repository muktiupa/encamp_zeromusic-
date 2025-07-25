import '../styles/default.css';
import '../styles/style.css';
import '../styles/responsive.css';

import Loader from "../components/common/Loading";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import CampaignProvider from "../components/common/CampaignContext";

function MyApp({ Component, pageProps }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_INVISIBLE_RECAPTCHA_SITEKEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <CampaignProvider>
        <Loader />
        <Component {...pageProps} />
      </CampaignProvider>
    </GoogleReCaptchaProvider>
  );
}

export default MyApp;
