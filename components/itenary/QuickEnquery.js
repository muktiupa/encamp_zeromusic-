import React, { useState, useEffect } from 'react';

const QuickEnquery = ({manualLoad , setManualLoad}) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);


  useEffect(() => {
    // Set a timer to load the script automatically after 10 seconds
    const timer = setTimeout(() => {
      loadScript();
    }, 100000); // 50 seconds delay

    // Clean up the timer when the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const loadScript = () => {
    if (!scriptLoaded) {
      const script = document.createElement('script');
      script.src = 'https://link.msgsndr.com/js/form_embed.js';
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    }
  };


  return (
    <div>

      {(scriptLoaded) && (
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/8hJHi2BBvOJXVq1u2vSs"
          style={{
            display: 'none', 
            width: '100%', 
            height: '100%', 
            border: 'none', 
            borderRadius: '3px',
          }}
          id="popup-8hJHi2BBvOJXVq1u2vSs"
          data-layout="{'id':'POPUP'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Generic Form Email"
          data-height="1074"
          data-layout-iframe-id="popup-8hJHi2BBvOJXVq1u2vSs"
          data-form-id="8hJHi2BBvOJXVq1u2vSs"
          title="Generic Form Email"
        />
      )}
    </div>
  );
};

export default QuickEnquery;
