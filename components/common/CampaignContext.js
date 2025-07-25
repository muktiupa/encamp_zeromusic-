import React, { createContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

const CAMPAIGN_COOKIE_KEY = "campaign_data";

export const CampaignContext = createContext({
  fetchParams: () => {},
  resetParams: () => {},
});

const CampaignProvider = ({ children }) => {
  const router = useRouter();

  const fetchParams = useCallback(() => {
    if (typeof window === "undefined") return null;

    const allowedParams = [
      "urcc",
      "gclid",
      "utm_campaign",
      "utm_source",
      "utm_keyword",
      "page",
    ];

    const urlSearchParams = new URLSearchParams(window.location.search);
    const result = {};

    allowedParams.forEach((param) => {
      const value = urlSearchParams.get(param);
      if (value) result[param] = value;
    });

    if (Object.keys(result).length > 0) {
      const encoded = encodeURIComponent(JSON.stringify(result));
      document.cookie = `${CAMPAIGN_COOKIE_KEY}=${encoded}; path=/; max-age=${7 * 24 * 60 * 60}`;
      return result;
    }

    return null;
  }, []);

  const resetParams = useCallback(() => {
    if (typeof window === "undefined") return;
    document.cookie = `${CAMPAIGN_COOKIE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }, []);

  useEffect(() => {
    fetchParams();
  }, [router.asPath, fetchParams]);

  return (
    <CampaignContext.Provider value={{ fetchParams, resetParams }}>
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignProvider;
