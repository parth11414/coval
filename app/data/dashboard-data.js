export const people = [
  { id: "maya-chen", name: "Maya Chen", initials: "MC", role: "Staff Engineer", team: "Applied AI", location: "San Francisco", score: 94, commits: 1842, prs: 86, color: "mint", status: "Online" },
  { id: "evan-brooks", name: "Evan Brooks", initials: "EB", role: "Senior Engineer", team: "Applied AI", location: "New York", score: 91, commits: 1420, prs: 64, color: "blue", status: "Online" },
  { id: "amara-okafor", name: "Amara Okafor", initials: "AO", role: "ML Engineer", team: "Applied AI", location: "London", score: 88, commits: 1288, prs: 58, color: "peach", status: "Away" },
  { id: "priya-nair", name: "Priya Nair", initials: "PN", role: "Senior Frontend Engineer", team: "Dev Experience", location: "Toronto", score: 87, commits: 1106, prs: 52, color: "violet", status: "Online" },
  { id: "ben-carter", name: "Ben Carter", initials: "BC", role: "Platform Engineer", team: "Platform", location: "Seattle", score: 85, commits: 986, prs: 47, color: "blue", status: "Online" },
  { id: "jonah-reed", name: "Jonah Reed", initials: "JR", role: "Security Engineer", team: "Trust & Security", location: "Austin", score: 84, commits: 904, prs: 42, color: "lavender", status: "Away" },
  { id: "nina-patel", name: "Nina Patel", initials: "NP", role: "Product Engineer", team: "Dev Experience", location: "Vancouver", score: 82, commits: 820, prs: 39, color: "peach", status: "Online" },
  { id: "kai-tanaka", name: "Kai Tanaka", initials: "KT", role: "Infrastructure Engineer", team: "Platform", location: "Tokyo", score: 80, commits: 762, prs: 36, color: "mint", status: "Online" },
  { id: "tess-williams", name: "Tess Williams", initials: "TW", role: "Design Engineer", team: "Dev Experience", location: "Chicago", score: 79, commits: 718, prs: 34, color: "pink", status: "Away" },
  { id: "omar-haddad", name: "Omar Haddad", initials: "OH", role: "Site Reliability Engineer", team: "Platform", location: "Berlin", score: 78, commits: 694, prs: 32, color: "peach", status: "Online" },
  { id: "leo-martin", name: "Leo Martin", initials: "LM", role: "Backend Engineer", team: "Platform", location: "Denver", score: 76, commits: 655, prs: 29, color: "blue", status: "Online" },
  { id: "maya-chen-2", name: "Ravi Shah", initials: "RS", role: "Security Analyst", team: "Trust & Security", location: "Boston", score: 74, commits: 582, prs: 25, color: "violet", status: "Away" },
];

