import { Link } from "react-router-dom";
import { Database, Radar, Bell, GitBranch, Cpu, HeartPulse } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import IntelligenceEventCard from "../../components/intelligence/IntelligenceEventCard.jsx";
import AlertCard from "../../components/alerts/AlertCard.jsx";
import ActivityFeed from "../../components/dashboard/ActivityFeed.jsx";
import MentionsChart from "../../components/dashboard/MentionsChart.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import {
  getDashboardMetrics,
  getIntelligenceEvents,
  getAlerts,
  getActivityFeed,
  getCrossSourceMentions,
  getDataSources,
} from "../../services/apiService.js";
import styles from "./Dashboard.module.css";

// One combined loader keeps this to a single loading/error state instead of
// juggling five separate useAsyncData calls with five separate spinners.
async function loadDashboard() {
  const [metrics, events, alerts, activity, mentions, sources] = await Promise.all([
    getDashboardMetrics(),
    getIntelligenceEvents(),
    getAlerts(),
    getActivityFeed(),
    getCrossSourceMentions(),
    getDataSources(),
  ]);
  return { metrics, events, alerts, activity, mentions, sources };
}

export default function Dashboard() {
  const { data, status, reload } = useAsyncData(loadDashboard, []);

  if (status === "loading") return <LoadingState label="Loading command center…" />;
  if (status === "error") return <ErrorState onRetry={reload} description="The dashboard service didn't respond." />;

  const { metrics, events, alerts, activity, mentions, sources } = data;
  const sourceById = Object.fromEntries(sources.map((s) => [s.id, s.name]));
  const recentEvents = [...events].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
  const activeAlerts = alerts.filter((a) => a.status !== "resolved").slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Live overview of monitored sources, intelligence events, and system health."
      />

      <div className={styles.metricsGrid}>
        <MetricCard label="Articles ingested (7d)" value={metrics.articlesIngested7d.toLocaleString()} icon={Radar} />
        <MetricCard
          label="Sources healthy"
          value={`${metrics.activeSources} / ${metrics.totalSources}`}
          icon={Database}
          tone={metrics.activeSources < metrics.totalSources ? "warn" : "good"}
        />
        <MetricCard label="Intelligence events" value={metrics.intelligenceEvents} icon={Radar} />
        <MetricCard
          label="Active alerts"
          value={metrics.activeAlerts}
          icon={Bell}
          tone={metrics.activeAlerts > 0 ? "critical" : "good"}
        />
        <MetricCard label="Correlations flagged" value={metrics.correlationsDetected} icon={GitBranch} />
        <MetricCard label="LLM analysis" value="Online" icon={Cpu} tone="good" />
      </div>

      <div className={styles.mainGrid}>
        <div>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Recent intelligence</span>
              <Link to="/intelligence" className={styles.panelLink}>
                View all
              </Link>
            </div>
            {recentEvents.length === 0 ? (
              <EmptyState title="No intelligence events" description="Nothing has been detected yet." />
            ) : (
              <div className={styles.eventList}>
                {recentEvents.map((event) => (
                  <IntelligenceEventCard key={event.id} event={event} sourceName={sourceById[event.sourceId]} compact />
                ))}
              </div>
            )}
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Cross-source mentions, last 14 days</span>
            </div>
            <MentionsChart data={mentions} />
          </div>
        </div>

        <div>
          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>Active alerts</span>
              <Link to="/alerts" className={styles.panelLink}>
                View all
              </Link>
            </div>
            {activeAlerts.length === 0 ? (
              <EmptyState icon={HeartPulse} title="No active alerts" description="Everything's quiet right now." />
            ) : (
              <div className={styles.alertList}>
                {activeAlerts.map((alert) => (
                  <AlertCard key={alert.id} alert={alert} />
                ))}
              </div>
            )}
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelTitle}>System activity</span>
            </div>
            <ActivityFeed items={activity} />
          </div>
        </div>
      </div>
    </div>
  );
}
