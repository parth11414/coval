"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { people, projects } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

const allStacks = [...new Set(projects.flatMap((project) => project.stack))];

export default function ProjectsPage({ navigate }) {
  const [query, setQuery] = useState("");
  const [stack, setStack] = useState("All technologies");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filters = ["All technologies", ...allStacks];
  const visibleFilters = showAllFilters ? filters : filters.slice(0, 13);
  const filtered = useMemo(() => projects.filter((project) => {
    const text = `${project.name} ${project.repo} ${project.description} ${project.stack.join(" ")}`.toLowerCase();
    return text.includes(query.trim().toLowerCase()) && (stack === "All technologies" || project.stack.includes(stack));
  }), [query, stack]);

  return <>
    <PageHeading title="Project entries." description="Search the sample repository index, compare its technology tags, and follow a contributor into their profile." action={<span className="record-count">{filtered.length} of {projects.length} repositories</span>} />
    <div className="directory-tools project-tools">
      <label className="search-field"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a repository or topic" aria-label="Search sample projects" />{query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery("")}><Icon name="x" size={15} /></button>}</label>
      <div className="filter-pills" aria-label="Filter sample repositories by technology">
        {visibleFilters.map((filter) => <button key={filter} type="button" className={`filter-pill${stack === filter ? " selected" : ""}`} aria-pressed={stack === filter} onClick={() => setStack(filter)}>{filter}</button>)}
        {filters.length > visibleFilters.length && <button type="button" className="filter-pill filter-more" onClick={() => setShowAllFilters(true)}>Show {filters.length - visibleFilters.length} more</button>}
      </div>
    </div>

    {filtered.length ? <section className="project-index" aria-label="Project directory">
      <div className="index-column-head"><span>Repository</span><span>Stage</span><span>Technology notes</span><span>Contributors</span><span>Star count</span></div>
      {filtered.map((project, index) => <article className="project-index-row" key={project.id}>
        <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
        <div className="project-index-main">
          <button type="button" className="entry-title" onClick={() => setSelectedProject(project)}>{project.name}<Icon name="arrowUpRight" size={14} /></button>
          <span className="entry-repo">{project.repo}</span>
          <p>{project.description}</p>
        </div>
        <span className={`record-status status-${project.status.toLowerCase()}`}>{project.status}</span>
        <div className="entry-tags">{project.stack.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
        <div className="project-index-team">{project.team.slice(0, 4).map((initials) => {
          const person = people.find((candidate) => candidate.initials === initials);
          return person ? <button key={person.id} type="button" aria-label={`Open ${person.name}'s sample profile`} title={person.name} onClick={() => navigate(`profile/${person.id}`)}><Avatar initials={person.initials} name={person.name} color={person.color} size="xs" /></button> : null;
        })}</div>
        <span className="sample-count"><strong>{project.stars}</strong><small>sample stars</small></span>
        <button type="button" className="quiet-icon project-open-button" aria-label={`Open ${project.name} details`} onClick={() => setSelectedProject(project)}><Icon name="arrowUpRight" size={15} /></button>
      </article>)}
    </section> : <div className="empty-state"><Icon name="repo" size={21} /><strong>No repository matches that entry.</strong><p>Try a different name, topic, or technology.</p><button type="button" className="button button-secondary" onClick={() => { setQuery(""); setStack("All technologies"); }}>Clear filters</button></div>}
    <p className="page-footnote">Repository descriptions, stages, stars, and updates are illustrative demo data.</p>

    {selectedProject && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProject(null); }}><section className="record-dialog" role="dialog" aria-modal="true" aria-labelledby="project-detail-title">
      <button type="button" className="icon-button dialog-close" aria-label="Close repository details" onClick={() => setSelectedProject(null)}><Icon name="x" size={18} /></button>
      <span className={`record-status status-${selectedProject.status.toLowerCase()}`}>Sample stage · {selectedProject.status}</span>
      <h2 id="project-detail-title">{selectedProject.name}</h2><p className="entry-repo">{selectedProject.repo}</p><p>{selectedProject.description}</p>
      <div className="record-detail-row"><span>Technologies</span><div className="entry-tags">{selectedProject.stack.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div>
      <div className="record-detail-row"><span>Sample collaborators</span><div className="dialog-contributors">{selectedProject.team.map((initials) => {
        const person = people.find((candidate) => candidate.initials === initials);
        return person ? <button type="button" key={person.id} className="person-reference" onClick={() => navigate(`profile/${person.id}`)}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /><span className="person-reference-copy"><strong>{person.name}</strong><small>{person.role}</small></span><Icon name="arrowUpRight" size={14} /></button> : null;
      })}</div></div>
      <p className="page-footnote">All repository details shown here are illustrative demo data.</p>
    </section></div>}
  </>;
}