export const profileDetails = {
  "maya-chen": {
    handle: "mayacodes", bio: "Building search systems that feel a little more like thinking. Staff engineer by title, systems gardener by temperament.",
    yearsExperience: 8, solved: 684, bestStreak: 32, followers: 842, previousRole: "Senior Software Engineer", previousCompany: "Stripe", previousYears: "2020 — 2023",
    skills: [["Distributed systems", 96], ["TypeScript", 94], ["Search & retrieval", 92], ["Python", 89], ["Kubernetes", 82], ["Rust", 77]],
    languages: [["TypeScript", 34], ["Python", 29], ["Rust", 18], ["Go", 12], ["Other", 7]],
  },
  "evan-brooks": {
    handle: "evanbuilds", bio: "Making ranking systems measurable, explainable, and useful in the real world. Always happy to dig into a stubborn benchmark.",
    yearsExperience: 7, solved: 512, bestStreak: 24, followers: 614, previousRole: "Machine Learning Engineer", previousCompany: "Wayfair", previousYears: "2021 — 2024",
    skills: [["Search ranking", 96], ["Python", 94], ["Rust", 91], ["Evaluation systems", 89], ["Data analysis", 84], ["TypeScript", 76]],
    languages: [["Python", 39], ["Rust", 27], ["TypeScript", 16], ["SQL", 12], ["Other", 6]],
  },
  "amara-okafor": {
    handle: "amara-ml", bio: "Turning research ideas into dependable machine-learning systems, with a soft spot for better evaluation and long-tail quality.",
    yearsExperience: 6, solved: 438, bestStreak: 19, followers: 492, previousRole: "Research Engineer", previousCompany: "DeepMind", previousYears: "2021 — 2024",
    skills: [["Machine learning", 95], ["Python", 94], ["PyTorch", 92], ["Model evaluation", 89], ["Data pipelines", 84], ["Search relevance", 81]],
    languages: [["Python", 48], ["SQL", 19], ["Rust", 13], ["TypeScript", 12], ["Other", 8]],
  },
  "priya-nair": {
    handle: "priyanairdev", bio: "Building thoughtful interfaces and developer tools that make complex systems feel clear, fast, and welcoming.",
    yearsExperience: 7, solved: 392, bestStreak: 27, followers: 721, previousRole: "Frontend Engineer", previousCompany: "Shopify", previousYears: "2020 — 2023",
    skills: [["TypeScript", 96], ["React", 95], ["Accessibility", 93], ["Design systems", 91], ["CSS", 88], ["Testing", 84]],
    languages: [["TypeScript", 51], ["CSS", 18], ["JavaScript", 16], ["Python", 8], ["Other", 7]],
  },
  "ben-carter": {
    handle: "bencarterinfra", bio: "Building the reliable foundations teams can move quickly on: clear service ownership, useful observability, and calm deploys.",
    yearsExperience: 9, solved: 476, bestStreak: 41, followers: 538, previousRole: "Platform Engineer", previousCompany: "Twilio", previousYears: "2019 — 2023",
    skills: [["Kubernetes", 96], ["Go", 94], ["Cloud infrastructure", 92], ["Terraform", 90], ["Observability", 88], ["Distributed systems", 84]],
    languages: [["Go", 42], ["HCL", 21], ["Python", 17], ["TypeScript", 11], ["Other", 9]],
  },
  "jonah-reed": {
    handle: "jonahsec", bio: "Helping product teams ship safely through practical threat modeling, identity controls, and security that fits the workflow.",
    yearsExperience: 8, solved: 551, bestStreak: 29, followers: 463, previousRole: "Application Security Engineer", previousCompany: "Cloudflare", previousYears: "2020 — 2023",
    skills: [["Threat modeling", 96], ["Application security", 94], ["Rust", 90], ["Identity & access", 89], ["Policy systems", 86], ["Incident response", 82]],
    languages: [["Rust", 31], ["Go", 24], ["Python", 21], ["SQL", 14], ["Other", 10]],
  },
  "nina-patel": {
    handle: "ninapatel", bio: "Connecting product thinking and engineering craft to make everyday workflows feel effortless and genuinely useful.",
    yearsExperience: 5, solved: 318, bestStreak: 18, followers: 387, previousRole: "Software Engineer", previousCompany: "Notion", previousYears: "2022 — 2024",
    skills: [["Product engineering", 94], ["TypeScript", 92], ["React", 90], ["UX instrumentation", 86], ["SQL", 81], ["Testing", 79]],
    languages: [["TypeScript", 43], ["JavaScript", 23], ["SQL", 16], ["Python", 10], ["Other", 8]],
  },
  "kai-tanaka": {
    handle: "kaitinfra", bio: "Keeping infrastructure predictable at scale, from cluster automation to the networking details behind reliable services.",
    yearsExperience: 8, solved: 427, bestStreak: 36, followers: 419, previousRole: "Site Reliability Engineer", previousCompany: "Mercari", previousYears: "2020 — 2023",
    skills: [["Kubernetes", 96], ["Go", 93], ["Linux", 91], ["Networking", 89], ["Terraform", 87], ["Reliability", 85]],
    languages: [["Go", 38], ["HCL", 22], ["Python", 19], ["Shell", 13], ["Other", 8]],
  },
  "tess-williams": {
    handle: "tessmakes", bio: "Working at the boundary of design and code to make interfaces accessible, expressive, and easy to understand.",
    yearsExperience: 6, solved: 284, bestStreak: 21, followers: 506, previousRole: "Design Technologist", previousCompany: "Figma", previousYears: "2021 — 2024",
    skills: [["Interaction design", 96], ["TypeScript", 91], ["Accessibility", 90], ["CSS", 89], ["Prototyping", 88], ["React", 84]],
    languages: [["TypeScript", 37], ["CSS", 29], ["JavaScript", 21], ["Python", 7], ["Other", 6]],
  },
  "omar-haddad": {
    handle: "omarops", bio: "Making production systems observable and resilient, and helping teams turn incident learnings into durable improvements.",
    yearsExperience: 10, solved: 493, bestStreak: 45, followers: 572, previousRole: "Reliability Engineer", previousCompany: "Elastic", previousYears: "2018 — 2023",
    skills: [["Reliability engineering", 96], ["Go", 94], ["Kubernetes", 92], ["OpenTelemetry", 90], ["Incident response", 89], ["AWS", 85]],
    languages: [["Go", 39], ["Python", 22], ["Shell", 17], ["SQL", 13], ["Other", 9]],
  },
  "leo-martin": {
    handle: "leomartin-dev", bio: "Building backend services and event-driven systems with a focus on performance, clean interfaces, and operational clarity.",
    yearsExperience: 7, solved: 406, bestStreak: 25, followers: 441, previousRole: "Backend Engineer", previousCompany: "Datadog", previousYears: "2020 — 2023",
    skills: [["Go", 96], ["Distributed systems", 93], ["Kafka", 91], ["PostgreSQL", 88], ["API design", 86], ["Performance", 83]],
    languages: [["Go", 46], ["SQL", 22], ["Python", 14], ["TypeScript", 10], ["Other", 8]],
  },
  "maya-chen-2": {
    handle: "ravishahsec", bio: "Finding useful security signals in noisy systems and building audit trails teams can trust when the details matter.",
    yearsExperience: 5, solved: 347, bestStreak: 17, followers: 326, previousRole: "Security Engineer", previousCompany: "Okta", previousYears: "2022 — 2024",
    skills: [["Security analytics", 92], ["Python", 91], ["Threat detection", 89], ["Kafka", 84], ["SQL", 83], ["Audit systems", 81]],
    languages: [["Python", 38], ["SQL", 23], ["Go", 17], ["JavaScript", 12], ["Other", 10]],
  },
};

