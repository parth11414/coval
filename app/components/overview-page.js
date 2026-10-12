"use client";

import Icon from "./dashboard-icon";
import { activityItems, people, projects } from "../data/dashboard-data";
import { Avatar, AvatarStack, PageHeading } from "./ui";

function profileFor(initials) {
  return people.find((person) => person.initials === initials);
}

export default function OverviewPage({ navigate }) {
  const currentProjects = projects.slice(0, 4);
  const contributors = [...new Set(currentProjects.flatMap((project) => project.team))]
    .map(profileFor)
    .filter(Boolean)
    .slice(0, 5);

  return (
    <>
      <PageHeading
        title="Find the work moving your team."
        description="Projects, contributors, and recent changes in the Atlas Labs sample workspace."
        action={<button type="button" className="button button-secondary" onClick={() => navigate("engineering")}><Icon name="users" size={16} /> Browse people</button>}
      />

      <div className="overview-spread">
        <section className="ledger-section project-ledger" aria-labelledby="overview-project-title">
          <div className="section-heading">
            <div><h2 id="overview-project-title">Project index</h2><span>{projects.length} sample records</span></div>
            <button type="button" className="text-link" onClick={() => navigate("projects")}>All projects <Icon name="arrowUpRight" size={14} /></button>
          </div>
          <div className="entry-list">
            {currentProjects.map((project, index) => (
              <article className="project-entry" key={project.id}>
                <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="project-entry-copy">
                  <button type="button" className="entry-title" onClick={() => navigate("projects")}>{project.name}<Icon name="arrowUpRight" size={14} /></button>
                  <span className="entry-repo">{project.repo}</span>
                  <p>{project.description}</p>
                  <div className="entry-tags">{project.stack.slice(0, 3).map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
                </div>
                <div className="entry-margin">
                  <span className={`record-status status-${project.status.toLowerCase()}`}>{project.status}</span>
                  <AvatarStack initials={project.team} limit={3} onPersonSelect={(person) => navigate(`profile/${person.id}`)} />
                  <span className="margin-note">{project.team.length} contributors</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="ledger-section contributor-margin" aria-labelledby="overview-people-title">
          <div className="section-heading">
            <div><h2 id="overview-people-title">People index</h2><span>Contributors on these entries</span></div>
            <button type="button" className="text-link" aria-label="Browse all people" onClick={() => navigate("engineering")}><Icon name="arrowUpRight" size={14} /></button>
          </div>
          <div className="people-reference-list">
            {contributors.map((person, index) => (
              <button type="button" className="person-reference" key={person.id} onClick={() => navigate(`profile/${person.id}`)}>
                <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
                <Avatar initials={person.initials} name={person.name} color={person.color} size="sm" />
                <span className="person-reference-copy"><strong>{person.name}</strong><small>{person.role}</small></span>
                <Icon name="arrowUpRight" size={14} />
              </button>
            ))}
          </div>
          <button type="button" className="margin-footer-link" onClick={() => navigate("network")}>See team references <Icon name="arrowRight" size={14} /></button>
        </aside>
      </div>

      <section className="ledger-section recent-ledger" aria-labelledby="recent-work-title">
        <div className="section-heading">
          <div><h2 id="recent-work-title">Recent work</h2><span>Illustrative activity entries</span></div>
          <button type="button" className="text-link" onClick={() => navigate("activity")}>Open activity log <Icon name="arrowUpRight" size={14} /></button>
        </div>
        <div className="activity-entry-list">
          {activityItems.slice(0, 4).map((item, index) => {
            const person = profileFor(item.initials);
            return <article className="activity-entry" key={`${item.repo}-${item.subject}`}>
              <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
              {person && <button type="button" className="activity-person" onClick={() => navigate(`profile/${person.id}`)} aria-label={`Open ${person.name}'s sample profile`}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /></button>}
              <div className="activity-entry-copy"><p><button type="button" onClick={() => person && navigate(`profile/${person.id}`)}>{item.person}</button> {item.action} <strong>{item.subject}</strong></p><button type="button" className="cross-reference" onClick={() => navigate("projects")}><Icon name="repo" size={13} /> {item.repo}</button></div>
              <span className="activity-type">{item.type}</span><time>{item.time}</time>
            </article>;
          })}
        </div>
      </section>
    </>
  );
}
