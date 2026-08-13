export function PlatformStatus() {
  return (
    <section className="shell platform-status">
      <h2>Platform status</h2>
      <div className="platform-status-grid">
        <div className="panel platform-card">
          <p className="eyebrow">Android</p>
          <p className="status-badge">Android launch in progress</p>
          <p>
            Production release work is underway. This page will link to the verified Google Play
            listing once it is public.
          </p>
        </div>
        <div className="panel platform-card">
          <p className="eyebrow">Windows desktop</p>
          <p className="status-badge">Desktop version in development</p>
          <p>A Windows desktop edition is in development, with no release date announced yet.</p>
        </div>
      </div>
    </section>
  );
}