export const projects = [
  { id: "neural-search", repo: "alpha-labs/neural-search", name: "neural-search", description: "Hybrid vector + keyword retrieval with learned ranking for the next generation of product search.", status: "Shipping", stars: 284, updated: "12m ago", stack: ["Rust", "Python", "Qdrant", "PyTorch"], team: ["MC", "EB", "AO", "PN"] },
  { id: "agent-runtime", repo: "devmesh/agent-runtime", name: "agent-runtime", description: "A safe, observable execution sandbox for tool-using agents in production.", status: "Beta", stars: 321, updated: "2h ago", stack: ["TypeScript", "Rust", "Temporal", "Docker"], team: ["MC", "EB", "BC", "AO"] },
  { id: "vector-kernel", repo: "alpha-labs/vector-kernel", name: "vector-kernel", description: "SIMD-accelerated vector operations tuned for retrieval workloads at interactive latency.", status: "Active", stars: 98, updated: "3h ago", stack: ["Rust", "WASM", "Criterion", "SIMD"], team: ["EB", "MC", "JR", "NP"] },
  { id: "signal-board", repo: "atlas-labs/signal-board", name: "signal-board", description: "A real-time engineering health surface designed around signals, not vanity metrics.", status: "Shipping", stars: 76, updated: "4h ago", stack: ["TypeScript", "React", "D3", "Vite"], team: ["PN", "TW", "OH", "AO"] },
  { id: "infra-core", repo: "atlas-labs/infra-core", name: "infra-core", description: "Shared infrastructure modules for reliable, observable product services.", status: "Shipping", stars: 193, updated: "5h ago", stack: ["Go", "Kubernetes", "Terraform", "AWS"], team: ["BC", "KT", "LM", "MC"] },
  { id: "event-stream", repo: "byteforge/event-stream", name: "event-stream", description: "Typed event contracts and exactly-once-ish delivery patterns for internal services.", status: "Shipping", stars: 129, updated: "5h ago", stack: ["Go", "Kafka", "Protobuf"], team: ["LM", "NP", "BC", "KT"] },
  { id: "model-registry", repo: "alpha-labs/model-registry", name: "model-registry", description: "Versioned model artifacts, evaluations, and deployable lineage in one searchable catalog.", status: "Active", stars: 64, updated: "7h ago", stack: ["Python", "FastAPI", "PostgreSQL", "MLflow"], team: ["AO", "EB", "NP", "MC"] },
  { id: "dev-portal", repo: "atlas-labs/dev-portal", name: "dev-portal", description: "A clear front door for service ownership, platform tools, and developer workflows.", status: "Beta", stars: 112, updated: "8h ago", stack: ["React", "Next.js", "Backstage"], team: ["PN", "TW", "MC"] },
  { id: "trust-gateway", repo: "cyberstack/trust-gateway", name: "trust-gateway", description: "Policy-aware service-to-service identity enforcement with auditable decisions.", status: "Active", stars: 87, updated: "11h ago", stack: ["Rust", "OPA", "Envoy"], team: ["KT", "LM", "JR"] },
  { id: "observability", repo: "atlas-labs/observability", name: "observability", description: "Unified traces, metrics, and logs for fast incident detection across services.", status: "Shipping", stars: 147, updated: "12h ago", stack: ["OpenTelemetry", "Grafana", "ClickHouse"], team: ["BC", "OH", "KT"] },
  { id: "audit-stream", repo: "byteforge/audit-stream", name: "audit-stream", description: "Tamper-evident event capture and query for security-sensitive workflows.", status: "Beta", stars: 51, updated: "1d ago", stack: ["Kafka", "PostgreSQL", "SPIFFE"], team: ["JR", "RS", "OH"] },
  { id: "billing-engine", repo: "atlas-labs/billing-engine", name: "billing-engine", description: "Reliable metering and billing primitives for platform usage.", status: "Shipping", stars: 203, updated: "1d ago", stack: ["Go", "Redis", "PostgreSQL"], team: ["LM", "BC", "NP"] },
];

