"use client";

import { useEffect, useState } from "react";

const SUPABASE_URL = "https://zriirrxmkfggyhoagtov.supabase.co";
const SUPABASE_KEY = "sb_publishable_-LR8TY6q0UfmOevgRmDzWA_VJqck38C";

export default function AuthGate({ children }) {
  const [status, setStatus] = useState("checking");
  const [client, setClient] = useState(null);

  useEffect(() => {
    let active = true;
    const start = async () => {
      if (!window.supabase) {
        await new Promise((resolve, reject) => {
          const existing = document.querySelector('script[data-supabase-sdk="true"]');
          if (existing) {
            existing.addEventListener("load", resolve, { once: true });
            existing.addEventListener("error", reject, { once: true });
            return;
          }
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
          script.dataset.supabaseSdk = "true";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }
      const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      if (!active) return;
      setClient(supabase);
      const { data, error } = await supabase.auth.getSession();
      if (!active) return;
      if (error || !data.session) {
        window.location.replace("/");
        return;
      }
      setStatus("ready");
      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) window.location.replace("/");
      });
    };
    start().catch(() => {
      if (active) setStatus("error");
    });
    return () => { active = false; };
  }, []);

  const logout = async () => {
    if (client) await client.auth.signOut();
    window.location.replace("/");
  };

  if (status !== "ready") {
    return <main className="auth-state" role="status"><span className="auth-state-mark">C</span><p>{status === "error" ? "We couldn’t verify your session." : "Opening your workspace…"}</p>{status === "error" && <button type="button" onClick={() => window.location.reload()}>Refresh and try again</button>}</main>;
  }

  return typeof children === "function" ? children(logout) : children;
}
