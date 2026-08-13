import { Layers, Timer, Gauge } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import MetricCard from "../../components/ui/MetricCard.jsx";
import ServiceRow from "../../components/system/ServiceRow.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import { getSystemStatus } from "../../services/apiService.js";
import styles from "./SystemStatus.module.css";

export default function SystemStatus() {
  const { data: system, status, reload } = useAsyncData(getSystemStatus, []);

  if (status === "loading") return <LoadingState label="Polling system services…" />;
  if (status === "error") return <ErrorState onRetry={reload} description="Couldn't reach the status endpoint itself." />;

  const anyDegraded = system.services.some((s) => s.status !== "online");

  return (
    <div>
      <PageHeader
        title="System Status"
        subtitle="Operational state of collection, analysis, and delivery services."
      />

      <div className={styles.summaryGrid}>
        <MetricCard
          label="Overall health"
          value={anyDegraded ? "Degraded" : "All systems online"}
          icon={Gauge}
          tone={anyDegraded ? "warn" : "good"}
        />
        <MetricCard label="Events processed today" value={system.eventsProcessedToday.toLocaleString()} icon={Layers} />
        <MetricCard label="Current queue size" value={system.queueSize} icon={Timer} />
        <MetricCard label="Avg. processing latency" value={`${system.avgLatencyMs}ms`} icon={Timer} />
      </div>

      <div className={styles.servicesPanel}>
        <div className={styles.servicesPanelHeader}>
          <span>Service</span>
          <span>Status</span>
          <span>Uptime</span>
          <span>Latency</span>
          <span>Last poll</span>
        </div>
        {system.services.map((service) => (
          <ServiceRow key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