export const conversations = [
  { id: "neural-search", name: "neural-search", kind: "project", preview: "You: This feels like the right cutoff. Opening the rollout RFC now.", time: "10:36", unread: 2, color: "blue" },
  { id: "infra-core", name: "infra-core", kind: "project", preview: "You: Plan is clean. Smoke tests are queued.", time: "10:03", unread: 0, color: "mint" },
  { id: "priya-nair", name: "Priya Nair", kind: "person", preview: "You: The side-by-side query view is already much clearer. Can we review after lunch?", time: "Yesterday", unread: 1, color: "violet" },
  { id: "signal-board", name: "signal-board", kind: "project", preview: "You: That matches what we're hearing in onboarding. Pinning this.", time: "Yesterday", unread: 0, color: "mint" },
  { id: "jonah-reed", name: "Jonah Reed", kind: "person", preview: "You: Thanks, this captures the failure mode we saw in staging.", time: "Mon", unread: 0, color: "lavender" },
  { id: "platform-guild", name: "platform guild", kind: "project", preview: "You: I can review the policy boundary this afternoon.", time: "Mon", unread: 0, color: "peach" },
  { id: "evan-brooks", name: "Evan Brooks", kind: "person", preview: "The benchmark results are ready to review.", time: "09:48", unread: 0, color: "blue" },
  { id: "amara-okafor", name: "Amara Okafor", kind: "person", preview: "I added the long-tail retrieval cases.", time: "09:32", unread: 1, color: "peach" },
  { id: "ben-carter", name: "Ben Carter", kind: "person", preview: "The staging rollout is healthy in all regions.", time: "09:14", unread: 0, color: "blue" },
  { id: "nina-patel", name: "Nina Patel", kind: "person", preview: "The onboarding flow is ready for feedback.", time: "Yesterday", unread: 0, color: "peach" },
  { id: "kai-tanaka", name: "Kai Tanaka", kind: "person", preview: "Policy checks are passing in the latest build.", time: "Yesterday", unread: 0, color: "mint" },
  { id: "tess-williams", name: "Tess Williams", kind: "person", preview: "I shared the updated signal-board exploration.", time: "Yesterday", unread: 0, color: "pink" },
  { id: "omar-haddad", name: "Omar Haddad", kind: "person", preview: "The service health dashboard is looking good.", time: "Mon", unread: 0, color: "peach" },
  { id: "leo-martin", name: "Leo Martin", kind: "person", preview: "I pushed the event contract changes for review.", time: "Mon", unread: 0, color: "blue" },
  { id: "maya-chen-2", name: "Ravi Shah", kind: "person", preview: "I found one more edge case in the audit stream.", time: "Mon", unread: 0, color: "violet" },
];

