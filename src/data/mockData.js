// Centralized mock data. Nothing in components or pages should hardcode
// intelligence events, sources, alerts, etc. — it all comes from here so
// swapping this out for real API responses later is a one-file change.

export const dataSources = [
  {
    id: "src-001",
    name: "Federal News Network",
    type: "News Wire",
    url: "https://federalnewsnetwork.example",
    status: "online",
    lastChecked: "2026-08-12T14:41:00Z",
    pollingInterval: "5 min",
    eventsDetected: 312,
  },
  {
    id: "src-002",
    name: "Ars Technica",
    type: "Tech Press",
    url: "https://arstechnica.example",
    status: "online",
    lastChecked: "2026-08-12T14:39:00Z",
    pollingInterval: "10 min",
    eventsDetected: 198,
  },
  {
    id: "src-003",
    name: "CNN",
    type: "Broadcast News",
    url: "https://cnn.example",
    status: "degraded",
    lastChecked: "2026-08-12T14:22:00Z",
    pollingInterval: "5 min",
    eventsDetected: 421,
  },
  {
    id: "src-004",
    name: "Reuters Wire",
    type: "News Wire",
    url: "https://reuters.example",
    status: "online",
    lastChecked: "2026-08-12T14:40:00Z",
    pollingInterval: "5 min",
    eventsDetected: 356,
  },
  {
    id: "src-005",
    name: "SEC EDGAR Filings",
    type: "Regulatory Feed",
    url: "https://sec.gov/edgar",
    status: "online",
    lastChecked: "2026-08-12T14:35:00Z",
    pollingInterval: "15 min",
    eventsDetected: 74,
  },
  {
    id: "src-006",
    name: "Regional Traffic Sensors",
    type: "Sensor Network",
    url: "internal://sensors/traffic",
    status: "offline",
    lastChecked: "2026-08-12T09:12:00Z",
    pollingInterval: "1 min",
    eventsDetected: 1204,
  },
];

export const intelligenceEvents = [
  {
    id: "evt-001",
    title: "Unusual filing volume detected ahead of earnings window",
    sourceId: "src-005",
    severity: "high",
    confidence: 0.87,
    timestamp: "2026-08-12T14:30:00Z",
    summary:
      "A cluster of Form 4 filings from three related entities was detected within a 40-minute window, preceding a scheduled earnings call.",
    status: "new",
    analysis:
      "The model flags this as a moderate-probability information-leakage pattern based on historical filing cadence for these entities. No single filing is individually anomalous, but the timing correlation is 2.3 standard deviations from baseline.",
    relatedEventIds: ["evt-004"],
    relatedSourceIds: ["src-005", "src-004"],
    tags: ["finance", "filings", "pattern-match"],
  },
  {
    id: "evt-002",
    title: "Coordinated messaging detected across three outlets",
    sourceId: "src-001",
    severity: "critical",
    confidence: 0.93,
    timestamp: "2026-08-12T13:55:00Z",
    summary:
      "Near-identical phrasing appeared in coverage of a policy announcement across outlets that do not typically share wire copy.",
    status: "investigating",
    analysis:
      "Text-similarity scoring places three articles at 91% phrase overlap outside of direct quotes, well above the 60% threshold typically explained by shared wire services.",
    relatedEventIds: ["evt-005"],
    relatedSourceIds: ["src-001", "src-003", "src-004"],
    tags: ["media", "narrative", "coordination"],
  },
  {
    id: "evt-003",
    title: "Server infrastructure change on monitored vendor domain",
    sourceId: "src-002",
    severity: "medium",
    confidence: 0.71,
    timestamp: "2026-08-12T12:10:00Z",
    summary:
      "DNS and hosting records for a monitored vendor shifted providers overnight without an accompanying public announcement.",
    status: "new",
    analysis:
      "Infrastructure moves of this kind precede public disclosures roughly 30% of the time in our historical sample. Confidence is moderate given the small reference set.",
    relatedEventIds: [],
    relatedSourceIds: ["src-002"],
    tags: ["infrastructure", "vendor-risk"],
  },
  {
    id: "evt-004",
    title: "Related entity added to filing cluster",
    sourceId: "src-005",
    severity: "high",
    confidence: 0.82,
    timestamp: "2026-08-12T14:05:00Z",
    summary: "A fourth related entity filed within the same window identified in evt-001.",
    status: "new",
    analysis: "Extends the pattern identified in the earlier event; confidence raised accordingly.",
    relatedEventIds: ["evt-001"],
    relatedSourceIds: ["src-005"],
    tags: ["finance", "filings"],
  },
  {
    id: "evt-005",
    title: "Follow-up coverage repeats disputed statistic",
    sourceId: "src-003",
    severity: "medium",
    confidence: 0.68,
    timestamp: "2026-08-12T15:02:00Z",
    summary: "A statistic flagged as disputed in evt-002 was repeated without qualification.",
    status: "new",
    analysis: "Downstream propagation of an unverified figure from the original coordinated-messaging cluster.",
    relatedEventIds: ["evt-002"],
    relatedSourceIds: ["src-003"],
    tags: ["media", "narrative"],
  },
  {
    id: "evt-006",
    title: "Routine sensor recalibration logged",
    sourceId: "src-006",
    severity: "low",
    confidence: 0.55,
    timestamp: "2026-08-12T09:02:00Z",
    summary: "Scheduled recalibration event logged before the sensor network went offline.",
    status: "resolved",
    analysis: "No further action indicated. Logged for completeness of the event timeline.",
    relatedEventIds: [],
    relatedSourceIds: ["src-006"],
    tags: ["sensors", "maintenance"],
  },
  {
    id: "evt-007",
    title: "Spike in cross-source mentions of regional logistics disruption",
    sourceId: "src-004",
    severity: "high",
    confidence: 0.79,
    timestamp: "2026-08-12T11:20:00Z",
    summary: "Mentions of a specific port facility rose sharply across four independent sources within two hours.",
    status: "investigating",
    analysis: "Cross-source mention velocity is the strongest early indicator in our model for physical-world disruption events.",
    relatedEventIds: [],
    relatedSourceIds: ["src-004", "src-001"],
    tags: ["logistics", "cross-source"],
  },
];

