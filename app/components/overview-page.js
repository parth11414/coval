"use client";

import Icon from "./dashboard-icon";
import { fmt, people, projects } from "../data/dashboard-data";
import { Avatar, AvatarStack, MetricCard } from "./ui";

const skillLevels = [
  ["Distributed systems", 96],
  ["TypeScript", 94],
  ["Search & retrieval", 92],
  ["Python", 89],
  ["Rust", 77],
  ["Kubernetes", 82],
];

const languages = [
  ["TypeScript", 34],
  ["Python", 29],
  ["Rust", 18],
  ["Go", 12],
  ["Other", 7],
];

const recentWork = [
  {
    type: "MERGED",
    person: "Maya Chen",
    initials: "MC",
    repo: "neural-search",
    time: "18m ago",
    title: "Pushed to neural-search",
    description: "Merged PR #418: Improved cache invalidation for hybrid keyword & vector queries.",
    color: "mint",
  },
  {
    type: "MERGED",
    person: "Leo Martin",
    initials: "LM",
    repo: "infra-core",
    time: "35m ago",
    title: "Merged infra-core #418 into main",
    description: "Canary is green across all three regions. Workload identity policies verified.",
    color: "blue",
  },
  {
    type: "EVAL",
    person: "Evan Brooks",
    initials: "EB",
    repo: "neural-search",
    time: "1h ago",
    title: "Updated ranking evaluation suite",
    description: "The reranker eval cleared 0.84 NDCG on the holdout set with long-tail holding at +11%.",
    color: "peach",
  },
  {
    type: "RELEASE",
    person: "Priya Nair",
    initials: "PN",
    repo: "signal-board",
    time: "2h ago",
    title: "Shipped the new signal-board",
    description: "Real-time engineering health surface with accessibility enhancements and side-by-side view.",
    color: "violet",
  },
  {
    type: "REVIEW",
    person: "Jonah Reed",
    initials: "JR",
    repo: "infra-core",
    time: "4h ago",
    title: "Reviewed 3 pull requests",
    description: "Pushed cache invalidation notes to the RFC and signed off on staging deployment plan.",
    color: "lavender",
  },
];

