import WaitlistForm from "./WaitlistForm";

const LISTEN = [
  { label: "Spotify", href: "https://open.spotify.com/show/2SJnBocIn97u7jU0xyoJz0" },
  { label: "YouTube", href: "https://www.youtube.com/@RebuildinginPublic" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "LoquiHQ",
  url: "https://www.useloquihq.com",
  logo: "https://www.useloquihq.com/apple-touch-icon.png",
  founder: { "@type": "Person", name: "Ganell Tubbs" },
  sameAs: ["https://www.loquihq.com"],
};

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="wrap">
          <a className="logo" href="/" aria-label="LoquiHQ home">
            Loqui<span>HQ</span>
          </a>
          <span className="dymo dymo--pink">Founding beta</span>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap">
            <span className="dymo">20 to 30 shows per cohort</span>
            <p className="hero-tag" aria-hidden="true">
              make noise
            </p>
            <h1 id="hero-title">
              AI for podcasters. <span className="hl">Pasted up since day one.</span>
            </h1>
            <p className="subhead">
              LoquiHQ is an AI platform for podcasters that transcribes each episode, finds and cuts the moments worth clipping, writes the social posts, and sends the finished audio to your host.
            </p>
            <p className="tagline">Make noise. Keep your voice.</p>
            <a className="btn" href="#join">
              Join the founding beta list
            </a>
            <p className="hero-note">Free to join. No password, no card.</p>
          </div>
        </section>

        <section className="proof" aria-labelledby="proof-title">
          <div className="wrap proof-grid">
            <div>
              <p className="kicker">Proof, not promises</p>
              <h2 className="h2" id="proof-title">
                One episode. <span className="hl">Fourteen pieces.</span>
              </h2>
              <p>
                One 37-minute episode of <strong>Rebuilding in Public</strong> produced 14 pieces of content in LoquiHQ.
              </p>
              <div className="stats">
                <div className="stat">
                  <span className="stat-num">14</span>
                  <span className="stat-label">pieces of content from one 37-minute episode</span>
                </div>
                <div className="stat">
                  <span className="stat-num">3.5 hrs</span>
                  <span className="stat-label">saved per episode</span>
                </div>
              </div>
            </div>
            <figure style={{ margin: 0 }}>
              <div className="shot">
                <img
                  src="/showcase/workspace.jpg"
                  width={788}
                  height={486}
                  alt="A Rebuilding in Public episode open in LoquiHQ, with the transcript, clips, audio editor and documents tabs, and a LinkedIn post generated from the episode"
                />
              </div>
              <figcaption className="caption">A Rebuilding in Public episode in LoquiHQ: one recording, with its transcript, clips, audio editor and drafts in one place.</figcaption>
            </figure>
          </div>
        </section>

        <section className="join" id="join" aria-labelledby="join-title" style={{ scrollMarginTop: 8 }}>
          <div className="wrap join-grid">
            <div>
              <p className="kicker" style={{ color: "var(--pink)" }}>
                Founding beta list
              </p>
              <h2 className="h2" id="join-title">
                Get your show <span className="hl">on the wall.</span>
              </h2>
              <p className="join-intro">
                We’re opening LoquiHQ to founding shows in small cohorts of 20 to 30, reviewed in the order people join. Tell us about your podcast and we’ll email you when it’s your turn.
              </p>
            </div>
            <WaitlistForm />
          </div>
        </section>

        <section className="section" aria-labelledby="how-title">
          <div className="wrap">
            <p className="kicker">How the founding beta works</p>
            <h2 className="h2" id="how-title">
              No dates. <span className="hl">No hype. In order.</span>
            </h2>
            <ol className="steps">
              <li>
                <strong>Join the list</strong>
                Tell us about your show. It takes a minute, with no password or card.
              </li>
              <li>
                <strong>We review in order</strong>
                Founding shows come in cohorts of 20 to 30, in the order people joined.
              </li>
              <li>
                <strong>Watch your email</strong>
                Your invitation comes by email when your cohort opens. We won’t promise a date until it’s real.
              </li>
            </ol>
          </div>
        </section>

        <section className="section founder" aria-labelledby="founder-title">
          <div className="wrap founder-grid">
            <div className="panel">
              <p className="kicker">Who’s behind the desk</p>
              <h2 className="h2" id="founder-title">
                Built by a podcaster, <span className="hl">for podcasters</span>
              </h2>
              <p>
                LoquiHQ is built by <strong>Ganell Tubbs</strong>, host of <strong>Rebuilding in Public</strong>, a show about starting over, changing direction and growing through difficult seasons.
              </p>
              <p>
                Rebuilding in Public is produced with LoquiHQ, so every feature gets used on a real show. Listen on{" "}
                {LISTEN.map((l, i) => (
                  <span key={l.href}>
                    {i > 0 && " or "}
                    <a href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                    </a>
                  </span>
                ))}
                .
              </p>
            </div>
            <img className="reel" src="/studio/reel-to-reel.webp" alt="" width={520} height={390} />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <nav aria-label="Footer">
            <a href="https://www.loquihq.com/privacy">Privacy Policy</a>
            <a href="https://www.loquihq.com/terms">Terms</a>
            <a href="https://www.loquihq.com">loquihq.com</a>
            <a href="https://app.loquihq.com/login">Already in the beta? Sign in</a>
          </nav>
          <p style={{ margin: 0 }}>
            Questions? <a href="mailto:ganell@loquihq.com">ganell@loquihq.com</a>
          </p>
          <p style={{ margin: 0 }}>© 2026 LoquiHQ</p>
        </div>
      </footer>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
