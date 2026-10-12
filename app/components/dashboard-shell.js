"use client";

import { useEffect, useMemo, useState } from "react";
import Brand from "./brand";
import Icon from "./dashboard-icon";
import SettingsDialog from "./settings-dialog";
import { navItems, people, projects, teams } from "../data/dashboard-data";
import { Avatar } from "./ui";

export default function DashboardShell({
  children,
  route,
  theme,
  drawerOpen,
  searchOpen,
  settingsOpen,
  toast,
  onDrawerToggle,
  onDrawerClose,
  onThemeToggle,
  onSearchOpen,
  onSearchClose,
  onSettingsOpen,
  onSettingsClose,
  onThemeChange,
  onNavigate,
  onSignOut,
}) {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const activeRoute = route === "profile" ? "engineering" : route;
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const sections = navItems.map((item) => ({ type: "Section", title: item.label, route: item.id, icon: item.icon }));
    const projectResults = projects.map((item) => ({ type: "Project", title: item.name, route: "projects", icon: "repo" }));
    const peopleResults = people.map((item) => ({ type: "Person", title: item.name, route: `profile/${item.id}`, icon: "users" }));
    return [...sections, ...projectResults, ...peopleResults]
      .filter((item) => !query || `${item.title} ${item.type}`.toLowerCase().includes(query))
      .slice(0, 10);
  }, [search]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!searchOpen) setSearch("");
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onSearchClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onSearchClose, searchOpen]);

  const navigateFromSidebar = (target) => {
    onNavigate(target);
    onDrawerClose();
  };

  return (
    <div className={`app-frame${drawerOpen ? " navigation-open" : ""}`}>
      <aside className={`sidebar${drawerOpen ? " sidebar-open" : ""}`} id="navigation-drawer" aria-label="Application navigation" aria-hidden={isMobile && !drawerOpen} inert={isMobile && !drawerOpen ? true : undefined}>
        <div className="sidebar-top">
          <Brand onClick={(event) => { event.preventDefault(); navigateFromSidebar("overview"); }} />
          <div className="workspace-slip"><span className="workspace-mark">A</span><span><strong>Atlas Labs</strong><small>Sample workspace</small></span></div>
          <span className="demo-stamp"><i aria-hidden="true" /> Demo data</span>
        </div>

        <div className="sidebar-scroll">
          <section className="sidebar-section">
            <h2 className="sidebar-caption">Field index</h2>
            <nav className="primary-navigation" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={`nav-link${activeRoute === item.id ? " active" : ""}`} aria-current={activeRoute === item.id ? "page" : undefined} onClick={(event) => { event.preventDefault(); navigateFromSidebar(item.id); }}>
                  <Icon name={item.icon} size={17} />
                  <span>{item.label}</span>
                  {item.count && <small className="nav-count">{item.count}</small>}
                </a>
              ))}
            </nav>
          </section>

          <section className="sidebar-section sidebar-collection">
            <div className="sidebar-section-heading"><h2 className="sidebar-caption">Project tabs</h2><button type="button" className="quiet-icon" aria-label="Browse all projects" onClick={() => navigateFromSidebar("projects")}><Icon name="arrowUpRight" size={14} /></button></div>
            <div className="sidebar-quick-list">
              {projects.slice(0, 5).map((project) => <button key={project.id} type="button" className="quick-link" onClick={() => navigateFromSidebar("projects")}><span className="index-mark" aria-hidden="true" /><span>{project.name}</span></button>)}
            </div>
          </section>

          <section className="sidebar-section sidebar-collection teams-collection">
            <div className="sidebar-section-heading"><h2 className="sidebar-caption">Team references</h2><button type="button" className="quiet-icon" aria-label="Browse teams" onClick={() => navigateFromSidebar("network")}><Icon name="arrowUpRight" size={14} /></button></div>
            <div className="sidebar-quick-list">
              {teams.map((team) => <button key={team.name} type="button" className="team-link" onClick={() => navigateFromSidebar("network")}><span>{team.name}</span><small>{team.count}</small></button>)}
            </div>
          </section>
        </div>

        <div className="sidebar-bottom">
          <button type="button" className="sidebar-action" onClick={() => { onSettingsOpen(); onDrawerClose(); }}><Icon name="settings" size={16} /> Preferences</button>
          <button type="button" className="profile-chip" onClick={() => navigateFromSidebar("profile/maya-chen")}>
            <Avatar initials="MC" name="Maya Chen" color="mint" size="sm" />
            <span><strong>Maya Chen</strong><small>Sample profile</small></span>
            <Icon name="chevronRight" size={16} />
          </button>
          <button type="button" className="sidebar-action signout-action" onClick={onSignOut}><Icon name="arrowUpRight" size={16} /> Sign out</button>
        </div>
      </aside>

      {drawerOpen && <button type="button" className="drawer-backdrop" aria-label="Close navigation menu" onClick={onDrawerClose} />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button type="button" className="menu-button sidebar-menu-toggle" aria-label="Open navigation menu" aria-expanded={drawerOpen} aria-controls="navigation-drawer" onClick={onDrawerToggle}><Icon name="menu" size={19} /></button>
            <span className="current-section">{navItems.find((item) => item.id === activeRoute)?.label || "Profile"}</span>
          </div>
          <div className="topbar-right">
            <button type="button" className="demo-stamp top-demo-stamp" title="All records in this workspace are seeded examples"><i aria-hidden="true" /> Demo workspace</button>
            <button type="button" className="topbar-search-btn" onClick={onSearchOpen} aria-label="Search people, projects, and pages (⌘K)"><Icon name="search" size={17} /><span>Find a person or project</span><kbd>⌘ K</kbd></button>
            <button type="button" className="icon-button notifications-button" aria-label="Open recent activity" title="Recent work" onClick={() => onNavigate("activity")}><Icon name="activity" size={18} /></button>
            <button type="button" className="icon-button theme-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme" onClick={onThemeToggle}><Icon name={theme === "dark" ? "sun" : "moon"} size={18} /></button>
          </div>
        </header>

        <div className={`content-wrap${route === "chat" ? " content-chat" : ""}`}>
          <div className={`page-view page-${route}`}>{children}</div>
          {route !== "chat" && <footer className="app-footer"><span>COVAL <b>Fieldbook</b></span><span>Atlas Labs · Example records</span></footer>}
        </div>
      </main>

      {searchOpen && <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onSearchClose(); }}>
        <section className="search-dialog" role="dialog" aria-modal="true" aria-labelledby="search-title">
          <div className="search-dialog-heading"><h2 id="search-title">Search the fieldbook</h2><button type="button" className="quiet-icon" aria-label="Close search" onClick={onSearchClose}><Icon name="x" size={18} /></button></div>
          <label className="search-dialog-input"><Icon name="search" size={19} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Person, project, or section" /><kbd>ESC</kbd></label>
          <div className="search-results" aria-live="polite">
            {results.map((item) => <button key={`${item.type}-${item.title}`} type="button" className="search-result" onClick={() => { onNavigate(item.route); onSearchClose(); }}><Icon name={item.icon} size={16} /><span>{item.title}</span><small>{item.type}</small><Icon name="arrowUpRight" size={14} /></button>)}
            {results.length === 0 && <p className="search-empty">No matching people or projects. Try a team or repository name.</p>}
          </div>
          <p className="search-hint">Results use the sample Atlas Labs workspace.</p>
        </section>
      </div>}
      {settingsOpen && <SettingsDialog theme={theme} onThemeChange={onThemeChange} onNavigate={onNavigate} onClose={onSettingsClose} />}
      {toast && <div className="toast-message" role="status">{toast}</div>}
    </div>
  );
}
