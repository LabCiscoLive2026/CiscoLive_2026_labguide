import { Info } from "lucide-react";
import DashboardWidget from "./DashboardWidget";

const CATEGORIES = [
  { label: "Concern Index", count: 14, kind: "red" },
  { label: "Target Index", count: 0, kind: "flat" },
  { label: "Recon", count: 0, kind: "flat" },
  { label: "C&C", count: 0, kind: "flat" },
  { label: "Exploitation", count: 0, kind: "flat" },
  { label: "DDoS Source", count: 0, kind: "gray" },
  { label: "DDoS Target", count: 0, kind: "flat" },
  { label: "Data Hoarding", count: 2, kind: "orange" },
  { label: "Exfiltration", count: 0, kind: "gray2" },
  { label: "Policy Violation", count: 0, kind: "flat" },
  { label: "Anomaly", count: 1, kind: "orange2" },
];

const SPARK = {
  flat: {
    path: "M0,48 L90,48",
    stroke: "#4c5260",
    fill: null,
  },
  red: {
    path: "M0,44 L8,41 L16,35 L24,30 L32,27 L40,33 L48,37 L56,41 L66,43 L76,44 L84,42 L90,43",
    stroke: "#f06675",
    fill: "M0,44 L8,41 L16,35 L24,30 L32,27 L40,33 L48,37 L56,41 L66,43 L76,44 L84,42 L90,43 L90,50 L0,50 Z",
    fillColor: "#ef6574",
  },
  gray: {
    path: "M0,48 L8,48 L14,26 L22,26 L30,27 L36,45 L44,45 L53,45 L60,44 L68,24 L76,24 L83,38 L90,45",
    stroke: "#8b92a0",
    fill: "M0,48 L8,48 L14,26 L22,26 L30,27 L36,45 L44,45 L53,45 L60,44 L68,24 L76,24 L83,38 L90,45 L90,50 L0,50 Z",
    fillColor: "#848c9d",
  },
  gray2: {
    path: "M0,48 L10,48 L16,32 L25,34 L34,36 L41,46 L49,46 L58,46 L65,24 L73,24 L81,25 L86,40 L90,45",
    stroke: "#8b92a0",
    fill: "M0,48 L10,48 L16,32 L25,34 L34,36 L41,46 L49,46 L58,46 L65,24 L73,24 L81,25 L86,40 L90,45 L90,50 L0,50 Z",
    fillColor: "#848c9d",
  },
  orange: {
    path: "M0,46 L8,41 L15,26 L24,20 L33,14 L41,29 L49,37 L57,44 L64,45 L72,40 L80,35 L86,20 L90,42",
    stroke: "#eb8842",
    fill: "M0,46 L8,41 L15,26 L24,20 L33,14 L41,29 L49,37 L57,44 L64,45 L72,40 L80,35 L86,20 L90,42 L90,50 L0,50 Z",
    fillColor: "#eb8842",
  },
  orange2: {
    path: "M0,46 L8,45 L15,39 L24,36 L33,33 L41,45 L49,45 L58,45 L65,30 L73,22 L80,16 L86,20 L90,40",
    stroke: "#eb8842",
    fill: "M0,46 L8,45 L15,39 L24,36 L33,33 L41,45 L49,45 L58,45 L65,30 L73,22 L80,16 L86,20 L90,40 L90,50 L0,50 Z",
    fillColor: "#eb8842",
  },
};

const INFO_TEXT =
  "The number in this alarming host widget displays the number of hosts receiving alarms since the last reset hour. The trend chart at the bottom displays the number of hosts receiving alarms contributing to this category within the last seven days.";

function Sparkline({ kind }) {
  const s = SPARK[kind] || SPARK.flat;

  return (
    <svg viewBox="0 0 90 50" preserveAspectRatio="none" className="block h-10 w-full">
      {s.fill ? <path d={s.fill} fill={s.fillColor} opacity="0.95" /> : null}
      <path d={s.path} fill="none" stroke={s.stroke} strokeWidth="1.35" strokeLinecap="round" />
    </svg>
  );
}

const infoIcon = (
  <span className="group relative inline-flex text-sna-text-muted" tabIndex={0}>
    <Info className="h-4 w-4" strokeWidth={1.5} />
    <span className="pointer-events-none absolute left-6 top-1/2 z-50 w-96 -translate-y-1/2 rounded border border-sna-border bg-sna-surface px-3 py-2 text-xs font-normal leading-relaxed text-sna-text-2 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100">
      {INFO_TEXT}
    </span>
  </span>
);

export default function AlarmingHosts() {
  return (
    <DashboardWidget title="Alarming Hosts" titleExtra={infoIcon} className="mb-3 mx-1">
      <div className="grid grid-cols-[repeat(11,minmax(86px,1fr))] overflow-x-auto px-2.5 pb-2.5 pt-2">
        {CATEGORIES.map((item) => (
          <div key={item.label} className="min-w-[86px] text-center">
            <span className="block text-xs leading-tight text-sna-text-2">{item.label}</span>
            <span className="mt-0.5 mb-0.5 block text-xs text-sna-text-2">{item.count}</span>
            <div className="h-[42px] border-x border-sna-graph-border px-0.5">
              <Sparkline kind={item.kind} />
            </div>
          </div>
        ))}
      </div>
    </DashboardWidget>
  );
}