export const correlations = [
  {
    id: "cor-001",
    title: "Filing cluster → earnings-window pattern",
    eventIds: ["evt-001", "evt-004"],
    sourceIds: ["src-005", "src-004"],
    confidence: 0.85,
    detectedAt: "2026-08-12T14:32:00Z",
    explanation:
      "Two related filing events share entities, timing, and a common regulatory source. The model links them as a single emerging pattern rather than independent incidents.",
  },
  {
    id: "cor-002",
    title: "Coordinated messaging → statistic propagation",
    eventIds: ["evt-002", "evt-005"],
    sourceIds: ["src-001", "src-003", "src-004"],
    confidence: 0.76,
    detectedAt: "2026-08-12T15:04:00Z",
    explanation:
      "A disputed statistic introduced in the original coordinated-messaging cluster reappeared in follow-up coverage, suggesting the narrative is propagating downstream.",
  },
  {
    id: "cor-003",
    title: "Vendor infrastructure change (isolated)",
    eventIds: ["evt-003"],
    sourceIds: ["src-002"],
    confidence: 0.49,
    detectedAt: "2026-08-12T12:15:00Z",
    explanation: "No corroborating events yet. Flagged for continued monitoring rather than immediate action.",
  },
];

export const alerts = [
  {
    id: "alt-001",
    title: "Critical: coordinated narrative confidence exceeds threshold",
    severity: "critical",
    source: "Federal News Network",
    trigger: "Confidence score crossed 0.90 on evt-002",
    time: "2026-08-12T13:56:00Z",
    status: "unacknowledged",
  },
  {
    id: "alt-002",
    title: "High: filing cluster pattern extended",
    severity: "high",
    source: "SEC EDGAR Filings",
    trigger: "New related entity added to cor-001",
    time: "2026-08-12T14:06:00Z",
    status: "acknowledged",
  },
  {
    id: "alt-003",
    title: "High: cross-source mention spike",
    severity: "high",
    source: "Reuters Wire",
    trigger: "Mention velocity exceeded baseline by 4.1x",
    time: "2026-08-12T11:22:00Z",
    status: "unacknowledged",
  },
  {
    id: "alt-004",
    title: "Medium: vendor infrastructure change flagged",
    severity: "medium",
    source: "Ars Technica",
    trigger: "DNS/hosting change detected on monitored domain",
    time: "2026-08-12T12:11:00Z",
    status: "resolved",
  },
  {
    id: "alt-005",
    title: "Low: sensor network offline",
    severity: "low",
    source: "Regional Traffic Sensors",
    trigger: "No heartbeat received for 5 consecutive polls",
    time: "2026-08-12T09:15:00Z",
    status: "unacknowledged",
  },
];

