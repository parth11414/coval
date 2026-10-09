"use client";

import { useEffect, useRef } from "react";
import Icon from "./dashboard-icon";

export default function SettingsDialog({ theme, onThemeChange, onNavigate, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus({ preventScroll: true });
    dialogRef.current?.scrollTo({ top: 0 });
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const focusable = [...(dialogRef.current?.querySelectorAll('button:not(:disabled), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || [])];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialogRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", trapFocus);
    return () => {
      window.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className="settings-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="settings-dialog" role="dialog" aria-modal="true" aria-labelledby="settings-title" tabIndex="-1">
        <header className="settings-dialog-header">
          <div><span className="eyebrow">WORKSPACE PREFERENCES</span><h2 id="settings-title">Settings &amp; Configuration</h2></div>
          <button type="button" className="icon-button" aria-label="Close settings" onClick={onClose}><Icon name="x" size={18} /></button>
        </header>

        <section className="settings-group" aria-labelledby="settings-theme">
          <h3 id="settings-theme">DISPLAY THEME</h3>
          <div className="settings-option settings-theme-option">
            <div><strong>Appearance mode</strong><p>Choose the canvas that feels right for your workspace.</p></div>
            <div className="settings-theme-actions">
              <button type="button" className={`button${theme === "light" ? " selected" : ""}`} aria-pressed={theme === "light"} onClick={() => onThemeChange("light")}><Icon name="sun" size={17} /> Light</button>
              <button type="button" className={`button${theme === "dark" ? " selected" : ""}`} aria-pressed={theme === "dark"} onClick={() => onThemeChange("dark")}><Icon name="moon" size={17} /> Dark</button>
            </div>
          </div>
        </section>

        <section className="settings-group" aria-labelledby="settings-workspace">
          <h3 id="settings-workspace">ACTIVE WORKSPACE</h3>
          <div className="settings-option">
            <div><strong>Organization</strong><p>Atlas Labs · Engineering Intelligence Platform</p></div>
            <span className="settings-tag">PRODUCTION</span>
          </div>
          <div className="settings-option">
            <div><strong>Practitioner profile</strong><p>Maya Chen · Staff Engineer (@mayacodes)</p></div>
            <button type="button" className="button" onClick={() => { onNavigate("profile/maya-chen"); onClose(); }}>View profile <Icon name="arrowUpRight" size={15} /></button>
          </div>
        </section>

        <section className="settings-group" aria-labelledby="settings-shortcuts">
          <h3 id="settings-shortcuts">KEYBOARD SHORTCUTS</h3>
          <div className="settings-shortcut"><span>Global search</span><kbd>⌘ K</kbd></div>
          <div className="settings-shortcut"><span>Overview</span><kbd>⌘ 1</kbd></div>
          <div className="settings-shortcut"><span>Dismiss dialog / drawer</span><kbd>Esc</kbd></div>
          <div className="settings-shortcut"><span>Send message</span><kbd>Enter</kbd></div>
        </section>
      </section>
    </div>
  );
}
