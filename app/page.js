"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import DashboardShell from "./components/dashboard-shell";
import OverviewPage from "./components/overview-page";
import PeoplePage from "./components/people-page";
import ProjectsPage from "./components/projects-page";
import NetworkPage from "./components/network-page";
import ActivityPage from "./components/activity-page";
import MessagesPage from "./components/messages-page";
import ProfilePage from "./components/profile-page";

const routes = ["overview", "engineering", "projects", "network", "activity", "chat", "profile"];

function getRouteFromHash() {
  const route = window.location.hash.replace(/^#/, "").split("/")[0];
  return routes.includes(route) ? route : "overview";
}

function subscribeToHashChange(callback) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getServerRoute() {
  return "overview";
}

function getProfileIdFromHash() {
  return window.location.hash.replace(/^#/, "").split("/")[1] || "";
}

function getServerProfileId() {
  return "";
}

function subscribeToThemeChange(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener("coval-theme-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("coval-theme-change", callback);
  };
}

function getStoredTheme() {
  return window.localStorage.getItem("coval-theme") === "dark" ? "dark" : "light";
}

function getServerTheme() {
  return "light";
}

export default function Home() {
  const route = useSyncExternalStore(subscribeToHashChange, getRouteFromHash, getServerRoute);
  const profileId = useSyncExternalStore(subscribeToHashChange, getProfileIdFromHash, getServerProfileId);
  const theme = useSyncExternalStore(subscribeToThemeChange, getStoredTheme, getServerTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onKeyDown = (event) => {
      const target = event.target;
      const isEditing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setDrawerOpen(false);
        setSettingsOpen(false);
      }
      if (!isEditing && (event.metaKey || event.ctrlKey) && event.key === "1") {
        event.preventDefault();
        window.location.hash = "overview";
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const navigate = useCallback((nextRoute) => {
    window.location.hash = nextRoute;
    setDrawerOpen(false);
    setSearchOpen(false);
    setSettingsOpen(false);
  }, []);

  const page = useMemo(() => {
    const notify = (message) => setToast(message);
    switch (route) {
      case "engineering":
        return <PeoplePage navigate={navigate} notify={notify} />;
      case "projects":
        return <ProjectsPage navigate={navigate} />;
      case "network":
        return <NetworkPage navigate={navigate} />;
      case "activity":
        return <ActivityPage navigate={navigate} />;
      case "chat":
        return <MessagesPage notify={notify} />;
      case "profile":
        return <ProfilePage personId={profileId} navigate={navigate} notify={notify} />;
      default:
        return <OverviewPage navigate={navigate} notify={notify} />;
    }
  }, [navigate, profileId, route]);

  return (
    <DashboardShell
      route={route}
      theme={theme}
      drawerOpen={drawerOpen}
      searchOpen={searchOpen}
      settingsOpen={settingsOpen}
      toast={toast}
      onDrawerToggle={() => setDrawerOpen((open) => !open)}
      onDrawerClose={() => setDrawerOpen(false)}
      onThemeToggle={() => {
        window.localStorage.setItem("coval-theme", theme === "light" ? "dark" : "light");
        window.dispatchEvent(new Event("coval-theme-change"));
      }}
      onSearchOpen={() => setSearchOpen(true)}
      onSearchClose={() => setSearchOpen(false)}
      onSettingsOpen={() => setSettingsOpen(true)}
      onSettingsClose={() => setSettingsOpen(false)}
      onNavigate={navigate}
      onThemeChange={(nextTheme) => {
        if (nextTheme !== theme) {
          window.localStorage.setItem("coval-theme", nextTheme);
          window.dispatchEvent(new Event("coval-theme-change"));
        }
      }}
    >
      {page}
    </DashboardShell>
  );
}
