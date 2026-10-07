"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Icon from "./dashboard-icon";
import { conversations as seedConversations, initialMessages, people, projects } from "../data/dashboard-data";
import { Avatar, PageHeading } from "./ui";

const copyMessages = Object.fromEntries(Object.entries(initialMessages).map(([id, messages]) => [id, messages.map((message) => ({ ...message }))]));

export default function MessagesPage({ notify }) {
  const [threads, setThreads] = useState(seedConversations);
  const [messageMap, setMessageMap] = useState(copyMessages);
  const [activeId, setActiveId] = useState(seedConversations[0].id);
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const messageEndRef = useRef(null);
  const messages = messageMap[activeId] || [];
  const active = threads.find((thread) => thread.id === activeId) || threads[0];
  const participant = people.find((person) => person.name === active.name || person.id === active.id);
  const project = projects.find((item) => item.name === active.name || item.id === active.id);
  const filteredThreads = useMemo(() => threads.filter((thread) => thread.name.toLowerCase().includes(query.toLowerCase())), [query, threads]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [activeId, messages.length]);

  function selectThread(id) {
    setActiveId(id);
    setShowList(false);
    setDraft("");
  }

  function createThread() {
    const id = `draft-${Date.now()}`;
    const thread = { id, name: "New conversation", kind: "person", preview: "Start a new conversation", time: "Now", unread: 0, color: "mint" };
    setThreads((current) => [thread, ...current]);
    setMessageMap((current) => ({ ...current, [id]: [] }));
    selectThread(id);
    notify("New local conversation created.");
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const now = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    const sentMessage = { id: `${Date.now()}-${Math.random()}`, from: "Maya", text, time: now, mine: true };
    setMessageMap((current) => ({ ...current, [activeId]: [...(current[activeId] || []), sentMessage] }));
    setThreads((current) => current.map((thread) => thread.id === activeId ? { ...thread, preview: `You: ${text}`, time: "Now" } : thread));
    setDraft("");
  }

  return (
    <>
      <PageHeading eyebrow="TEAM COMMUNICATION / MESSAGES" title="Good work happens together." description="Project rooms and teammate conversations, in one calm place." action={<button type="button" className="button button-primary" onClick={createThread}><Icon name="plus" size={17} /> New message</button>} />
      <section className={`chat-workspace surface-card${showList ? " mobile-list-open" : ""}${showDetails ? " details-open" : ""}`} aria-label="Team messages">
        <aside className="chat-sidebar">
          <div className="chat-sidebar-heading"><div><span className="eyebrow">INBOX</span><h2>Messages <span>{threads.length}</span></h2></div><button type="button" className="quiet-icon" aria-label="New conversation" onClick={createThread}><Icon name="plus" size={18} /></button></div>
          <label className="search-field chat-search"><Icon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations…" aria-label="Search conversations" /></label>
          <div className="conversation-list">
            {filteredThreads.map((thread) => {
              const person = people.find((candidate) => candidate.name === thread.name || candidate.id === thread.id);
              return <button type="button" className={`conversation-item${thread.id === activeId ? " active" : ""}`} key={thread.id} onClick={() => selectThread(thread.id)} aria-current={thread.id === activeId ? "true" : undefined}>
                <span className="conversation-avatar">{person ? <Avatar initials={person.initials} name={person.name} color={person.color} size="md" online={person.status === "Online"} /> : <span className={`thread-icon thread-${thread.color}`}><Icon name={thread.id.startsWith("draft-") ? "message" : "repo"} size={17} /></span>}</span>
                <span className="conversation-copy"><span className="conversation-title">{thread.name}</span><span className="conversation-preview">{thread.preview}</span></span>
                <span className="conversation-meta"><time>{thread.time}</time>{thread.unread > 0 && <i className="unread-badge">{thread.unread}</i>}</span>
              </button>;
            })}
            {!filteredThreads.length && <div className="conversation-empty">No conversations found.</div>}
          </div>
          <div className="chat-sidebar-footer"><Avatar initials="MC" name="Maya Chen" color="mint" size="sm" online /><span><b>Maya Chen</b><small>Atlas Labs</small></span><span className="chat-online-indicator" title="Online" /></div>
        </aside>
        <section className="chat-main" aria-label={`Conversation with ${active.name}`}>
          <header className="chat-header">
            <button type="button" className="quiet-icon mobile-chat-back" aria-label="Show conversations" onClick={() => setShowList(true)}><Icon name="arrowRight" size={18} /></button>
            <span className="chat-header-avatar">{participant ? <Avatar initials={participant.initials} name={participant.name} color={participant.color} size="md" online={participant.status === "Online"} /> : <span className={`thread-icon thread-${active.color}`}><Icon name={active.kind === "person" ? "message" : "repo"} size={17} /></span>}</span>
            <div className="chat-header-copy"><h2>{active.name}</h2><span>{participant ? `${participant.role} · ${participant.status}` : active.id.startsWith("draft-") ? "New local conversation" : "Project room · Atlas Labs"}</span></div>
            <button type="button" className={`quiet-icon${showDetails ? " selected" : ""}`} aria-label="Toggle conversation details" aria-expanded={showDetails} onClick={() => setShowDetails((value) => !value)}><Icon name="info" size={18} /></button>
            <button type="button" className="quiet-icon" aria-label="More conversation options" title="Demo conversation"><Icon name="more" size={18} /></button>
          </header>
          <div className="message-history" role="log" aria-live="polite" aria-relevant="additions">
            <div className="message-day-divider"><span>TODAY</span></div>
            {messages.map((message) => <article key={message.id} className={`message-row${message.mine ? " message-mine" : ""}`}>
              {!message.mine && <Avatar initials={participant?.initials || message.from.slice(0, 2).toUpperCase()} name={message.from} color={participant?.color || active.color} size="xs" />}
              <div className="message-content"><div className="message-sender">{message.mine ? "You" : message.from}<time>{message.time}</time></div><p className="message-bubble">{message.text}</p></div>
              {message.mine && <Avatar initials="MC" name="Maya Chen" color="mint" size="xs" />}
            </article>)}
            {!messages.length && <div className="message-empty"><span className="thread-icon thread-mint"><Icon name="message" size={20} /></span><strong>This conversation is ready</strong><p>Send a message to get things started.</p></div>}
            <div ref={messageEndRef} />
          </div>
          <form className="message-composer" onSubmit={sendMessage}>
            <label className="composer-label" htmlFor="message-draft">Write a message</label>
            <div className="composer-box"><textarea id="message-draft" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={`Message ${active.name}…`} rows={1} /><div className="composer-actions"><span>Enter to send <i>·</i> Shift + Enter for a new line</span><button type="submit" className="send-button" disabled={!draft.trim()} aria-label="Send message"><Icon name="send" size={16} /></button></div></div>
          </form>
        </section>
        <aside className="chat-details">
          <div className="details-heading"><span className="eyebrow">CONVERSATION</span><button type="button" className="quiet-icon mobile-details-close" aria-label="Close conversation details" onClick={() => setShowDetails(false)}><Icon name="x" size={18} /></button></div>
          {participant ? <><Avatar initials={participant.initials} name={participant.name} color={participant.color} size="xl" online={participant.status === "Online"} /><h3>{participant.name}</h3><p>{participant.role}</p><span className="details-status"><i /> {participant.status}</span><div className="details-divider" /><span className="eyebrow">TEAM</span><span className="details-value">{participant.team}</span><span className="eyebrow">LOCATION</span><span className="details-value">{participant.location}</span><div className="details-divider" /><span className="eyebrow">SHARED PROJECTS</span><div className="shared-projects">{projects.filter((item) => item.team.includes(participant.initials)).slice(0, 3).map((item) => <div key={item.id}><Icon name="repo" size={15} /><span>{item.name}</span></div>)}</div></> : <><span className={`details-project-icon thread-${active.color}`}><Icon name={active.id.startsWith("draft-") ? "message" : "repo"} size={20} /></span><h3>{active.name}</h3><p>{active.id.startsWith("draft-") ? "Private conversation" : "Project room"}</p><div className="details-divider" /><span className="eyebrow">PROJECT</span><span className="details-value">{project?.repo || "Atlas Labs"}</span><span className="eyebrow">MEMBERS</span><div className="details-people">{(project?.team || ["MC", "EB", "AO"]).slice(0, 4).map((initials) => {const person = people.find((candidate) => candidate.initials === initials);return <Avatar key={initials} initials={initials} name={person?.name || initials} color={person?.color || "mint"} size="sm" />;})}</div></>}
          <div className="details-footnote"><Icon name="lock" size={14} /> Visible to project members</div>
        </aside>
      </section>
    </>
  );
}
