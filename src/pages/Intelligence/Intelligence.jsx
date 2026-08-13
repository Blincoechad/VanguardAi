import { useMemo, useState } from "react";
import SeverityBadge from "../../components/ui/SeverityBadge.jsx";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import IntelligenceEventCard from "../../components/intelligence/IntelligenceEventCard.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import { getIntelligenceEvents, getDataSources } from "../../services/apiService.js";
import { formatDateTime, formatPercent, capitalize } from "../../utils/format.js";
import styles from "./Intelligence.module.css";

async function loadIntelligence() {
  const [events, sources] = await Promise.all([getIntelligenceEvents(), getDataSources()]);
  return { events, sources };
}

export default function Intelligence() {
  const { data, status, reload } = useAsyncData(loadIntelligence, []);
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const events = data?.events ?? [];
  const sources = data?.sources ?? [];
  const sourceById = Object.fromEntries(sources.map((s) => [s.id, s.name]));

  const filtered = useMemo(() => {
    return events
      .filter((e) => severity === "all" || e.severity === severity)
      .filter((e) => sourceFilter === "all" || e.sourceId === sourceFilter)
      .filter((e) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return e.title.toLowerCase().includes(q) || e.summary.toLowerCase().includes(q) || e.tags.some((t) => t.includes(q));
      })
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [events, severity, sourceFilter, query]);

  const selected = filtered.find((e) => e.id === selectedId) ?? filtered[0] ?? null;

  if (status === "loading") return <LoadingState label="Loading intelligence events…" />;
  if (status === "error") return <ErrorState onRetry={reload} description="Couldn't reach the intelligence service." />;

  return (
    <div>
      <PageHeader title="Intelligence" subtitle="Detected events, AI analysis, and related activity." />

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search events, summaries, tags" />
        <FilterBar
          filters={[
            {
              key: "severity",
              label: "Severity",
              value: severity,
              onChange: setSeverity,
              options: [
                { value: "all", label: "All severities" },
                { value: "critical", label: "Critical" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ],
            },
            {
              key: "source",
              label: "Source",
              value: sourceFilter,
              onChange: setSourceFilter,
              options: [{ value: "all", label: "All sources" }, ...sources.map((s) => ({ value: s.id, label: s.name }))],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No matching events" description="Try a different search term or clear your filters." />
      ) : (
        <div className={styles.splitLayout}>
          <div className={styles.listColumn}>
            {filtered.map((event) => (
              <IntelligenceEventCard
                key={event.id}
                event={event}
                sourceName={sourceById[event.sourceId]}
                onClick={(e) => setSelectedId(e.id)}
                compact
              />
            ))}
          </div>

          {selected && (
            <div className={styles.detailPanel}>
              <div className={styles.detailHeader}>
                <SeverityBadge severity={selected.severity} />
                <span className="mono">{formatDateTime(selected.timestamp)}</span>
              </div>
              <h2 className={styles.detailTitle}>{selected.title}</h2>

              <dl className={styles.metaGrid}>
                <div className={styles.metaItem}>
                  <dt>Source</dt>
                  <dd>{sourceById[selected.sourceId]}</dd>
                </div>
                <div className={styles.metaItem}>
                  <dt>Confidence</dt>
                  <dd>{formatPercent(selected.confidence)}</dd>
                </div>
                <div className={styles.metaItem}>
                  <dt>Status</dt>
                  <dd>{capitalize(selected.status)}</dd>
                </div>
              </dl>

              <div className={styles.detailSection}>
                <div className={styles.detailSectionLabel}>Summary</div>
                <p className={styles.detailText}>{selected.summary}</p>
              </div>

              <div className={styles.detailSection}>
                <div className={styles.detailSectionLabel}>AI analysis</div>
                <p className={styles.detailText}>{selected.analysis}</p>
              </div>

              {selected.relatedEventIds.length > 0 && (
                <div className={styles.detailSection}>
                  <div className={styles.detailSectionLabel}>Related events</div>
                  <p className={styles.detailText}>
                    {selected.relatedEventIds
                      .map((id) => events.find((e) => e.id === id)?.title)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              )}

              <div className={styles.detailSection}>
                <div className={styles.detailSectionLabel}>Tags</div>
                <div className={styles.tagList}>
                  {selected.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
