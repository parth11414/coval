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
}) {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(false);
  const [desktopOverlayOpen, setDesktopOverlayOpen] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (!desktopOverlayOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setDesktopSidebarOpen(false);
        setDesktopOverlayOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [desktopOverlayOpen]);
  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const routeResults = navItems.map((item) => ({ type: "Section", title: item.label, route: item.id, icon: item.icon }));
    const projectResults = projects.slice(0, 6).map((item) => ({ type: "Repository", title: item.name, route: "projects", icon: "repo" }));
    const personResults = people.slice(0, 6).map((item) => ({ type: "Person", title: item.name, route: `profile/${item.id}`, icon: "users" }));
    return [...routeResults, ...projectResults, ...personResults]
      .filter((item) => !query || `${item.title} ${item.type}`.toLowerCase().includes(query))
      .slice(0, 9);
  }, [search]);

  const go = (target) => onNavigate(target);
  const activeRoute = route === "profile" ? "engineering" : route;
  const sidebarOpen = isMobile ? drawerOpen : desktopSidebarOpen;
  const overlayOpen = isMobile ? drawerOpen : desktopOverlayOpen;
  const toggleSidebar = () => {
    if (isMobile) {
      onDrawerToggle();
    } else {
      if (desktopSidebarOpen) {
        setDesktopSidebarOpen(false);
        setDesktopOverlayOpen(false);
      } else {
        setDesktopSidebarOpen(true);
        setDesktopOverlayOpen(true);
      }
    }
  };
  const navigateFromSidebar = (target) => {
    onNavigate(target);
    onDrawerClose();
    setDesktopSidebarOpen(false);
    setDesktopOverlayOpen(false);
  };

  return (
    <div className={`app-frame${overlayOpen ? " navigation-open" : ""}${!sidebarOpen ? " sidebar-collapsed" : ""}${!isMobile && desktopOverlayOpen ? " sidebar-overlay-open" : ""}`}>
      <aside className={`sidebar${isMobile && drawerOpen ? " sidebar-open" : ""}`} id="navigation-drawer" aria-label="Application navigation" aria-hidden={!sidebarOpen} inert={!sidebarOpen}>
        <div className="sidebar-top">
          <Brand onClick={(event) => { event.preventDefault(); navigateFromSidebar("overview"); }} />
          <button type="button" className="icon-button sidebar-close" aria-label="Close navigation menu" onClick={onDrawerClose}><Icon name="x" /></button>
          <div className="workspace-chip">
            <span className="workspace-avatar">A</span>
            <span className="workspace-meta"><strong>Atlas Labs</strong><small>WORKSPACE / PROD</small></span>
            <span className="workspace-status" title="Connected to production" />
          </div>
        </div>
        <div className="sidebar-scroll">
          <div className="sidebar-section">
            <span className="sidebar-caption">NAVIGATION</span>
            <nav className="primary-navigation" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-link${activeRoute === item.id ? " active" : ""}`}
                  aria-current={activeRoute === item.id ? "page" : undefined}
                  onClick={(event) => { event.preventDefault(); navigateFromSidebar(item.id); }}
                >
                  <Icon name={item.icon} size={19} />
                  <span>{item.label}</span>
                  {item.shortcut && <kbd>{item.shortcut}</kbd>}
                  {item.count && <small className="nav-count">{item.count}</small>}
                  {item.id === "chat" && <i className="nav-live-dot" />}
                </a>
              ))}
            </nav>
          </div>
          <div className="sidebar-section sidebar-collection">
            <div className="sidebar-section-heading"><span className="sidebar-caption">PINNED PROJECTS</span><button type="button" className="quiet-icon" aria-label="Explore projects" onClick={() => navigateFromSidebar("projects")}><Icon name="plus" size={16} /></button></div>
            <div className="sidebar-quick-list">
              {projects.slice(0, 6).map((project) => <button key={project.id} type="button" className="quick-link" onClick={() => navigateFromSidebar("projects")}><i className={`project-dot status-${project.status.toLowerCase()}`} /><span>{project.name}</span><small><Icon name="star" size={12} />{project.stars}</small></button>)}
            </div>
          </div>
          <div className="sidebar-section sidebar-collection teams-collection">
            <div className="sidebar-section-heading"><span className="sidebar-caption">TEAMS & GUILDS</span><button type="button" className="quiet-icon" aria-label="Explore network" onClick={() => navigateFromSidebar("network")}><Icon name="plus" size={16} /></button></div>
            <div className="sidebar-quick-list">
              {teams.map((team) => <button key={team.name} type="button" className="team-link" onClick={() => navigateFromSidebar("network")}><span className={`team-dot team-${team.color}`} /><span>{team.name}</span><small>{team.count}</small></button>)}
            </div>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-actions">
            <button type="button" className="sidebar-action" onClick={() => { onSettingsOpen(); onDrawerClose(); setDesktopSidebarOpen(false); setDesktopOverlayOpen(false); }}><Icon name="settings" size={17} /> Settings</button>
          </div>
          <button type="button" className="profile-chip" onClick={() => navigateFromSidebar("profile/maya-chen")}>
            <Avatar initials="MC" name="Maya Chen" color="mint" size="sm" />
            <span><strong>Maya Chen</strong><small>Staff Engineer</small></span>
            <Icon name="chevronRight" size={17} />
          </button>
        </div>
      </aside>

      <button type="button" className={`drawer-backdrop${overlayOpen ? " visible" : ""}`} aria-label="Close navigation menu" tabIndex={overlayOpen ? 0 : -1} onClick={toggleSidebar} />

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button type="button" className="menu-button sidebar-menu-toggle" id="navigationMenu" aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={sidebarOpen} aria-controls="navigation-drawer" onClick={toggleSidebar}><Icon name={sidebarOpen ? "x" : "menu"} size={19} /></button>
            <Brand />
          </div>
          <div className="topbar-center">
            <button type="button" className="topbar-search-btn" onClick={onSearchOpen} aria-label="Search directory (Press ⌘K)">
              <span className="search-btn-icon"><Icon name="search" size={17} /></span>
              <span className="search-btn-text">Search directory, projects, teams…</span>
              <span className="search-btn-kbd"><kbd>⌘</kbd><kbd>K</kbd></span>
            </button>
          </div>
          <div className="topbar-right">
            <span className="system-status"><i /> NOMINAL</span>
            <button type="button" className="icon-button notifications-button" aria-label="Notifications, 3 unread" title="Recent activity notifications (3 unread)" onClick={() => onNavigate("activity")}><Icon name="bell" size={19} /><i className="notification-indicator" /></button>
            <button type="button" className="icon-button theme-button" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} title="Toggle theme" onClick={onThemeToggle}><Icon name={theme === "dark" ? "sun" : "moon"} size={19} /></button>
            <span className="top-divider" aria-hidden="true" />
            <span className="topbar-date" aria-label="Current date">THU, OCT 08</span>
            <button type="button" className="topbar-avatar" aria-label="Maya Chen profile" onClick={() => onNavigate("profile/maya-chen")}><Avatar initials="MC" name="Maya Chen" color="mint" size="xs" /></button>
          </div>
        </header>

        <div className={`content-wrap${route === "chat" ? " content-chat" : ""}`}>
          <div className="workspace-context" aria-label="Current workspace">
            <span className="workspace-context-mark" aria-hidden="true">A</span>
            <strong>Atlas Labs</strong>
            <small>WORKSPACE / PROD</small>
          </div>
          <div className={`page-view page-${route}`}>{children}</div>
          {route !== "chat" && <footer className="app-footer"><span>COVAL <b>V1.0</b></span><span>ENGINEERING INTELLIGENCE <i>•</i> ATLAS LABS</span></footer>}
        </div>
      </main>

      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onSearchClose(); }}>
          <section className="search-dialog" role="dialog" aria-modal="true" aria-label="Search directory">
            <label className="search-dialog-input"><Icon name="search" size={20} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search people, projects, sections…" /><kbd>ESC</kbd></label>
            <div className="search-results">
              <span className="sidebar-caption">{search ? "RESULTS" : "QUICK JUMP"}</span>
              {results.map((item) => <button key={`${item.type}-${item.title}`} type="button" className="search-result" onClick={() => go(item.route)}><Icon name={item.icon} size={17} /><span>{item.title}</span><small>{item.type}</small><Icon name="arrowUpRight" size={14} /></button>)}
              {results.length === 0 && <p className="search-empty">No matching people or projects found.</p>}
            </div>
            <div className="search-hint"><span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span><span><kbd>↵</kbd> Open</span><span><kbd>ESC</kbd> Close</span></div>
          </section>
        </div>
      )}
      {settingsOpen && <SettingsDialog theme={theme} onThemeChange={onThemeChange} onNavigate={onNavigate} onClose={onSettingsClose} />}
      {toast && <div className="toast-message" role="status">{toast}</div>}
    </div>
  );
}
