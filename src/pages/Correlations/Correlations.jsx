import PageHeader from "../../components/layout/PageHeader.jsx";
import CorrelationCard from "../../components/correlations/CorrelationCard.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import { getCorrelations, getIntelligenceEvents, getDataSources } from "../../services/apiService.js";
import styles from "../Intelligence/Intelligence.module.css";

async function loadCorrelations() {
  const [correlations, events, sources] = await Promise.all([
    getCorrelations(),
    getIntelligenceEvents(),
    getDataSources(),
  ]);
  return { correlations, events, sources };
}

export default function Correlations() {
  const { data, status, reload } = useAsyncData(loadCorrelations, []);

  if (status === "loading") return <LoadingState label="Mapping correlations…" />;
  if (status === "error") return <ErrorState onRetry={reload} description="Couldn't reach the correlation engine." />;

  const { correlations, events, sources } = data;
  const eventById = Object.fromEntries(events.map((e) => [e.id, e]));
  const sourceById = Object.fromEntries(sources.map((s) => [s.id, s]));

  return (
    <div>
      <PageHeader title="Correlations" subtitle="Relationships and emerging patterns discovered between events." />

      {correlations.length === 0 ? (
        <EmptyState title="No correlations detected" description="The engine hasn't linked any events yet." />
      ) : (
        <div className={styles.grid}>
          {correlations.map((cor) => (
            <CorrelationCard
              key={cor.id}
              correlation={cor}
              eventTitles={cor.eventIds.map((id) => eventById[id]?.title).filter(Boolean)}
              sourceNames={cor.sourceIds.map((id) => sourceById[id]?.name).filter(Boolean)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