export default function OverviewPage({ navigate, notify }) {
  const maya = people[0];

  return (
    <>
      <header className="overview-greeting-section">
        <div className="overview-greeting-text">
          <span className="eyebrow">ENGINEERING INTELLIGENCE</span>
          <h1 className="overview-heading">Good morning, Maya</h1>
          <p className="overview-subtext">Engineering intelligence for your team.</p>
        </div>
        <div className="overview-greeting-actions">
          <button type="button" className="button button-quiet" onClick={() => navigate("engineering")}>
            <Icon name="users" size={17} /> Explore team
          </button>
        </div>
      </header>

      <article className="overview-profile-hero">
        <div className="hero-header">
          <Avatar initials={maya.initials} name={maya.name} color={maya.color} size="xl" online />
          <div className="hero-identity">
            <div className="hero-name-row">
              <h2>{maya.name}</h2>
              <span className="verified-badge" title="Identity verified"><Icon name="check" size={13} /></span>
              <span className="online-pill"><i /> Online now</span>
            </div>
            <div className="hero-meta">
              <span><Icon name="briefcase" size={15} /> {maya.role} at Atlas Labs</span><i>·</i>
              <span><Icon name="users" size={15} /> {maya.team}</span><i>·</i>
              <span><Icon name="activity" size={15} /> {maya.location}, CA</span><i>·</i>
              <span><Icon name="clock" size={15} /> 8 years exp</span>
            </div>
          </div>
          <div className="hero-actions">
            <button type="button" className="button button-quiet" onClick={() => navigate("chat")}><Icon name="message" size={16} /> Message</button>
            <button type="button" className="button button-quiet" onClick={() => notify("Connection request sent to Maya Chen.")}><Icon name="plus" size={17} /> Connect</button>
            <button type="button" className="button button-primary" onClick={() => navigate("engineering/maya-chen")}><Icon name="users" size={16} /> Full profile</button>
          </div>
        </div>
        <p className="hero-bio">Building search systems that feel a little more like thinking. Staff engineer by title, systems gardener by temperament.</p>
        <div className="hero-footer-bar">
          <div className="hero-stats">
            <div><span>GITHUB HANDLE</span><strong>@mayacodes</strong></div>
            <div><span>TECH SIGNAL</span><strong>94 <small>/ 100</small></strong></div>
            <div><span>SOLVED LC</span><strong>684 <small>problems</small></strong></div>
            <div><span>STREAK</span><strong>32 <small>days</small></strong></div>
          </div>
          <div className="hero-repositories">
            <span className="eyebrow">CURRENT REPOSITORIES</span>
            <div>{projects.slice(0, 3).map((project) => (
              <button key={project.id} type="button" className="repository-chip" onClick={() => navigate("projects")}>
                <Icon name="repo" size={14} /> {project.name} <Icon name="star" size={13} /> {project.stars}
              </button>
            ))}</div>
          </div>
        </div>
      </article>

      <section className="overview-metrics-grid" aria-label="Key engineering metrics">
        <MetricCard label="GITHUB CONTRIBUTIONS" value={fmt(1842)} detail="32d streak · 86 merged PRs" trend="+18%" />
        <MetricCard label="TECHNICAL SIGNAL" value="94" unit="/100" detail="Top 6% across Atlas Labs" trend="+4.2%" badge="LEADERSHIP" />
        <MetricCard label="CONNECTED REPOS" value="3" unit="repos" detail="All production builds healthy" badge="SHIPPING" />
        <MetricCard label="COLLABORATORS" value="8" unit="peers" detail="Across 3 active squads" trend="+2 new" />
        <MetricCard label="RECENT VELOCITY" value="86" unit="PRs" detail="41 issues closed · 9.2h SLA" badge="ACTIVE" />
      </section>

      <section className="overview-projects-section">
        <div className="overview-section-title-bar">
          <div><span className="eyebrow">REPOSITORIES &amp; SYSTEMS</span><h2 className="overview-section-title">Current projects <span>3</span></h2></div>
          <button type="button" className="text-button" onClick={() => navigate("projects")}>EXPLORE ALL 12 REPOSITORIES <Icon name="arrowUpRight" size={14} /></button>
        </div>
        <div className="overview-projects-grid">
          {projects.slice(0, 3).map((project) => (
            <article className="overview-project-card" key={project.id}>
              <div className="overview-project-heading">
                <span className="repo-icon"><Icon name="repo" size={17} /></span>
                <span className={`project-status status-${project.status.toLowerCase()}`}><i />{project.status.toUpperCase()}</span>
              </div>
              <button type="button" className="overview-project-name" onClick={() => navigate("projects")}>{project.name}<Icon name="arrowUpRight" size={13} /></button>
              <span className="overview-project-path">{project.repo}</span>
              <p>{project.description}</p>
              <div className="project-tags">{project.stack.slice(0, 3).map((tag) => <span className="tech-tag" key={tag}>{tag}</span>)}</div>
              <div className="overview-project-footer"><span>CONTRIBUTORS</span><AvatarStack initials={project.team} limit={3} /><small>{project.stars} <Icon name="star" size={12} /> · {project.updated}</small></div>
            </article>
          ))}
        </div>
      </section>

      <div className="overview-lower-grid">
        <article className="overview-timeline-card">
          <div className="overview-card-heading">
            <div><span className="eyebrow">ACTIVITY STREAM</span><h2 className="overview-card-title">Recent activity</h2></div>
            <button type="button" className="text-button" onClick={() => navigate("activity")}>VIEW ALL <Icon name="arrowUpRight" size={14} /></button>
          </div>
          <div className="overview-timeline-list">
            {recentWork.map((item) => (
              <div className="overview-timeline-item" key={`${item.person}-${item.time}`}>
                <Avatar initials={item.initials} name={item.person} color={item.color} size="sm" />
                <div className="overview-timeline-content">
                  <div className="overview-timeline-meta"><span>{item.type}</span><strong>{item.person}</strong><small>{item.repo} · {item.time}</small></div>
                  <h3>{item.title}</h3><p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="overview-skills-card">
          <div className="overview-card-heading">
            <div><span className="eyebrow">TECHNICAL PROFILE</span><h2 className="overview-card-title">Skills &amp; competency</h2></div>
            <button type="button" className="text-button" onClick={() => navigate("engineering")}>VIEW DIRECTORY <Icon name="arrowUpRight" size={14} /></button>
          </div>
          <section className="skills-section-block">
            <span className="skills-section-label">CORE TECHNICAL COMPETENCIES</span>
            {skillLevels.map(([skill, value]) => (
              <div className="skill-meter" key={skill}>
                <span>{skill}</span><strong>{value}%</strong>
                <i><b style={{ width: `${value}%` }} /></i>
              </div>
            ))}
          </section>
          <section className="skills-section-block">
            <span className="skills-section-label">LANGUAGE DISTRIBUTION</span>
            {languages.map(([language, value]) => (
              <div className="language-meter" key={language}><span>{language}</span><i><b style={{ width: `${value * 2.2}%` }} /></i><strong>{value}%</strong></div>
            ))}
          </section>
          <section className="skills-section-block problem-solving">
            <div><span className="skills-section-label">PROBLEM SOLVING SIGNAL</span><strong>CONTEST RATING: 2,186</strong><small>Top 4.8%</small></div>
            <div className="solved-count"><strong>684</strong><span>SOLVED</span></div>
            <div className="problem-levels"><span>182 <small>EASY</small></span><span>381 <small>MEDIUM</small></span><span>121 <small>HARD</small></span></div>
          </section>
        </article>
      </div>
    </>
  );
}
