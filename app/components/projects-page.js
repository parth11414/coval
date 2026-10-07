"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { people, projects } from "../data/dashboard-data";
import { Avatar, AvatarStack, PageHeading } from "./ui";

const allStacks = [...new Set(projects.flatMap((project) => project.stack))];

export default function ProjectsPage({ navigate }) {
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filters = ["All", ...allStacks];
  const visibleFilters = showAllFilters ? filters : filters.slice(0, 13);
  const filtered = useMemo(() => projects.filter((project) => {
    const matchesQuery = `${project.name} ${project.repo} ${project.description} ${project.stack.join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (stack === "All" || project.stack.includes(stack));
  }), [query, stack]);

  return (
    <>
      <PageHeading eyebrow="REPOSITORY INTELLIGENCE / 12 REPOS" title="Projects with people attached." description="Every repository is a collaboration graph. Hover for the signal; follow a contributor to their profile." action={<span className="live-count"><i /> 7 SHIPPING</span>} />
      <div className="project-toolbar">
        <label className="search-field project-search"><Icon name="search" size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search repositories…" aria-label="Search projects" /></label>
        <div className="filter-pills project-filters" aria-label="Filter repositories by technology">
          {visibleFilters.map((filter) => <button key={filter} type="button" className={`filter-pill${stack === filter ? " selected" : ""}`} aria-pressed={stack === filter} onClick={() => setStack(filter)}>{filter}</button>)}
          {filters.length > visibleFilters.length && <button type="button" className="filter-pill" onClick={() => setShowAllFilters(true)}>+{filters.length - visibleFilters.length} more</button>}
        </div>
      </div>
      {filtered.length ? <div className="projects-grid">
        {filtered.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-top"><span className="repo-icon"><Icon name="repo" size={18} /></span><span className={`project-status status-${project.status.toLowerCase()}`}><i />{project.status.toUpperCase()}</span></div>
            <button type="button" className="project-path" onClick={() => setSelectedProject(project)}>{project.repo}<Icon name="arrowUpRight" size={15} /></button>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">{project.stack.slice(0, 3).map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}</div>
            <div className="project-card-bottom"><span><Icon name="star" size={15} /> {project.stars}</span><span><Icon name="clock" size={15} /> {project.updated}</span><AvatarStack initials={project.team} /></div>
            <div className="project-hover">
              <p>{project.description}</p>
              <div className="project-tags">{project.stack.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}</div>
              <div className="hover-contributors"><span>CONTRIBUTORS</span><div>{project.team.slice(0, 5).map((initials) => {const person = people.find((candidate) => candidate.initials === initials);return <button key={initials} type="button" aria-label={person?.name || initials} title={person?.name || initials} onClick={() => navigate("engineering")}><Avatar initials={initials} name={person?.name || initials} color={person?.color || "mint"} size="sm" /></button>;})}</div><small>{project.team.length} people · click to explore</small></div>
            </div>
          </article>
        ))}
      </div> : <div className="empty-state"><Icon name="repo" size={22} /><strong>No repositories found</strong><p>Adjust the search or technology filter.</p></div>}
      <p className="project-footer-note">Hover any repository to inspect contributors and contribution share <i>·</i> {filtered.length} / {projects.length} repositories</p>
      {selectedProject && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }} role="presentation"><section className="project-dialog" role="dialog" aria-modal="true" aria-label={`${selectedProject.name} repository details`}><button type="button" className="icon-button dialog-close" aria-label="Close repository details" onClick={() => setSelectedProject(null)}><Icon name="x" /></button><span className={`project-status status-${selectedProject.status.toLowerCase()}`}><i />{selectedProject.status.toUpperCase()}</span><span className="eyebrow">REPOSITORY / APPLIED AI</span><h2>{selectedProject.repo}</h2><p>{selectedProject.description}</p><div className="project-dialog-meta"><span><Icon name="star" size={16} /> {selectedProject.stars} stars</span><span><Icon name="clock" size={16} /> UPDATED {selectedProject.updated.toUpperCase()}</span></div><span className="eyebrow">TECHNOLOGY STACK</span><div className="project-tags">{selectedProject.stack.map((tag) => <span key={tag} className="tech-tag">{tag}</span>)}</div><span className="eyebrow">CONTRIBUTORS / CONTRIBUTION SHARE</span>{selectedProject.team.slice(0, 5).map((initials, index) => {const person = people.find((candidate) => candidate.initials === initials);return <div className="contributor-line" key={initials}><Avatar initials={initials} name={person?.name || initials} color={person?.color || "mint"} size="sm" /><span>{person?.name || initials}</span><strong>{[37, 24, 18, 13, 8][index]}%</strong></div>;})}<small className="demo-disclaimer">Repository details and contribution percentages are illustrative demo data.</small></section></div>}
    </>
  );
}