export const initialMessages = {
  "neural-search": [
    { id: 1, from: "Evan", text: "The ranking eval is looking good. I pushed the latest numbers to the RFC.", time: "10:12" },
    { id: 2, from: "Maya", text: "Nice. Let's keep the rollout behind the 10% flag until we have another day of latency data.", time: "10:24", mine: true },
    { id: 3, from: "Evan", text: "This feels like the right cutoff. Opening the rollout RFC now.", time: "10:36", mine: true },
  ],
  "infra-core": [
    { id: 1, from: "Ben", text: "Plan is clean. Smoke tests are queued.", time: "10:03" },
    { id: 2, from: "Maya", text: "Great, I will take a look once the runner finishes.", time: "10:18", mine: true },
  ],
  "priya-nair": [
    { id: 1, from: "Priya", text: "I have a first pass on the relevance inspector flow.", time: "Yesterday" },
    { id: 2, from: "Maya", text: "The side-by-side query view is already much clearer. Can we review after lunch?", time: "Yesterday", mine: true },
  ],
  "signal-board": [
    { id: 1, from: "Tess", text: "That matches what we're hearing in onboarding. Pinning this.", time: "Yesterday" },
    { id: 2, from: "Maya", text: "Perfect. Let's use the new card hierarchy in the next build.", time: "Yesterday", mine: true },
  ],
  "jonah-reed": [
    { id: 1, from: "Jonah", text: "Thanks, this captures the failure mode we saw in staging.", time: "Mon" },
    { id: 2, from: "Maya", text: "I'll add the trace and update the incident note.", time: "Mon", mine: true },
  ],
  "platform-guild": [
    { id: 1, from: "Kai", text: "I can review the policy boundary this afternoon.", time: "Mon" },
    { id: 2, from: "Maya", text: "Thanks, I'll send the short proposal before then.", time: "Mon", mine: true },
  ],
  "evan-brooks": [
    { id: 1, from: "Evan Brooks", text: "The benchmark results are ready to review.", time: "09:48" },
  ],
  "amara-okafor": [
    { id: 1, from: "Amara Okafor", text: "I added the long-tail retrieval cases.", time: "09:32" },
  ],
  "ben-carter": [
    { id: 1, from: "Ben Carter", text: "The staging rollout is healthy in all regions.", time: "09:14" },
  ],
  "nina-patel": [
    { id: 1, from: "Nina Patel", text: "The onboarding flow is ready for feedback.", time: "Yesterday" },
  ],
  "kai-tanaka": [
    { id: 1, from: "Kai Tanaka", text: "Policy checks are passing in the latest build.", time: "Yesterday" },
  ],
  "tess-williams": [
    { id: 1, from: "Tess Williams", text: "I shared the updated signal-board exploration.", time: "Yesterday" },
  ],
  "omar-haddad": [
    { id: 1, from: "Omar Haddad", text: "The service health dashboard is looking good.", time: "Mon" },
  ],
  "leo-martin": [
    { id: 1, from: "Leo Martin", text: "I pushed the event contract changes for review.", time: "Mon" },
  ],
  "maya-chen-2": [
    { id: 1, from: "Ravi Shah", text: "I found one more edge case in the audit stream.", time: "Mon" },
  ],
};

export const activityItems = [
  { type: "MERGED", person: "Maya Chen", initials: "MC", action: "merged", subject: "perf: move ANN filter into prefetch stage", repo: "neural-search", time: "12m ago", color: "mint" },
  { type: "REVIEWED", person: "Evan Brooks", initials: "EB", action: "reviewed", subject: "feat: add tool-call trace sampling", repo: "agent-runtime", time: "48m ago", color: "blue" },
  { type: "DEPLOYED", person: "Amara Okafor", initials: "AO", action: "deployed", subject: "model-registry v0.8.2", repo: "model-registry", time: "2h ago", color: "peach" },
  { type: "OPENED", person: "Priya Nair", initials: "PN", action: "opened", subject: "ui: show query diffs in relevance inspector", repo: "signal-board", time: "3h ago", color: "violet" },
];

export const navItems = [
  { id: "overview", label: "Overview", icon: "grid", shortcut: "⌘1" },
  { id: "engineering", label: "People", icon: "users", count: "12" },
  { id: "projects", label: "Projects", icon: "folder", count: "12" },
  { id: "network", label: "Network", icon: "network" },
  { id: "activity", label: "Activity", icon: "activity" },
  { id: "chat", label: "Messages", icon: "message" },
];

export const teams = [
  { name: "Applied AI", count: "4 devs", color: "mint" },
  { name: "Platform", count: "4 devs", color: "blue" },
  { name: "Dev Experience", count: "2 devs", color: "violet" },
  { name: "Trust & Security", count: "2 devs", color: "peach" },
];

export const fmt = (number) => new Intl.NumberFormat("en-US").format(number);
