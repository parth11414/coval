
export default function LoginHome() {
  if (typeof window !== "undefined") {
    window.location.replace("/coval-login.html");
  }

  return null;
}
