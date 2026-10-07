import Icon from "./dashboard-icon";
import { people } from "../data/dashboard-data";

export function Avatar({ initials, name, color = "mint", size = "md", online = false }) {
  return (
    <span className={`avatar avatar-${color} avatar-${size}${online ? " avatar-online" : ""}`} role="img" aria-label={name || initials}>
      {initials}
      {online && <i className="presence-dot" />}
    </span>
  );
}

export function PageHeading({ eyebrow, title, description, action }) {
  return (
    <header className="page-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function MetricCard({ label, value, unit, detail, trend, badge, chart = false }) {
  return (
    <article className="metric-card">
      <div className="metric-top">
        <span className="metric-label">{label}</span>
        {trend && <span className="trend"><Icon name="arrowUpRight" size={14} /> {trend}</span>}
        {badge && <span className="status-pill">{badge}</span>}
      </div>
      <div className="metric-value">{value}<small>{unit}</small></div>
      <div className="metric-foot">
        <span>{detail}</span>
        {chart && <Sparkline />}
      </div>
    </article>
  );
}

export function Sparkline({ color = "var(--violet)" }) {
  return (
    <svg className="sparkline" viewBox="0 0 96 32" aria-hidden="true">
      <path d="M2 27 15 20 26 24 38 13 49 18 61 8 72 12 84 3 94 7" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function AvatarStack({ initials, limit = 3 }) {
  return (
    <span className="avatar-stack">
      {initials.slice(0, limit).map((item) => {
        const person = people.find((candidate) => candidate.initials === item);
        return <Avatar key={item} initials={item} name={person?.name || item} color={person?.color || "mint"} size="xs" />;
      })}
      {initials.length > limit && <span className="avatar-overflow">+{initials.length - limit}</span>}
    </span>
  );
}

export function EmptyState({ title, message }) {
  return <div className="empty-state"><Icon name="search" size={22} /><strong>{title}</strong><p>{message}</p></div>;
}
