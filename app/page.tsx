export default function Home() {
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 20px", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, marginBottom: 12 }}>LoquiHQ</h1>
      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 24 }}>
        Tools for podcasters who want to grow with clarity, consistency, and confidence.
      </p>

      <div style={{ padding: 18, border: "1px solid #e5e7eb", borderRadius: 12, marginBottom: 24 }}>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
          We’re building LoquiHQ to help podcasters streamline workflows, improve content decisions, and stay consistent without burning out.
        </p>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.6 }}>
        Contact: <a href="mailto:ganell@useloquihq.com">ganell@useloquihq.com</a>
      </p>

      <footer style={{ marginTop: 40, fontSize: 14 }}>
        <a href="/privacy">Privacy</a>{" · "}
        <a href="/terms">Terms</a>
      </footer>
    </main>
  );
}
