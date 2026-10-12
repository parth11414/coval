import Icon from "./dashboard-icon";
import { people } from "../data/dashboard-data";

export function Avatar({ initials, name, color = "mint", size = "md", online = false }) {
  return (
    <span className={`avatar avatar-${color} avatar-${size}`} role="img" aria-label={name || initials}>
      {initials}
    </span>
  );
}

export function PageHeading({ title, description, action }) {
  return (
    <header className="page-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </header>
  );
}

export function AvatarStack({ initials, limit = 3, onPersonSelect }) {
  return (
    <span className="avatar-stack">
      {initials.slice(0, limit).map((item) => {
        const person = people.find((candidate) => candidate.initials === item);
        const avatar = <Avatar initials={item} name={person?.name || item} color={person?.color || "mint"} size="xs" />;
        return onPersonSelect && person
          ? <button key={item} type="button" className="avatar-profile-trigger" aria-label={`View ${person.name} profile`} title={person.name} onClick={() => onPersonSelect(person)}>{avatar}</button>
          : <span key={item}>{avatar}</span>;
      })}
      {initials.length > limit && <span className="avatar-overflow">+{initials.length - limit}</span>}
    </span>
  );
}

export function EmptyState({ title, message }) {
  return <div className="empty-state"><Icon name="search" size={22} /><strong>{title}</strong><p>{message}</p></div>;
}
