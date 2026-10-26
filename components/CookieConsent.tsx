"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const GA_ID = "G-M0H06BQMGY";
const STORAGE_KEY = "cookie-consent";
export const OPEN_EVENT = "open-cookie-settings";

type Choice = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Private mode or blocked storage: the banner will just show again next time.
  }
}

// Google Analytics is loaded only after the visitor accepts analytics cookies.
function loadAnalytics() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

// Removes the Analytics cookies (_ga, _ga_*) set before the visitor withdrew consent.
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domain}`;
      }
    }
  });
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "accepted") loadAnalytics();
    else if (choice === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const choose = (choice: Choice) => {
    const previous = readChoice();
    saveChoice(choice);
    setOpen(false);
    if (choice === "accepted") {
      loadAnalytics();
    } else {
      clearAnalyticsCookies();
      // Analytics was already running on this page: reload so it stops.
      if (previous === "accepted") window.location.reload();
    }
  };

  if (!open) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
      <p>
        We use analytics cookies (Google Analytics) to understand how visitors
        use this site. They are only set if you accept.{" "}
        <Link href="/policy">Privacy &amp; Cookie Policy</Link>
      </p>
      <div className="cookie-actions">
        <button className="cookie-btn" onClick={() => choose("rejected")}>
          Reject
        </button>
        <button
          className="cookie-btn cookie-btn-primary"
          onClick={() => choose("accepted")}
        >
          Accept
        </button>
      </div>
    </div>
  );
}
