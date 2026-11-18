export default function PreviewBanner() {
  return (
    <div
      role="status"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "#1a1a2e",
        color: "#fff",
        textAlign: "center",
        padding: "8px 16px",
        fontSize: 14,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      Previewing unpublished changes ·{" "}
      {/* Plain anchor on purpose: full navigation to the disable endpoint, no client prefetch */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/draft-mode/disable" style={{ color: "#9ec1ff" }}>
        Exit preview
      </a>
    </div>
  );
}
