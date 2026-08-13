// API service layer. Components call these functions and don't know or
// care that the data is coming from mockData.js right now — when there's a
// real backend, each function body becomes a fetch() call and every
// consumer keeps working unchanged.

import {
  dataSources,
  intelligenceEvents,
  correlations,
  alerts,
  systemStatus,
  userSettings,
  dashboardMetrics,
  activityFeed,
  crossSourceMentions,
} from "../data/mockData.js";

// Small helper to simulate network latency so loading states get exercised
// in the UI instead of resolving instantly every time.
const simulateNetwork = (data, ms = 400) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), ms));

export async function getDataSources() {
  return simulateNetwork(dataSources);
}

export async function getIntelligenceEvents() {
  return simulateNetwork(intelligenceEvents);
}

export async function getIntelligenceEvent(id) {
  const events = await simulateNetwork(intelligenceEvents, 200);
  return events.find((e) => e.id === id) ?? null;
}

export async function getAnalysisResults(eventId) {
  const event = await getIntelligenceEvent(eventId);
  return event ? { eventId, analysis: event.analysis, confidence: event.confidence } : null;
}

export async function getCorrelations() {
  return simulateNetwork(correlations);
}

export async function getAlerts() {
  return simulateNetwork(alerts);
}

export async function updateAlertStatus(alertId, status) {
  // In the mock world we just echo back what was asked for. A real
  // implementation would PATCH the backend and return its response.
  await simulateNetwork(null, 200);
  return { id: alertId, status };
}

export async function getSystemStatus() {
  return simulateNetwork(systemStatus);
}

export async function getUserSettings() {
  return simulateNetwork(userSettings);
}

export async function updateUserSettings(partialSettings) {
  await simulateNetwork(null, 250);
  return { ...userSettings, ...partialSettings };
}

export async function getDashboardMetrics() {
  return simulateNetwork(dashboardMetrics, 300);
}

export async function getActivityFeed() {
  return simulateNetwork(activityFeed, 300);
}

export async function getCrossSourceMentions() {
  return simulateNetwork(crossSourceMentions, 300);
}
