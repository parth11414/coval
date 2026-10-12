"use client";

import { useMemo, useState } from "react";
import Icon from "./dashboard-icon";
import { activityItems, people } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

function makePattern(length) {
  return Array.from({ length }, (_, index) => {
    const signal = (index * 17 + Math.floor(index / 7) * 13 + (index % 11) * 3) % 19;
    return signal < 7 ? 1 : signal < 12 ? 2 : signal < 16 ? 3 : 4;
  });
}

export default function ActivityPage({ navigate }) {
  const [period, setPeriod] = useState("Last 12 months");
  const cells = useMemo(() => makePattern(period === "Last 12 months" ? 364 : 35), [period]);

  return <>
    <PageHeading title="Recent work, in context." description="A sample activity log connects each entry to its contributor and repository." action={<button type="button" className="button button-secondary" onClick={() => setPeriod((value) => value === "Last 12 months" ? "Last 30 days" : "Last 12 months")}><Icon name="calendar" size={16} /> {period}<Icon name="chevronDown" size={14} /></button>} />

    <section className="ledger-section rhythm-section" aria-labelledby="activity-rhythm-title">
      <div className="section-heading"><div><h2 id="activity-rhythm-title">Contribution rhythm</h2><span>Generated illustrative pattern · {period.toLowerCase()}</span></div><span className="sample-measure">SAMPLE ONLY</span></div>
      <div className={`contribution-chart-scroll${period === "Last 30 days" ? " month-view" : ""}`}>
        <div className="activity-pattern" role="img" aria-label={`Generated illustrative contribution pattern for ${period.toLowerCase()}`}>
          <div className="weekday-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className={`contribution-grid${period === "Last 30 days" ? " contribution-grid-month" : ""}`}>{cells.map((level, index) => <span key={index} className={`contribution-cell level-${level}`} />)}</div>
          <div className="month-labels">{period === "Last 12 months" ? ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"].map((month) => <span key={month}>{month}</span>) : <><span>30 days ago</span><span>Today</span></>}</div>
        </div>
      </div>
      <p className="page-footnote">The activity pattern is generated for this demo and does not represent a person’s actual contributions.</p>
    </section>

    <section className="ledger-section activity-log-section" aria-labelledby="activity-log-title">
      <div className="section-heading"><div><h2 id="activity-log-title">Activity entries</h2><span>{activityItems.length} illustrative records</span></div></div>
      <div className="activity-entry-list">
        {activityItems.map((item, index) => {
          const person = people.find((candidate) => candidate.initials === item.initials);
          return <article className="activity-entry" key={`${item.repo}-${item.subject}`}>
            <span className="entry-number">{String(index + 1).padStart(2, "0")}</span>
            {person && <button type="button" className="activity-person" onClick={() => navigate(`profile/${person.id}`)} aria-label={`Open ${person.name}'s sample profile`}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /></button>}
            <div className="activity-entry-copy"><p><button type="button" onClick={() => person && navigate(`profile/${person.id}`)}>{item.person}</button> {item.action} <strong>{item.subject}</strong></p><button type="button" className="cross-reference" onClick={() => navigate("projects")}><Icon name="repo" size={13} /> {item.repo}</button></div>
            <span className="activity-type">{item.type}</span><time>{item.time}</time>
          </article>;
        })}
      </div>
    </section>
  </>;
}
