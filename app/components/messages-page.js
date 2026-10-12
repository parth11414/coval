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
  const filteredThreads = useMemo(() => threads.filter((thread) => thread.name.toLowerCase().includes(query.trim().toLowerCase())), [query, threads]);

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
    const thread = { id, name: "New local conversation", kind: "person", preview: "Start a sample conversation", time: "Now", unread: 0, color: "mint" };
    setThreads((current) => [thread, ...current]);
    setMessageMap((current) => ({ ...current, [id]: [] }));
    selectThread(id);
    notify("Created a local demo conversation. Nothing was sent.");
  }

  function addLocalMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const now = new Intl.DateTimeFormat("en", { hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
    const message = { id: `${Date.now()}-${Math.random()}`, from: "Maya", text, time: now, mine: true };
    setMessageMap((current) => ({ ...current, [activeId]: [...(current[activeId] || []), message] }));
    setThreads((current) => current.map((thread) => thread.id === activeId ? { ...thread, preview: `You: ${text}`, time: "Now" } : thread));
    setDraft("");
    notify("Added to this local demo only. No message was sent.");
  }

  return <>
    <PageHeading title="Messages & project rooms." description="Sample conversations for exploring the workspace. Replies stay local to this page and are not sent." action={<button type="button" className="button button-secondary" onClick={createThread}><Icon name="plus" size={16} /> New local conversation</button>} />
    <section className={`chat-workspace${showList ? " mobile-list-open" : ""}${showDetails ? " details-open" : ""}`} aria-label="Sample conversations">
      <aside className="chat-sidebar">
        <div className="chat-sidebar-heading"><h2>Conversation index <span>{threads.length}</span></h2><button type="button" className="quiet-icon" aria-label="Start local conversation" onClick={createThread}><Icon name="plus" size={17} /></button></div>
        <label className="search-field chat-search"><Icon name="search" size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a conversation" aria-label="Search sample conversations" />{query && <button type="button" className="clear-search" aria-label="Clear search" onClick={() => setQuery("")}><Icon name="x" size={14} /></button>}</label>
        <div className="conversation-list">
          {filteredThreads.map((thread) => {
            const person = people.find((candidate) => candidate.name === thread.name || candidate.id === thread.id);
            return <button type="button" className={`conversation-item${thread.id === activeId ? " active" : ""}`} key={thread.id} onClick={() => selectThread(thread.id)} aria-current={thread.id === activeId ? "true" : undefined}>
              <span className="conversation-avatar">{person ? <Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /> : <span className="thread-icon"><Icon name={thread.id.startsWith("draft-") ? "message" : "repo"} size={16} /></span>}</span>
              <span className="conversation-copy"><span className="conversation-title">{thread.name}</span><span className="conversation-preview">{thread.preview}</span></span>
              <span className="conversation-meta"><time>{thread.time}</time>{thread.unread > 0 && <i className="unread-badge">{thread.unread}</i>}</span>
            </button>;
          })}
          {!filteredThreads.length && <p className="conversation-empty">No matching sample conversations.</p>}
        </div>
        <p className="local-note">Local demo · messages reset when you reload.</p>
      </aside>

      <section className="chat-main" aria-label={`Sample conversation with ${active.name}`}>
        <header className="chat-header">
          <button type="button" className="quiet-icon mobile-chat-back" aria-label="Show conversations" onClick={() => setShowList(true)}><Icon name="arrowRight" size={17} /></button>
          <span className="chat-header-avatar">{participant ? <Avatar initials={participant.initials} name={participant.name} color={participant.color} size="sm" /> : <span className="thread-icon"><Icon name={active.id.startsWith("draft-") ? "message" : "repo"} size={16} /></span>}</span>
          <div className="chat-header-copy"><h2>{active.name}</h2><span>{participant ? `${participant.role} · sample profile` : active.id.startsWith("draft-") ? "Local-only conversation" : `Sample project room · ${project?.repo || "Atlas Labs"}`}</span></div>
          <button type="button" className={`quiet-icon${showDetails ? " selected" : ""}`} aria-label="Toggle conversation references" aria-expanded={showDetails} onClick={() => setShowDetails((value) => !value)}><Icon name="info" size={17} /></button>
        </header>
        <div className="message-history" role="log" aria-live="polite" aria-relevant="additions">
          <div className="message-day-divider"><span>Sample conversation · local only</span></div>
          {messages.map((message) => <article key={message.id} className={`message-row${message.mine ? " message-mine" : ""}`}>
            {!message.mine && <Avatar initials={participant?.initials || message.from.slice(0, 2).toUpperCase()} name={message.from} color={participant?.color || "mint"} size="xs" />}
            <div className="message-content"><div className="message-sender">{message.mine ? "You" : message.from}<time>{message.time}</time></div><p className="message-bubble">{message.text}</p></div>
            {message.mine && <Avatar initials="MC" name="Maya Chen" color="mint" size="xs" />}
          </article>)}
          {!messages.length && <div className="message-empty"><strong>This sample conversation is empty.</strong><p>Add a local message below; it won’t be sent.</p></div>}
          <div ref={messageEndRef} />
        </div>
        <form className="message-composer" onSubmit={addLocalMessage}>
          <label className="composer-label" htmlFor="message-draft">Add a local demo message</label>
          <div className="composer-box"><textarea id="message-draft" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="This stays in the current page…" rows={2} /><div className="composer-actions"><span>Local only · Enter to add</span><button type="submit" className="send-button" disabled={!draft.trim()} aria-label="Add local message"><Icon name="arrowUpRight" size={16} /></button></div></div>
        </form>
      </section>

      <aside className="chat-details">
        <div className="details-heading"><h2>Related entries</h2><button type="button" className="quiet-icon mobile-details-close" aria-label="Close references" onClick={() => setShowDetails(false)}><Icon name="x" size={17} /></button></div>
        {participant ? <><button type="button" className="detail-person" onClick={() => { window.location.hash = `profile/${participant.id}`; }}><Avatar initials={participant.initials} name={participant.name} color={participant.color} size="lg" /><strong>{participant.name}</strong><span>{participant.role}</span><Icon name="arrowUpRight" size={14} /></button><p className="detail-caption">Sample profile · {participant.team}</p><div className="details-divider" /><h3>Shared project entries</h3><div className="shared-projects">{projects.filter((item) => item.team.includes(participant.initials)).slice(0, 4).map((item) => <button type="button" key={item.id} onClick={() => { window.location.hash = "projects"; }}><Icon name="repo" size={14} /><span>{item.name}</span><Icon name="arrowUpRight" size={12} /></button>)}</div></> : <><h3>{active.name}</h3><p>{active.id.startsWith("draft-") ? "New local demo conversation" : "Sample project room"}</p><div className="details-divider" /><h3>Project reference</h3><button type="button" className="cross-reference" onClick={() => { window.location.hash = "projects"; }}><Icon name="repo" size={14} /> {project?.repo || "Atlas Labs"}</button><div className="details-divider" /><h3>Sample members</h3><div className="details-people">{(project?.team || ["MC", "EB", "AO"]).slice(0, 4).map((initials) => { const person = people.find((candidate) => candidate.initials === initials); return person ? <button key={person.id} type="button" aria-label={`Open ${person.name}'s sample profile`} onClick={() => { window.location.hash = `profile/${person.id}`; }}><Avatar initials={person.initials} name={person.name} color={person.color} size="sm" /></button> : null; })}</div></>}
        <p className="local-note">Example messages are not private or delivered; they are sample content in this demo.</p>
      </aside>
    </section>
  </>;
}
