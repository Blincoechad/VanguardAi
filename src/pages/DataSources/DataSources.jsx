import { useMemo, useState } from "react";
import PageHeader from "../../components/layout/PageHeader.jsx";
import SearchBar from "../../components/ui/SearchBar.jsx";
import FilterBar from "../../components/ui/FilterBar.jsx";
import DataSourceCard from "../../components/sources/DataSourceCard.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import ErrorState from "../../components/ui/ErrorState.jsx";
import EmptyState from "../../components/ui/EmptyState.jsx";
import { useAsyncData } from "../../hooks/useAsyncData.js";
import { getDataSources } from "../../services/apiService.js";
import styles from "../Intelligence/Intelligence.module.css";

export default function DataSources() {
  const { data: sources, status, reload } = useAsyncData(getDataSources, []);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    if (!sources) return [];
    return sources
      .filter((s) => statusFilter === "all" || s.status === statusFilter)
      .filter((s) => !query.trim() || s.name.toLowerCase().includes(query.toLowerCase()) || s.type.toLowerCase().includes(query.toLowerCase()));
  }, [sources, statusFilter, query]);

  if (status === "loading") return <LoadingState label="Checking data sources…" />;
  if (status === "error") return <ErrorState onRetry={reload} description="Couldn't reach the source monitor." />;

  return (
    <div>
      <PageHeader title="Data Sources" subtitle="Monitored feeds and their current collection status." />

      <div className={styles.toolbar}>
        <SearchBar value={query} onChange={setQuery} placeholder="Search sources by name or type" />
        <FilterBar
          filters={[
            {
              key: "status",
              label: "Status",
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { value: "all", label: "All statuses" },
                { value: "online", label: "Online" },
                { value: "degraded", label: "Degraded" },
                { value: "offline", label: "Offline" },
              ],
            },
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No sources found" description="Try clearing your filters or search." />
      ) : (
        <div className={styles.grid}>
          {filtered.map((source) => (
            <DataSourceCard key={source.id} source={source} />
          ))}
        </div>
      )}
    </div>
  );
}
