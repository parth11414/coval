export default function LoginHome() {
  return (
    <main style={{ position: "fixed", inset: 0, width: "100vw", height: "100dvh", overflow: "hidden", background: "#080b10" }}>
      <iframe title="COVAL sign in" src="/coval-login.html" style={{ border: 0, width: "100%", height: "100%" }} />
    </main>
  );
}
