"use client";

import { useState } from "react";
import Icon from "./dashboard-icon";
import { activityItems, people } from "../data/dashboard-data";
import { Avatar, MetricCard, PageHeading } from "./ui";

function makeContributions() {
  return Array.from({ length: 364 }, (_, index) => {
    const signal = (index * 17 + Math.floor(index / 7) * 13 + (index % 11) * 3) % 19;
    return signal < 7 ? 1 : signal < 12 ? 2 : signal < 16 ? 3 : 4;
  });
}

export default function ActivityPage() {
  const [period, setPeriod] = useState("Last 12 months");
  const [cells] = useState(makeContributions);
  const visibleCells = period === "Last 12 months" ? cells : cells.slice(-30);
  return (
    <>
      <PageHeading eyebrow="ENGINEERING SIGNAL / ACTIVITY" title="A steady pulse of progress." description="A clearer view of the work your team is shipping, reviewing, and sharing." action={<button type="button" className="button button-quiet" onClick={() => setPeriod((value) => value === "Last 12 months" ? "Last 30 days" : "Last 12 months")}><Icon name="calendar" size={16} /> {period} <Icon name="chevronDown" size={15} /></button>} />
      <section className="summary-grid activity-metrics" aria-label="Activity metrics">
        <MetricCard label="CONTRIBUTIONS" value="1,842" detail="Across 12 repositories" trend="+18%" />
        <MetricCard label="PULL REQUESTS" value="638" detail="86 merged this month" trend="+12%" />
        <MetricCard label="REVIEWS" value="412" detail="Median response 2.4h" />
        <MetricCard label="ACTIVE STREAK" value="32" unit="days" detail="Team-wide shipping streak" badge="HEALTHY" />
      </section>
      <section className="contribution-card surface-card">
        <div className="section-title-row"><div><span className="eyebrow">CONTRIBUTION ACTIVITY</span><h2>Consistency over time</h2></div><span className="contribution-total"><strong>1,842</strong> contributions</span></div>
        <div className="contribution-chart-scroll"><div className={`contribution-chart${period === "Last 30 days" ? " contribution-chart-month" : ""}`}>
          <div className="weekday-labels"><span>Mon</span><span>Wed</span><span>Fri</span></div>
          <div className={`contribution-grid${period === "Last 30 days" ? " contribution-grid-month" : ""}`} role="img" aria-label={`Contribution activity heatmap for ${period.toLowerCase()}`}>{visibleCells.map((level, index) => <span key={index} className={`contribution-cell level-${level}`} title={`${level === 0 ? "No" : level} contribution${level === 1 ? "" : "s"} · ${period === "Last 30 days" ? `day ${index + 1}` : `week ${Math.floor(index / 7) + 1}`}`} />)}{period === "Last 30 days" && Array.from({ length: 35 - visibleCells.length }, (_, index) => <span key={`empty-${index}`} className="contribution-cell contribution-cell-empty" aria-hidden="true" />)}</div>
          <div className="month-labels">{period === "Last 12 months" ? <><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span></> : <><span>30 days ago</span><span>Today</span></>}</div>
        </div></div>
        <div className="contribution-legend"><span>Less</span>{[0, 1, 2, 3, 4].map((level) => <i key={level} className={`contribution-cell level-${level}`} />)}<span>More</span><small>Activity shown is illustrative demo data.</small></div>
      </section>
      <section className="activity-feed-section"><div className="section-title-row"><div><span className="eyebrow">TEAM ACTIVITY</span><h2>Recent work</h2></div><span className="live-count"><i /> LIVE FEED</span></div><div className="activity-feed surface-card">
        {activityItems.map((item, index) => {
          const person = people.find((candidate) => candidate.initials === item.initials);
          return <article className="activity-feed-row" key={item.subject}><span className="activity-timeline">{index === 0 ? <Icon name="git" size={16} /> : index === 1 ? <Icon name="check" size={16} /> : index === 2 ? <Icon name="send" size={15} /> : <Icon name="plus" size={16} />}</span><Avatar initials={item.initials} name={item.person} color={item.color} size="sm" /><div className="activity-feed-copy"><p><strong>{item.person}</strong> {item.action} <b>{item.subject}</b></p><span><Icon name="repo" size={13} /> {item.repo} <i>·</i> {item.type}</span></div><time>{item.time}</time><button type="button" className="quiet-icon" aria-label={`More about ${item.subject}`} title="Demo activity item"><Icon name="more" size={16} /></button></article>;
        })}
      </div></section>
    </>
  );
}
