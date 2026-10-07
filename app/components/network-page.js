"use client";

import { useState } from "react";
import Icon from "./dashboard-icon";
import { people, teams } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

const edges = [[0, 1], [0, 2], [0, 3], [1, 4], [1, 7], [2, 6], [3, 8], [4, 9], [5, 11], [7, 10], [8, 9]];
const points = [[50, 18], [31, 34], [70, 33], [46, 49], [20, 58], [84, 55], [63, 68], [35, 77], [77, 82], [57, 92], [12, 85], [91, 28]];

export default function NetworkPage({ navigate }) {
  const [selectedTeam, setSelectedTeam] = useState("All teams");
  const visiblePeople = selectedTeam === "All teams" ? people : people.filter((person) => person.team === selectedTeam);
  return (
    <>
      <PageHeading eyebrow="TEAM GRAPH / COLLABORATION" title="How the team connects." description="Explore the people and working relationships behind your engineering output." action={<span className="live-count"><i /> 12 PEOPLE</span>} />
      <div className="network-toolbar surface-card"><div><span className="eyebrow">VIEWING</span><strong>{selectedTeam}</strong></div><div className="filter-pills">{["All teams", ...teams.map((team) => team.name)].map((name) => <button key={name} type="button" className={`filter-pill${selectedTeam === name ? " selected" : ""}`} onClick={() => setSelectedTeam(name)}>{name}</button>)}</div></div>
      <section className="network-canvas surface-card" aria-label="Team collaboration network">
        <div className="network-canvas-header"><div><span className="eyebrow">COLLABORATION MAP</span><h2>People, projects, and shared work</h2></div><span className="network-legend"><i /> Active collaborator</span></div>
        <svg className="network-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {edges.map(([a, b]) => <line key={`${a}-${b}`} x1={points[a][0]} y1={points[a][1]} x2={points[b][0]} y2={points[b][1]} />)}
        </svg>
        <div className="network-nodes">
          {visiblePeople.map((person) => {
            const point = points[people.findIndex((item) => item.id === person.id)];
            return <button key={person.id} type="button" className="network-node" style={{ left: `${point[0]}%`, top: `${point[1]}%` }} onClick={() => navigate("engineering")} title={`${person.name} · ${person.team}`}><Avatar initials={person.initials} name={person.name} color={person.color} size="md" online={person.status === "Online"} /><span>{person.name.split(" ")[0]}</span></button>;
          })}
        </div>
      </section>
      <section className="org-section"><div className="section-title-row"><div><span className="eyebrow">TEAMS & GUILDS</span><h2>Connected squads</h2></div><button type="button" className="text-button" onClick={() => navigate("engineering")}>Explore people <Icon name="arrowRight" size={14} /></button></div><div className="team-grid">
        {teams.map((team) => {
          const teamMembers = people.filter((person) => person.team === team.name);
          return <article key={team.name} className="team-card surface-card"><div className="team-card-top"><span className={`team-icon team-${team.color}`}><Icon name="users" size={18} /></span><span className="team-count">{teamMembers.length} members</span></div><h3>{team.name}</h3><p>{team.name === "Applied AI" ? "Search relevance, model quality, and intelligent retrieval." : team.name === "Platform" ? "Reliable foundations, observability, and service health." : team.name === "Dev Experience" ? "Interfaces and workflows that help teams move faster." : "Security posture, identity, and trustworthy infrastructure."}</p><div className="team-members">{teamMembers.slice(0, 4).map((person) => <button type="button" key={person.id} title={person.name} onClick={() => navigate("engineering")}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /></button>)}</div></article>;
        })}
      </div></section>
    </>
  );
}
