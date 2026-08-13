import { useId } from "react";
import styles from "./MentionsChart.module.css";

// A small hand-built line chart. Pulling in a whole charting library for one
// sparkline-style chart didn't seem worth the dependency weight.
export default function MentionsChart({ data, width = 560, height = 160 }) {
  const gradientId = useId();
  const padding = 24;
  const values = data.map((d) => d.count);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((d.count - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1].x},${height - padding} L${points[0].x},${height - padding} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={styles.svg}
      role="img"
      aria-label={`Cross-source mentions trending from ${values[0]} to ${values[values.length - 1]} over the last ${data.length} days`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Baseline grid lines */}
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={padding}
          x2={width - padding}
          y1={padding + t * (height - padding * 2)}
          y2={padding + t * (height - padding * 2)}
          className={styles.gridLine}
        />
      ))}

      <path d={areaPath} fill={`url(#${gradientId})`} />
      <path d={linePath} className={styles.line} fill="none" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === points.length - 1 ? 3.5 : 2.5} className={styles.point} />
      ))}

      <text x={padding} y={height - 4} className={styles.axisLabel}>
        {data[0].day}
      </text>
      <text x={width - padding} y={height - 4} textAnchor="end" className={styles.axisLabel}>
        {data[data.length - 1].day}
      </text>
    </svg>
  );
}
