"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { people, teams, fmt } from "../data/dashboard-data";
import { Avatar, MetricCard, PageHeading } from "./ui";

export default function PeoplePage({ navigate }) {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All people");
  const filtered = useMemo(() => people.filter((person) => {
    const matchesQuery = `${person.name} ${person.role} ${person.team}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (team === "All people" || person.team === team);
  }), [query, team]);

  return (
    <>
      <PageHeading eyebrow="PEOPLE / ENGINEERING" title="Engineering, connected." description="12 practitioners. 4 disciplines. One shared delivery graph." action={<button type="button" className="button button-quiet" onClick={() => navigate("network")}><Icon name="network" size={17} /> Explore network</button>} />
      <section className="summary-grid" aria-label="Engineering team summary">
        <MetricCard label="PEOPLE" value="12" detail="across 4 teams" />
        <MetricCard label="COMBINED COMMITS" value={fmt(14128)} detail="+12% this quarter" trend="+12%" />
        <MetricCard label="SHIPPED PRS" value="638" detail="86 merged this month" />
        <MetricCard label="ACTIVE SQUADS" value="4" detail="across 3 disciplines" />
      </section>
      <div className="directory-toolbar">
        <label className="search-field"><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people…" aria-label="Search people" /></label>
        <div className="filter-pills" aria-label="Filter people by team">
          {["All people", ...teams.map((item) => item.name)].map((name) => <button key={name} type="button" className={`filter-pill${team === name ? " selected" : ""}`} onClick={() => setTeam(name)}>{name}</button>)}
        </div>
      </div>
      {filtered.length ? <div className="people-grid">
        {filtered.map((person) => <article className="person-card" key={person.id}>
          <div className="person-card-head"><button type="button" className="person-card-avatar-button" aria-label={`View ${person.name} profile`} onClick={() => navigate(`profile/${person.id}`)}><Avatar initials={person.initials} name={person.name} color={person.color} size="lg" online={person.status === "Online"} /></button><span className="person-status"><i className={person.status === "Online" ? "dot-online" : "dot-away"} />{person.status}</span></div>
          <div className="person-card-identity"><h2>{person.name}</h2><p className="person-role">{person.role}</p><span className="team-tag">{person.team}</span></div>
          <div className="person-card-stats"><span><b>{fmt(person.commits)}</b><small>commits</small></span><span><b>{person.prs}</b><small>merged PRs</small></span><span><b>{person.score}</b><small>signal</small></span></div>
          <div className="person-card-footer"><span><Icon name="activity" size={14} /> {person.location}</span><button type="button" className="quiet-icon" aria-label={`View ${person.name} profile`} onClick={() => navigate(`profile/${person.id}`)}><Icon name="arrowUpRight" size={16} /></button></div>
        </article>)}
      </div> : <div className="empty-state"><Icon name="users" size={22} /><strong>No teammates match</strong><p>Try another name or team.</p></div>}
    </>
  );
}
