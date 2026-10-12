"use client";

import { useState } from "react";
import Icon from "./dashboard-icon";
import { activityItems, fmt, people, profileDetails, projects } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

const profileTabs = ["Overview", "Career", "Projects", "Activity"];

function ContributionGrid({ seed }) {
  const cells = Array.from({ length: 140 }, (_, index) => {
    const signal = (seed + index * 13 + Math.floor(index / 7) * 9) % 19;
    return signal < 5 ? 0 : signal < 9 ? 1 : signal < 14 ? 2 : signal < 17 ? 3 : 4;
  });
  return <div className="profile-contribution-grid" role="img" aria-label="Generated illustrative contribution pattern for this sample profile">{cells.map((level, index) => <span key={index} className={`contribution-cell level-${level}`} />)}</div>;
}

export default function ProfilePage({ personId, navigate, notify }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [connected, setConnected] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareId, setCompareId] = useState("");
  const person = people.find((candidate) => candidate.id === personId);

  if (!person) return <div className="empty-state profile-not-found"><Icon name="users" size={21} /><strong>That profile is not in this sample directory.</strong><p>Choose a person from the index to open their record.</p><button type="button" className="button button-secondary" onClick={() => navigate("engineering")}>Browse people</button></div>;

  const details = profileDetails[person.id];
  const memberProjects = projects.filter((project) => project.team.includes(person.initials));
  const collaboratorIds = [...new Set(memberProjects.flatMap((project) => project.team))].filter((initials) => initials !== person.initials);
  const collaborators = collaboratorIds.map((initials) => people.find((candidate) => candidate.initials === initials)).filter(Boolean).slice(0, 6);
  const profileActivity = activityItems.filter((item) => item.initials === person.initials);
  const comparisonPerson = people.find((candidate) => candidate.id === compareId && candidate.id !== person.id);

  const onMessage = () => {
    navigate("chat");
    notify(`Opened sample conversations for ${person.name}. Messages stay local to the demo.`);
  };

  return <>
    <button type="button" className="breadcrumb-link" onClick={() => navigate("engineering")}><Icon name="arrowRight" size={14} /> People index <span>/</span> {person.name}</button>
    <header className="profile-record-header">
      <Avatar initials={person.initials} name={person.name} color={person.color} size="xl" />
      <div className="profile-record-identity"><h1>{person.name}</h1><p>{person.role} · {person.team}</p><span>{person.location} · @{details.handle}</span></div>
      <div className="profile-record-actions"><button type="button" className="button button-secondary" onClick={onMessage}><Icon name="message" size={15} /> Open messages</button><button type="button" className={`button${connected ? " button-primary" : " button-secondary"}`} aria-pressed={connected} onClick={() => { setConnected((value) => !value); notify(connected ? "Removed the local sample connection." : "Added a local sample connection. No invitation was sent."); }}><Icon name={connected ? "check" : "plus"} size={15} />{connected ? "Connected locally" : "Connect locally"}</button></div>
      <p className="profile-record-bio">{details.bio}</p>
      <div className="profile-record-facts"><span><strong>{fmt(person.commits)}</strong><small>sample commits</small></span><span><strong>{person.prs}</strong><small>sample merged PRs</small></span><span><strong>{memberProjects.length}</strong><small>project references</small></span><button type="button" className="text-link" onClick={() => setCompareOpen(true)}>Compare sample profiles <Icon name="arrowUpRight" size={14} /></button></div>
    </header>

    <nav className="profile-tabs" aria-label="Sample profile sections">{profileTabs.map((tab) => <button type="button" key={tab} className={`profile-tab${activeTab === tab ? " selected" : ""}`} aria-current={activeTab === tab ? "page" : undefined} onClick={() => setActiveTab(tab)}>{tab}{tab === "Projects" && <small>{memberProjects.length}</small>}</button>)}</nav>

    <div className="profile-tab-content">
      {activeTab === "Overview" && <div className="profile-overview-spread">
        <section className="ledger-section profile-activity-card"><div className="section-heading"><div><h2>Contribution pattern</h2><span>Generated illustration · not an activity record</span></div><span className="sample-measure">SAMPLE ONLY</span></div><ContributionGrid seed={person.commits} /><div className="profile-sample-measures"><span><strong>{details.bestStreak}</strong><small>sample best streak · days</small></span><span><strong>{fmt(details.solved)}</strong><small>sample problems solved</small></span><span><strong>{details.yearsExperience}</strong><small>sample years experience</small></span></div></section>
        <section className="ledger-section profile-skill-section"><div className="section-heading"><div><h2>Skill notes</h2><span>Illustrative profile indicators</span></div></div><div className="skill-index">{details.skills.map(([skill, level]) => <div className="skill-index-row" key={skill}><span>{skill}</span><span className="skill-rule"><i style={{ width: `${level}%` }} /></span><strong>{level}</strong></div>)}</div></section>
        <section className="ledger-section profile-relations"><div className="section-heading"><div><h2>Project references</h2><span>{memberProjects.length} sample entries</span></div><button type="button" className="text-link" onClick={() => setActiveTab("Projects")}>All projects <Icon name="arrowUpRight" size={14} /></button></div>{memberProjects.slice(0, 4).map((project, index) => <button type="button" className="compact-reference" key={project.id} onClick={() => navigate("projects")}><span className="entry-number">{String(index + 1).padStart(2, "0")}</span><span><strong>{project.name}</strong><small>{project.repo}</small></span><Icon name="arrowUpRight" size={14} /></button>)}</section>
        <section className="ledger-section profile-relations"><div className="section-heading"><div><h2>Shared contributors</h2><span>Sample teammates on these entries</span></div></div>{collaborators.map((candidate, index) => <button type="button" className="compact-reference" key={candidate.id} onClick={() => navigate(`profile/${candidate.id}`)}><span className="entry-number">{String(index + 1).padStart(2, "0")}</span><Avatar initials={candidate.initials} name={candidate.name} color={candidate.color} size="xs" /><span><strong>{candidate.name}</strong><small>{candidate.role}</small></span><Icon name="arrowUpRight" size={14} /></button>)}</section>
      </div>}

      {activeTab === "Career" && <section className="ledger-section profile-career"><div className="section-heading"><div><h2>Career notes</h2><span>Sample history supplied with this profile</span></div></div><article className="career-entry"><span className="entry-number">01</span><div><h3>{person.role}</h3><p>Atlas Labs · current sample role</p><span className="career-note">Current workspace record</span></div></article><article className="career-entry"><span className="entry-number">02</span><div><h3>{details.previousRole}</h3><p>{details.previousCompany} · {details.previousYears}</p><span className="career-note">Previous role in the sample profile</span></div></article><p className="page-footnote">This profile does not include a verified employment history.</p></section>}

      {activeTab === "Projects" && <section className="ledger-section profile-project-list"><div className="section-heading"><div><h2>Project references</h2><span>{memberProjects.length} sample repositories include this contributor</span></div></div>{memberProjects.map((project, index) => <article className="profile-project-entry" key={project.id}><span className="entry-number">{String(index + 1).padStart(2, "0")}</span><div><button type="button" className="entry-title" onClick={() => navigate("projects")}>{project.name}<Icon name="arrowUpRight" size={14} /></button><span className="entry-repo">{project.repo}</span><p>{project.description}</p><div className="entry-tags">{project.stack.map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div></div><span className="record-status">{project.status} · sample</span></article>)}</section>}

      {activeTab === "Activity" && <section className="ledger-section profile-activity-list"><div className="section-heading"><div><h2>Activity references</h2><span>Illustrative events associated with this profile</span></div></div>{profileActivity.length ? profileActivity.map((item, index) => <article className="activity-entry" key={`${item.repo}-${item.subject}`}><span className="entry-number">{String(index + 1).padStart(2, "0")}</span><div className="activity-entry-copy"><p><strong>{item.action} {item.subject}</strong></p><button type="button" className="cross-reference" onClick={() => navigate("projects")}><Icon name="repo" size={13} /> {item.repo}</button></div><span className="activity-type">{item.type}</span><time>{item.time}</time></article>) : <p className="profile-empty-note">No sample activity entries are listed for {person.name}.</p>}</section>}
    </div>
    <p className="page-footnote">Profile details, counts, skill indicators, and work history are illustrative demo data.</p>

    {compareOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompareOpen(false); }}><section className="record-dialog compare-dialog" role="dialog" aria-modal="true" aria-labelledby="compare-title"><button type="button" className="icon-button dialog-close" aria-label="Close profile comparison" onClick={() => setCompareOpen(false)}><Icon name="x" size={18} /></button><h2 id="compare-title">Compare sample profiles</h2><label className="compare-select-label" htmlFor="compare-person">Choose another profile</label><select id="compare-person" className="compare-select" value={compareId} onChange={(event) => setCompareId(event.target.value)}><option value="">Select a teammate</option>{people.filter((candidate) => candidate.id !== person.id).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name} · {candidate.role}</option>)}</select>{comparisonPerson && <div className="profile-compare-table"><div><span>Sample profile</span><strong>{person.name}</strong><strong>{comparisonPerson.name}</strong></div><div><span>Contributions</span><b>{fmt(person.commits)}</b><b>{fmt(comparisonPerson.commits)}</b></div><div><span>Merged PRs</span><b>{person.prs}</b><b>{comparisonPerson.prs}</b></div><div><span>Sample signal</span><b>{person.score}/100</b><b>{comparisonPerson.score}/100</b></div></div>}<p className="page-footnote">Comparison values are illustrative, not verified performance measures.</p></section></div>}
  </>;
}
