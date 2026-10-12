"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { people, projects, teams } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

export default function PeoplePage({ navigate }) {
  const [query, setQuery] = useState("");
  const [team, setTeam] = useState("All people");
  const filtered = useMemo(() => people.filter((person) => {
    const text = `${person.name} ${person.role} ${person.team} ${person.location}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (team === "All people" || person.team === team);
  }), [query, team]);

  return <>
    <PageHeading title="People you can build with." description="Browse the sample team by name or discipline, then follow a person into their projects and recent work." action={<span className="record-count">{filtered.length} of {people.length} profiles</span>} />
    <div className="directory-tools">
      <label className="search-field"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a person, role, or city" aria-label="Search sample people" />{query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery("")}><Icon name="x" size={15} /></button>}</label>
      <div className="filter-pills" aria-label="Filter sample people by team">
        {["All people", ...teams.map((item) => item.name)].map((name) => <button key={name} type="button" className={`filter-pill${team === name ? " selected" : ""}`} aria-pressed={team === name} onClick={() => setTeam(name)}>{name}</button>)}
      </div>
    </div>
    {filtered.length ? <section className="people-index" aria-label="People directory">
      <div className="index-column-head"><span>Person</span><span>Discipline</span><span>Sample project references</span><span>Contributions</span></div>
      {filtered.map((person, index) => {
        const memberProjects = projects.filter((project) => project.team.includes(person.initials));
        return <article className="people-index-row" key={person.id}>
          <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
          <button type="button" className="people-index-person" onClick={() => navigate(`profile/${person.id}`)}>
            <Avatar initials={person.initials} name={person.name} color={person.color} size="md" />
            <span><strong>{person.name}</strong><small>{person.role}</small></span>
            <Icon name="arrowUpRight" size={14} />
          </button>
          <span className="person-team-reference">{person.team}<small>{person.location}</small></span>
          <div className="project-reference-group">
            {memberProjects.slice(0, 2).map((project) => <button type="button" key={project.id} className="cross-reference" onClick={() => navigate("projects")}><Icon name="repo" size={13} /> {project.name}</button>)}
            {memberProjects.length > 2 && <span className="margin-note">+{memberProjects.length - 2} more</span>}
            {!memberProjects.length && <span className="margin-note">No project references</span>}
          </div>
          <span className="sample-count"><strong>{person.commits.toLocaleString("en-US")}</strong><small>sample commits</small></span>
        </article>;
      })}
    </section> : <div className="empty-state"><Icon name="users" size={21} /><strong>No people match that entry.</strong><p>Try a different name, role, location, or team.</p><button type="button" className="button button-secondary" onClick={() => { setQuery(""); setTeam("All people"); }}>Clear filters</button></div>}
    <p className="page-footnote">Profiles and contribution counts are illustrative demo data.</p>
  </>;
}
