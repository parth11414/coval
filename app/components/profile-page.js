"use client";

import { useEffect, useState } from "react";
import Icon from "./dashboard-icon";
import { activityItems, fmt, people, profileDetails, projects } from "../data/dashboard-data";
import { Avatar, MetricCard } from "./ui";

const profileTabs = ["Overview", "Career", "Projects", "Activity"];

function ContributionGrid({ seed }) {
  const cells = Array.from({ length: 196 }, (_, index) => {
    const signal = (seed + index * 17 + Math.floor(index / 7) * 11) % 19;
    return signal < 4 ? 0 : signal < 8 ? 1 : signal < 12 ? 2 : signal < 16 ? 3 : 4;
  });

  return (
    <div className="contribution-grid" role="img" aria-label="Illustrative contribution activity over the last 28 weeks">
      {cells.map((level, index) => <i key={index} className={`contribution-cell contribution-level-${level}`} />)}
    </div>
  );
}

export default function ProfilePage({ personId, navigate, notify }) {
  const [activeTab, setActiveTab] = useState("Overview");
  const [connected, setConnected] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareId, setCompareId] = useState("");
  useEffect(() => {
    if (!compareOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setCompareOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [compareOpen]);
  const person = people.find((candidate) => candidate.id === personId);

  if (!person) {
    return (
      <section className="empty-state profile-not-found">
        <Icon name="users" size={22} />
        <strong>That teammate profile isn’t available</strong>
        <p>Choose someone from the engineering directory.</p>
        <button type="button" className="button button-quiet" onClick={() => navigate("engineering")}>Browse people</button>
      </section>
    );
  }

  const details = profileDetails[person.id];
  const currentYear = new Date().getFullYear();
  const careerStartYear = currentYear - details.yearsExperience;
  const comparisonPerson = people.find((candidate) => candidate.id === compareId && candidate.id !== person.id);
  const comparisonDetails = comparisonPerson ? profileDetails[comparisonPerson.id] : null;
  const memberProjects = projects.filter((project) => project.team.includes(person.initials));
  const collaborators = [...new Set(memberProjects.flatMap((project) => project.team))]
    .filter((initials) => initials !== person.initials)
    .map((initials) => people.find((candidate) => candidate.initials === initials))
    .filter(Boolean)
    .slice(0, 5);
  const recentActivity = activityItems.filter((item) => item.initials === person.initials);
  const activity = recentActivity.length ? recentActivity : memberProjects.slice(0, 3).map((project, index) => ({
    type: ["COMMITTED", "REVIEWED", "SHIPPED"][index],
    subject: ["Improved service reliability and test coverage", "Reviewed a teammate’s implementation", "Published an incremental project update"][index],
    repo: project.name,
    time: ["Today", "Yesterday", "This week"][index],
  }));

  const messagePerson = () => {
    navigate("chat");
    notify(`Opening messages for ${person.name}.`);
  };

  const sections = {
    Overview: (
      <>
        <section className="profile-activity-card surface-card">
          <div className="profile-section-heading">
            <div><span className="eyebrow">GITHUB ACTIVITY</span><h2>Code, in motion.</h2></div>
            <span className="profile-period">LAST 28 WEEKS</span>
          </div>
          <div className="profile-activity-stats">
            <div><strong>{fmt(person.commits)}</strong><span>CONTRIBUTIONS</span></div>
            <div><strong>{details.bestStreak} days</strong><span>BEST STREAK</span></div>
            <div><strong>{person.prs}</strong><span>MERGED PRS</span></div>
            <div><strong>{fmt(memberProjects.reduce((total, project) => total + project.stars, 0))}</strong><span>PROJECT STARS</span></div>
          </div>
          <ContributionGrid seed={person.commits} />
          <div className="contribution-legend"><span>LESS</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`contribution-cell contribution-level-${level}`} />)}<span>MORE</span></div>
        </section>

        <div className="profile-content-columns">
          <section className="profile-panel surface-card">
            <div className="profile-section-heading"><div><span className="eyebrow">TECH STACK</span><h2>Working fluency.</h2></div></div>
            <div className="profile-skill-list">
              {details.skills.map(([skill, level]) => <div className="profile-skill" key={skill}><span>{skill}</span><strong>{level}%</strong><i><b style={{ width: `${level}%` }} /></i></div>)}
            </div>
          </section>
          <section className="profile-panel surface-card">
            <div className="profile-section-heading"><div><span className="eyebrow">DEVELOPER SIGNAL</span><h2>Impact at a glance.</h2></div></div>
            <div className="profile-signal-score"><strong>{person.score}</strong><span>OUT OF 100</span><small>Technical signal</small></div>
            <div className="profile-signal-list">
              <div><span>Problem solving</span><strong>{fmt(details.solved)} solved</strong></div>
              <div><span>Community</span><strong>{fmt(details.followers)} followers</strong></div>
              <div><span>Experience</span><strong>{details.yearsExperience} years</strong></div>
            </div>
          </section>
        </div>

        <section className="profile-collaborators surface-card">
          <div className="profile-section-heading"><div><span className="eyebrow">TEAMMATES</span><h2>People {person.name.split(" ")[0]} works with.</h2></div></div>
          {collaborators.length ? <div className="profile-collaborator-list">
            {collaborators.map((collaborator) => <button type="button" className="profile-collaborator" key={collaborator.id} onClick={() => navigate(`profile/${collaborator.id}`)}>
              <Avatar initials={collaborator.initials} name={collaborator.name} color={collaborator.color} size="md" online={collaborator.status === "Online"} />
              <span><strong>{collaborator.name}</strong><small>{collaborator.role}</small></span>
              <Icon name="arrowUpRight" size={15} />
            </button>)}
          </div> : <p className="profile-muted">No shared project collaborators yet.</p>}
        </section>
      </>
    ),
    Career: (
      <>
        <header className="career-page-heading">
          <div><span className="eyebrow">CAREER / TRAJECTORY</span><h2>{person.name.split(" ")[0]}, by the work.</h2><p>A career is less a ladder than a set of increasingly interesting problems.</p></div>
          <button type="button" className="button career-compare-button" onClick={() => setCompareOpen(true)}><Icon name="compare" size={16} /> Compare profiles</button>
        </header>
        <div className="profile-career-layout">
          <div className="profile-career-main">
            <section className="career-throughline surface-card">
              <div className="career-years"><strong>{details.yearsExperience}</strong><span>YEARS<br />BUILDING</span></div>
              <div><span className="eyebrow">THE THROUGHLINE</span><h3>From {details.previousRole.toLowerCase()} to {person.role.toLowerCase()}.</h3><p>{details.bio}</p></div>
            </section>
            <section className="profile-panel surface-card profile-career-panel">
              <div className="profile-section-heading"><div><span className="eyebrow">CAREER PATH</span><h2>Experience, with context.</h2></div></div>
              <div className="profile-career-timeline">
                <article className="career-entry">
                  <span className="career-marker career-marker-current" aria-hidden="true" />
                  <div className="profile-career-card">
                    <div className="career-entry-company"><span>ATLAS LABS</span><span className="career-current-badge">CURRENT</span></div>
                    <h3>{person.role}</h3>
                    <span className="career-entry-dates">2023 — present</span>
                    <p>Setting technical direction, unblocking teams, and delivering dependable engineering systems.</p>
                    <div className="career-entry-skills">{details.skills.slice(0, 2).map(([skill]) => <span className="tech-tag" key={skill}>{skill}</span>)}</div>
                    <div className="career-entry-note"><span><Icon name="arrowUpRight" size={14} /></span> Growing team impact through technical leadership and collaboration</div>
                  </div>
                </article>
                <article className="career-entry">
                  <span className="career-marker" aria-hidden="true" />
                  <div className="profile-career-card">
                    <div className="career-entry-company"><span>{details.previousCompany.toUpperCase()}</span></div>
                    <h3>{details.previousRole}</h3>
                    <span className="career-entry-dates">{details.previousYears}</span>
                    <p>Built production software, partnered across disciplines, and strengthened core systems.</p>
                    <div className="career-entry-skills">{details.skills.slice(2, 5).map(([skill]) => <span className="tech-tag" key={skill}>{skill}</span>)}</div>
                  </div>
                </article>
                <article className="career-entry">
                  <span className="career-marker" aria-hidden="true" />
                  <div className="profile-career-card">
                    <div className="career-entry-company"><span>EARLIER EXPERIENCE</span></div>
                    <h3>Software Engineer</h3>
                    <span className="career-entry-dates">2018 — {details.previousYears.slice(0, 4)}</span>
                    <p>Developed engineering fundamentals through product delivery, code reviews, and team projects.</p>
                    <div className="career-entry-skills">{details.skills.slice(0, 2).map(([skill]) => <span className="tech-tag" key={skill}>{skill}</span>)}</div>
                  </div>
                </article>
              </div>
              <p className="profile-demo-note">Career history is illustrative demo content.</p>
            </section>
          </div>
          <aside className="career-insights">
            <section className="career-velocity surface-card">
              <span className="eyebrow">CAREER VELOCITY</span>
              <div className="career-velocity-value"><strong>2.4×</strong><span className="career-growth-indicator" aria-label="Upward growth"><Icon name="arrowUpRight" size={22} /></span></div>
              <p>role scope expanded since first engineering role</p>
              <div className="career-timeline-control">
                <span className="career-timeline-current">{currentYear}</span>
                <div className="career-timeline-track" role="img" aria-label={`${person.name} career timeline from ${careerStartYear} to ${currentYear}`}>
                  <span className="career-timeline-progress" />
                  <span className="career-timeline-marker" />
                </div>
                <div className="career-timeline-labels"><span>{careerStartYear}</span><span>NOW</span></div>
              </div>
            </section>
            <section className="career-milestone surface-card">
              <span className="eyebrow">CAREER MILESTONE</span>
              <span className="career-milestone-icon"><Icon name="activity" size={20} /></span>
              <h3>From first PR<br />to lasting impact.</h3>
              <p>3 roles · {memberProjects.length} active projects · one evolving toolkit.</p>
            </section>
          </aside>
        </div>
      </>
    ),
    Projects: (
      <section className="profile-projects-panel">
        <div className="profile-section-heading"><div><span className="eyebrow">PROJECT PORTFOLIO</span><h2>Systems built with the team.</h2></div><span className="profile-period">{memberProjects.length} REPOSITORIES</span></div>
        <div className="profile-project-grid">
          {memberProjects.map((project) => <article className="profile-project-card surface-card" key={project.id}>
            <div className="profile-project-top"><span className="repo-icon"><Icon name="repo" size={17} /></span><span className={`project-status status-${project.status.toLowerCase()}`}><i />{project.status.toUpperCase()}</span></div>
            <h3>{project.name}</h3><span className="profile-project-path">{project.repo}</span><p>{project.description}</p>
            <div className="project-tags">{project.stack.slice(0, 4).map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
            <div className="profile-project-foot"><span><Icon name="star" size={13} /> {project.stars}</span><span>{project.team.length} collaborators</span><button type="button" className="text-button" onClick={() => navigate("projects")}>EXPLORE <Icon name="arrowUpRight" size={13} /></button></div>
          </article>)}
        </div>
      </section>
    ),
    Activity: (
      <section className="profile-panel surface-card profile-feed-panel">
        <div className="profile-section-heading"><div><span className="eyebrow">CONTRIBUTION LOG</span><h2>Recent activity.</h2></div><button type="button" className="text-button" onClick={() => navigate("activity")}>FULL TIMELINE <Icon name="arrowUpRight" size={13} /></button></div>
        <div className="profile-feed">
          {activity.map((item, index) => <article className="profile-feed-item" key={`${item.repo}-${index}`}>
            <Avatar initials={person.initials} name={person.name} color={person.color} size="sm" />
            <div><span className="eyebrow">{item.type} · {item.time}</span><h3>{item.subject}</h3><p>{item.repo}</p></div>
          </article>)}
        </div>
        <p className="profile-demo-note">Activity examples are illustrative demo content.</p>
      </section>
    ),
  };

  return (
    <>
    <div className="developer-profile">
      <div className="profile-breadcrumb">
        <button type="button" className="text-button" onClick={() => navigate("engineering")}><Icon name="users" size={14} /> ALL ENGINEERS</button>
        <span>/</span><span>{person.name}</span>
      </div>
      <header className="developer-profile-hero surface-card">
        <div className="profile-cover">
          <span>ATLAS LABS <i>·</i> {person.team.toUpperCase()}</span>
          <span className={`profile-cover-status${person.status === "Online" ? " is-online" : ""}`}><i />{person.status === "Online" ? "OPEN TO COLLABORATION" : "AVAILABLE SOON"} <b>{person.location.toUpperCase()}</b></span>
        </div>
        <div className="developer-profile-heading">
          <Avatar initials={person.initials} name={person.name} color={person.color} size="xl" online={person.status === "Online"} />
          <div className="developer-profile-identity">
            <span className="eyebrow">DEVELOPER PROFILE</span>
            <div className="developer-profile-name-row"><h1>{person.name}</h1><span className="profile-verified" aria-label="Verified team profile"><Icon name="check" size={13} /></span></div>
            <p className="profile-handle">@{details.handle} <span>·</span> {person.role}</p>
          </div>
          <div className="developer-profile-actions">
            <button type="button" className="button button-quiet" onClick={messagePerson}><Icon name="message" size={16} /> Message</button>
            <button type="button" className={`button ${connected ? "button-connected" : "button-primary"}`} onClick={() => { setConnected(true); notify(`You’re now connected with ${person.name}.`); }}><Icon name={connected ? "check" : "plus"} size={16} /> {connected ? "Connected" : "Connect"}</button>
          </div>
        </div>
        <p className="developer-profile-bio">{details.bio}</p>
        <div className="developer-profile-meta">
          <span><Icon name="activity" size={15} /> {person.location}</span>
          <span><Icon name="briefcase" size={15} /> {person.role} · Atlas Labs</span>
          <span><Icon name="users" size={15} /> {person.team}</span>
          <span><Icon name="clock" size={15} /> {details.yearsExperience} years experience</span>
        </div>
        {memberProjects.length > 0 && <div className="developer-profile-repos"><span className="eyebrow">CURRENTLY BUILDING</span><div>{memberProjects.slice(0, 3).map((project) => <button type="button" key={project.id} className="repository-chip" onClick={() => navigate("projects")}><Icon name="repo" size={14} /> {project.name}</button>)}</div></div>}
      </header>

      <section className="profile-overview-metrics" aria-label={`${person.name} engineering metrics`}>
        <MetricCard label="CONTRIBUTIONS" value={fmt(person.commits)} detail="Across connected repositories" trend="+12%" />
        <MetricCard label="TECHNICAL SIGNAL" value={person.score} unit="/100" detail="Engineering impact score" badge="ACTIVE" />
        <MetricCard label="MERGED PULL REQUESTS" value={person.prs} detail="Delivered with collaborators" />
        <MetricCard label="PROJECT STARS" value={fmt(memberProjects.reduce((total, project) => total + project.stars, 0))} detail={`${memberProjects.length} active repositories`} />
      </section>

      <nav className="profile-tabs" aria-label="Profile sections">
        {profileTabs.map((tab) => <button type="button" key={tab} className={`profile-tab${activeTab === tab ? " selected" : ""}`} aria-current={activeTab === tab ? "page" : undefined} onClick={() => setActiveTab(tab)}>{tab}{tab === "Projects" && <small>{memberProjects.length}</small>}</button>)}
      </nav>
      <div className="profile-tab-content">{sections[activeTab]}</div>
      <p className="profile-demo-note profile-page-disclaimer">Team metrics and contribution charts are illustrative demo data.</p>
    </div>
    {compareOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompareOpen(false); }}>
      <section className="profile-compare-dialog" role="dialog" aria-modal="true" aria-labelledby="profile-compare-title">
        <button type="button" className="icon-button dialog-close" aria-label="Close profile comparison" onClick={() => setCompareOpen(false)}><Icon name="x" size={17} /></button>
        <span className="eyebrow">ENGINEERING SNAPSHOT</span>
        <h2 id="profile-compare-title">Compare profiles</h2>
        <label className="compare-select-label" htmlFor="compare-person">Choose a teammate</label>
        <select id="compare-person" className="compare-select" value={compareId} onChange={(event) => setCompareId(event.target.value)}>
          <option value="">Select a teammate</option>
          {people.filter((candidate) => candidate.id !== person.id).map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.name} · {candidate.role}</option>)}
        </select>
        {comparisonPerson && comparisonDetails && <div className="profile-compare-grid">
          {[person, comparisonPerson].map((candidate, index) => {
            const candidateDetails = index === 0 ? details : comparisonDetails;
            return <article className="profile-compare-person" key={candidate.id}>
              <Avatar initials={candidate.initials} name={candidate.name} color={candidate.color} size="md" />
              <strong>{candidate.name}</strong><span>{candidate.role}</span>
              <div><small>YEARS EXPERIENCE</small><b>{candidateDetails.yearsExperience}</b></div>
              <div><small>CONTRIBUTIONS</small><b>{fmt(candidate.commits)}</b></div>
              <div><small>MERGED PRS</small><b>{candidate.prs}</b></div>
              <div><small>TECHNICAL SIGNAL</small><b>{candidate.score}/100</b></div>
            </article>;
          })}
        </div>}
        <p className="profile-demo-note">Profile metrics are illustrative demo data.</p>
      </section>
    </div>}
    </>
  );
}
