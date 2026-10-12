"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { people, projects, teams } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

export default function NetworkPage({ navigate }) {
  const [selectedTeam, setSelectedTeam] = useState("All teams");
  const visiblePeople = useMemo(() => selectedTeam === "All teams" ? people : people.filter((person) => person.team === selectedTeam), [selectedTeam]);
  const visibleInitials = useMemo(() => new Set(visiblePeople.map((person) => person.initials)), [visiblePeople]);
  const sharedEntries = useMemo(() => projects.map((project) => ({
    project,
    members: people.filter((person) => project.team.includes(person.initials) && visibleInitials.has(person.initials)),
  })).filter(({ members }) => members.length > 0), [visibleInitials]);

  return <>
    <PageHeading title="People, connected by shared work." description="Each link below comes from the sample project records. Use a project or profile reference to continue exploring." action={<span className="record-count">Illustrative relationships</span>} />
    <div className="directory-tools network-tools">
      <span className="tool-label">Show contributors in</span>
      <div className="filter-pills" aria-label="Filter shared work by team">
        {["All teams", ...teams.map((team) => team.name)].map((name) => <button key={name} type="button" className={`filter-pill${selectedTeam === name ? " selected" : ""}`} aria-pressed={selectedTeam === name} onClick={() => setSelectedTeam(name)}>{name}</button>)}
      </div>
    </div>

    <section className="network-index" aria-label="Projects and their sample contributors">
      <div className="section-heading"><div><h2>Shared project references</h2><span>Project records connect contributors</span></div><button type="button" className="text-link" onClick={() => navigate("projects")}>Project index <Icon name="arrowUpRight" size={14} /></button></div>
      {sharedEntries.map(({ project, members }, index) => <article className="network-entry" key={project.id}>
        <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
        <div className="network-project-ref"><button type="button" className="entry-title" onClick={() => navigate("projects")}>{project.name}<Icon name="arrowUpRight" size={14} /></button><span className="entry-repo">{project.repo}</span><small>{members.length} sample contributor{members.length === 1 ? "" : "s"}</small></div>
        <span className="reference-rule" aria-hidden="true" />
        <div className="network-person-refs">{members.map((person) => <button type="button" className="network-person-ref" key={person.id} onClick={() => navigate(`profile/${person.id}`)}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /><span><strong>{person.name}</strong><small>{person.team}</small></span><Icon name="arrowUpRight" size={13} /></button>)}</div>
      </article>)}
      {!sharedEntries.length && <div className="empty-state"><strong>No shared project entries for that team.</strong><p>Choose another team to see its sample connections.</p></div>}
    </section>

    <section className="team-reference-section" aria-labelledby="teams-heading">
      <div className="section-heading"><div><h2 id="teams-heading">Team index</h2><span>Sample disciplines and member references</span></div><button type="button" className="text-link" onClick={() => navigate("engineering")}>All people <Icon name="arrowUpRight" size={14} /></button></div>
      <div className="team-reference-list">{teams.map((team, index) => {
        const members = people.filter((person) => person.team === team.name);
        const teamProjects = projects.filter((project) => project.team.some((initials) => members.some((person) => person.initials === initials)));
        return <article className="team-reference-entry" key={team.name}><span className="entry-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{team.name}</h3><p>{members.length} sample profiles · {teamProjects.length} related project entries</p></div><div className="team-entry-people">{members.slice(0, 4).map((person) => <button type="button" key={person.id} title={person.name} aria-label={`Open ${person.name}'s sample profile`} onClick={() => navigate(`profile/${person.id}`)}><Avatar initials={person.initials} name={person.name} color={person.color} size="xs" /></button>)}</div></article>;
      })}</div>
    </section>
    <p className="page-footnote">This index reflects seeded project memberships; it does not measure live collaboration.</p>
  </>;
}