export const systemStatus = {
  services: [
    { id: "svc-collection", name: "Data Collection", status: "online", uptime: "99.97%", latencyMs: 118, lastPoll: "2026-08-12T14:41:00Z" },
    { id: "svc-monitoring", name: "Source Monitoring", status: "online", uptime: "99.92%", latencyMs: 84, lastPoll: "2026-08-12T14:41:00Z" },
    { id: "svc-llm", name: "LLM Analysis", status: "online", uptime: "99.81%", latencyMs: 642, lastPoll: "2026-08-12T14:40:00Z" },
    { id: "svc-correlation", name: "Correlation Engine", status: "online", uptime: "99.88%", latencyMs: 210, lastPoll: "2026-08-12T14:40:00Z" },
    { id: "svc-alert", name: "Alert Engine", status: "online", uptime: "99.95%", latencyMs: 45, lastPoll: "2026-08-12T14:41:00Z" },
    { id: "svc-api", name: "API", status: "online", uptime: "99.99%", latencyMs: 32, lastPoll: "2026-08-12T14:41:00Z" },
    { id: "svc-db", name: "Database", status: "degraded", uptime: "98.60%", latencyMs: 890, lastPoll: "2026-08-12T14:38:00Z" },
  ],
  eventsProcessedToday: 1847,
  queueSize: 23,
  avgLatencyMs: 289,
};

export const userSettings = {
  profile: {
    name: "Analyst",
    email: "analyst@vanguard.local",
    role: "Senior Analyst",
  },
  notifications: {
    emailAlerts: true,
    criticalAlertsOnly: false,
    dailySummary: true,
  },
  monitoring: {
    pollingFrequencyMinutes: 5,
    minConfidenceThreshold: 0.6,
    alertSensitivity: "balanced",
  },
  appearance: {
    theme: "dark",
    density: "comfortable",
  },
};

export const dashboardMetrics = {
  articlesIngested7d: 742,
  activeSources: 5,
  totalSources: 6,
  intelligenceEvents: intelligenceEvents.length,
  activeAlerts: alerts.filter((a) => a.status === "unacknowledged").length,
  correlationsDetected: correlations.length,
};

export const activityFeed = [
  { id: "act-001", text: "LLM analysis completed for evt-007", time: "2026-08-12T14:41:00Z" },
  { id: "act-002", text: "Source poll succeeded: SEC EDGAR Filings", time: "2026-08-12T14:40:00Z" },
  { id: "act-003", text: "New intelligence event detected: evt-005", time: "2026-08-12T14:35:00Z" },
  { id: "act-004", text: "Correlation identified: cor-002", time: "2026-08-12T14:04:00Z" },
  { id: "act-005", text: "Alert generated: alt-003", time: "2026-08-12T11:22:00Z" },
  { id: "act-006", text: "Source poll failed: Regional Traffic Sensors", time: "2026-08-12T09:15:00Z" },
];

export const crossSourceMentions = [
  { day: "Aug 1", count: 38 },
  { day: "Aug 2", count: 42 },
  { day: "Aug 3", count: 40 },
  { day: "Aug 4", count: 51 },
  { day: "Aug 5", count: 47 },
  { day: "Aug 6", count: 55 },
  { day: "Aug 7", count: 58 },
  { day: "Aug 8", count: 62 },
  { day: "Aug 9", count: 59 },
  { day: "Aug 10", count: 66 },
  { day: "Aug 11", count: 70 },
  { day: "Aug 12", count: 74 },
];
