"use client";

import { useEffect, useRef, useState } from "react";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.loquihq.com").replace(/\/$/, "");
const PRIVACY_URL = "https://www.loquihq.com/privacy";
const UTM_KEY = "lq_utm";

const ROLES = [
  { value: "solo_host", label: "Solo host" },
  { value: "host_with_team", label: "Host with a team" },
  { value: "agency_producer", label: "Agency or producer" },
  { value: "sponsored_show", label: "Sponsored show" },
];
const EPISODES = ["1-2", "3-4", "5+"];

type Field = "name" | "email" | "podcastName" | "podcastUrl" | "role" | "episodesPerMonth" | "consent";
type Utm = { utmSource?: string; utmMedium?: string; utmCampaign?: string };

/** UTM tags from this visit's link, remembered for the tab so a reload or scroll doesn't lose them. */
function readUtm(): Utm {
  const p = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {
    utmSource: p.get("utm_source") || undefined,
    utmMedium: p.get("utm_medium") || undefined,
    utmCampaign: p.get("utm_campaign") || undefined,
  };
  try {
    if (fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const saved = sessionStorage.getItem(UTM_KEY);
    return saved ? (JSON.parse(saved) as Utm) : {};
  } catch {
    return fromUrl; // storage blocked (private mode, some in-app browsers)
  }
}

const clean = (v: string | undefined) => (v ? v.trim().slice(0, 100).replace(/[^\w.\-+ ]/g, "") || undefined : undefined);

export default function WaitlistForm() {
  const [values, setValues] = useState({ name: "", email: "", podcastName: "", podcastUrl: "", role: "", episodesPerMonth: "", consent: false, company: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const startedAt = useRef<number>(0);
  const utm = useRef<Utm>({});
  const thanksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    utm.current = readUtm();
  }, []);

  useEffect(() => {
    if (done) thanksRef.current?.focus();
  }, [done]);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k as Field]) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  function validate(): Partial<Record<Field, string>> {
    const e: Partial<Record<Field, string>> = {};
    if (!values.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) e.email = "Please enter a valid email address.";
    if (!values.podcastName.trim()) e.podcastName = "Please enter your podcast name.";
    if (!/\.[a-z]{2,}/i.test(values.podcastUrl.trim())) e.podcastUrl = "Please enter a link to your podcast.";
    if (!values.role) e.role = "Please choose your role.";
    if (!values.episodesPerMonth) e.episodesPerMonth = "Please choose how many episodes you publish a month.";
    if (!values.consent) e.consent = "Please agree to receive beta invitations by email.";
    return e;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setFormError(null);
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/api/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          podcastName: values.podcastName,
          podcastUrl: values.podcastUrl,
          role: values.role,
          episodesPerMonth: values.episodesPerMonth,
          consent: values.consent,
          company: values.company,
          elapsedMs: Date.now() - startedAt.current,
          utmSource: clean(utm.current.utmSource),
          utmMedium: clean(utm.current.utmMedium),
          utmCampaign: clean(utm.current.utmCampaign),
        }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        const field = body?.field as Field | undefined;
        if (field && field in values) {
          setErrors({ [field]: body.error });
          document.getElementById(`f-${field}`)?.focus();
        } else {
          setFormError(body?.error || "Something went wrong. Please try again in a minute.");
        }
        return;
      }
      setDone(true);
    } catch {
      setFormError("We couldn’t reach LoquiHQ. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="card thanks" ref={thanksRef} tabIndex={-1} role="status" aria-live="polite">
        <h3>You’re on the list.</h3>
        <p>Thanks, {values.name.trim().split(/\s+/)[0]}. {values.podcastName.trim()} is on the LoquiHQ founding beta list.</p>
        <p>We haven’t set a date, and we won’t promise one until it’s real. We’re inviting founding shows in cohorts of 20 to 30, in the order people joined.</p>
        <p>Watch your email: a confirmation is on its way, and your invitation will come from the same address.</p>
        <p className="tag">Make noise. Keep your voice.</p>
      </div>
    );
  }

  const err = (k: Field) =>
    errors[k] ? (
      <p className="err" id={`e-${k}`}>
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: Field) => ({ id: `f-${k}`, "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <form className="card" onSubmit={onSubmit} noValidate aria-label="Join the founding beta list">
      {formError && (
        <p className="alert" role="alert">
          {formError}
        </p>
      )}
      <div className="row2">
        <div className="field">
          <label htmlFor="f-name">
            Name <span className="req">*</span>
          </label>
          <input className="input" type="text" autoComplete="name" required maxLength={120} value={values.name} onChange={set("name")} {...a11y("name")} />
          {err("name")}
        </div>
        <div className="field">
          <label htmlFor="f-email">
            Email <span className="req">*</span>
          </label>
          <input className="input" type="email" inputMode="email" autoComplete="email" required maxLength={254} value={values.email} onChange={set("email")} {...a11y("email")} />
          {err("email")}
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="f-podcastName">
            Podcast name <span className="req">*</span>
          </label>
          <input className="input" type="text" required maxLength={160} value={values.podcastName} onChange={set("podcastName")} {...a11y("podcastName")} />
          {err("podcastName")}
        </div>
        <div className="field">
          <label htmlFor="f-podcastUrl">
            Podcast link <span className="req">*</span>
          </label>
          <input className="input" type="url" inputMode="url" autoComplete="url" placeholder="Apple, Spotify, YouTube or your site" required maxLength={500} value={values.podcastUrl} onChange={set("podcastUrl")} {...a11y("podcastUrl")} />
          {err("podcastUrl")}
        </div>
      </div>
      <div className="row2">
        <div className="field">
          <label htmlFor="f-role">
            Role <span className="req">*</span>
          </label>
          <select className="select" required value={values.role} onChange={set("role")} {...a11y("role")}>
            <option value="" disabled>
              Choose one
            </option>
            {ROLES.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {err("role")}
        </div>
        <div className="field">
          <label htmlFor="f-episodesPerMonth">
            Episodes per month <span className="req">*</span>
          </label>
          <select className="select" required value={values.episodesPerMonth} onChange={set("episodesPerMonth")} {...a11y("episodesPerMonth")}>
            <option value="" disabled>
              Choose one
            </option>
            {EPISODES.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          {err("episodesPerMonth")}
        </div>
      </div>

      <div className="trap" aria-hidden="true">
        <label htmlFor="f-company">Company</label>
        <input id="f-company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} />
      </div>

      <label className="consent" htmlFor="f-consent">
        <input type="checkbox" checked={values.consent} onChange={set("consent")} {...a11y("consent")} />
        <span>
          I agree to receive founding beta invitations and LoquiHQ updates by email. <span className="req">*</span>
        </span>
      </label>
      {err("consent")}

      <button className="btn" type="submit" disabled={sending}>
        {sending ? "Adding you…" : "Join the founding beta list"}
      </button>
      <p className="privacy">
        No password. No payment card. Your email is used for beta invitations and LoquiHQ updates only. We never sell your data, and every email has an unsubscribe link.{" "}
        <a href={PRIVACY_URL}>Privacy Policy</a>
      </p>
    </form>
  );
}
