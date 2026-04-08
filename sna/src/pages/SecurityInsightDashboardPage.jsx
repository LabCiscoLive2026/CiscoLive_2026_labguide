import { Bar, Doughnut } from "react-chartjs-2";
import { useRef } from "react";
import AlarmingHosts from "../components/AlarmingHosts";
import DashboardWidget from "../components/DashboardWidget";
import { Dot } from "lucide-react";

const BG_PAGE = "var(--sna-bg)";
const BG_WIDGET = "var(--sna-surface)";
const BORDER_WIDGET = "var(--sna-border-strong)";

const BAR_LABELS = ["3/31", "4/1", "4/2", "4/3", "4/4", "4/5", "4/6"];
const BAR_TOTALS = [278, 151, 132, 132, 326, 164, 132];

const ALARM_STACK_META = [
  { label: ".CSE: Possible Remote Access Breach", color: "#94a3f8" },
  { label: "Packet Flood", color: "#f472b6" },
  { label: "Touched", color: "#a855f7" },
  { label: "ICMP Flood", color: "#e11d48" },
  { label: "High Concern Index", color: "#ea580c" },
  { label: "Suspect Long Flow", color: "#22d3ee" },
  { label: "Worm Activity", color: "#0d9488" },
  { label: "Data Exfiltration", color: "#ec4899" },
  { label: "Data Hoarding", color: "#6366f1" },
  { label: "High DDoS Source Index", color: "#22c55e" },
  { label: "Anomaly", color: "#312e81" },
  { label: "High Traffic", color: "#84cc16" },
];

/** Draw order: first dataset = bottom of stack, last = top (CSE cap). */
const ALARM_STACK_DRAW_ORDER = [
  "Worm Activity",
  "Suspect Long Flow",
  "High Concern Index",
  "ICMP Flood",
  "Packet Flood",
  "Touched",
  "High Traffic",
  "Data Exfiltration",
  "Data Hoarding",
  "High DDoS Source Index",
  "Anomaly",
  ".CSE: Possible Remote Access Breach",
];

function buildStackedBarData() {
  const worm = [78, 14, 10, 10, 155, 18, 10];
  const suspect = [7, 3, 3, 3, 5, 4, 3];
  const hc = [27, 5, 4, 4, 5, 5, 4];
  const icmp = [6, 4, 3, 3, 4, 4, 3];
  const packet = [2, 3, 3, 3, 4, 3, 3];
  const touched = [30, 3, 3, 3, 4, 3, 3];
  const ht = [6, 3, 2, 2, 4, 3, 2];
  const exfil = [3, 2, 2, 2, 4, 3, 2];
  const hoard = [4, 4, 3, 3, 4, 4, 3];
  const ddos = [4, 2, 2, 2, 3, 2, 2];
  const anomaly = [6, 3, 2, 2, 4, 3, 2];

  const partialByLabel = {
    "Worm Activity": worm,
    "Suspect Long Flow": suspect,
    "High Concern Index": hc,
    "ICMP Flood": icmp,
    "Packet Flood": packet,
    Touched: touched,
    "High Traffic": ht,
    "Data Exfiltration": exfil,
    "Data Hoarding": hoard,
    "High DDoS Source Index": ddos,
    Anomaly: anomaly,
  };

  const cseLabel = ".CSE: Possible Remote Access Breach";
  const cse = BAR_TOTALS.map((total, col) => {
    const sumRest = Object.values(partialByLabel).reduce(
      (s, arr) => s + arr[col],
      0,
    );
    return total - sumRest;
  });

  const rowByLabel = { ...partialByLabel, [cseLabel]: cse };
  const metaByLabel = new Map(ALARM_STACK_META.map((m) => [m.label, m]));

  const datasets = ALARM_STACK_DRAW_ORDER.map((label) => {
    const meta = metaByLabel.get(label);
    return {
      label: meta.label,
      data: rowByLabel[label],
      backgroundColor: meta.color,
      borderWidth: 0,
      borderRadius: 0,
      borderSkipped: false,
      maxBarThickness: 28,
      stack: "alarms",
    };
  });

  return { labels: BAR_LABELS, datasets };
}

const barTotalLabelsPlugin = {
  id: "barTotalLabels",
  afterDatasetsDraw(chart) {
    if (chart.config.type !== "bar") return;
    const lastIdx = chart.data.datasets.length - 1;
    const metaLast = chart.getDatasetMeta(lastIdx);
    if (!metaLast?.data?.length) return;

    const { ctx } = chart;
    ctx.save();
    ctx.font = "bold 12px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#f8fafc";
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    BAR_LABELS.forEach((_, i) => {
      const total = BAR_TOTALS[i];
      const el = metaLast.data[i];
      if (!el || el.skip) return;
      const { x, y } = el.getProps(["x", "y"], true);
      ctx.fillText(String(total), x, y - 6);
    });
    ctx.restore();
  },
};

const LEGEND_BORDER_COLOR = "#475569";

const legendBoxBorderPlugin = {
  id: "legendBoxBorder",
  afterDraw(chart) {
    if (chart.config.type !== "bar") return;
    const leg = chart.legend;
    if (
      !leg?.options?.display ||
      !leg.legendItems?.length ||
      !leg.width ||
      !leg.height
    ) {
      return;
    }
    const pad = 5;
    const x = leg.left - pad;
    const y = leg.top - pad;
    const w = leg.width + pad * 2;
    const h = leg.height + pad * 2;
    const { ctx } = chart;
    ctx.save();
    ctx.strokeStyle = LEGEND_BORDER_COLOR;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  },
};

const DONUT_WIDGET_BG = "#282c34";
const DONUT_SLICE_BORDER = "#1a1d23";

const DONUT_LABELS = [
  "Anomaly",
  ".CSE: Possible Remote Access Breach",
  "High Traffic",
  "High Concern Index",
  "Suspect Long Flow",
  "Data Hoarding",
];
const DONUT_DATA = [5, 63, 3, 15, 3, 11];
const DONUT_COLORS = [
  "#e65100",
  "#9fa8da",
  "#e91e63",
  "#f48fb1",
  "#9575cd",
  "#9ccc65",
];

const DONUT_OUTSIDE_LABELS = [
  { text: "Anomaly: 5" },
  { text: ".CSE: Possi…" },
  { text: "High Traf…" },
  { text: "High Con…" },
  { text: "Suspect Lon…" },
  { text: "Data Hoarding: 11" },
];

const donutOutsideLabelsPlugin = {
  id: "donutOutsideLabels",
  afterDraw(chart) {
    if (chart.config.type !== "doughnut") return;
    const meta = chart.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const { ctx, width: cw, height: ch } = chart;
    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.font = "11px system-ui, -apple-system, sans-serif";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#e2e8f0";

    meta.data.forEach((arc, i) => {
      if (arc.skip || i >= DONUT_OUTSIDE_LABELS.length) return;
      const start = arc.startAngle;
      const end = arc.endAngle;
      const mid = (start + end) / 2;
      const { x: cx, y: cy } = arc;
      const or = arc.outerRadius;
      const lineColor = DONUT_COLORS[i] ?? "#94a3b8";

      const ix = cx + Math.cos(mid) * or;
      const iy = cy + Math.sin(mid) * or;
      const midR = or + 12;
      const mx = cx + Math.cos(mid) * midR;
      const my = cy + Math.sin(mid) * midR;

      const rightSide = Math.cos(mid) >= 0;
      const outward = 14 * (rightSide ? 1 : -1);
      const bend = 8;
      const c1x = mx + -Math.sin(mid) * bend;
      const c1y = my + Math.cos(mid) * bend;
      const elbowX = mx + outward;
      let ty = my;
      ty = Math.min(Math.max(ty, 10), ch - 10);

      const { text } = DONUT_OUTSIDE_LABELS[i];
      const tw = ctx.measureText(text).width;
      const inset = 6;
      const textGap = 5;

      let tx;
      let joinX;
      if (rightSide) {
        ctx.textAlign = "left";
        tx = elbowX + textGap;
        tx = Math.max(inset, Math.min(tx, cw - inset - tw));
        joinX = tx - 3;
      } else {
        ctx.textAlign = "right";
        tx = elbowX - textGap;
        tx = Math.min(cw - inset, Math.max(tx, inset + tw));
        joinX = tx + 3;
      }

      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.quadraticCurveTo(c1x, c1y, joinX, ty);
      ctx.stroke();

      ctx.fillText(text, tx, ty);
    });
    ctx.restore();
  },
};

const hostRows = [
  { ip: "10.31.110.68", sub: "Catch All", category: "DH", catTone: "dh" },
  { ip: "10.32.110.69", sub: "Catch All", category: "CI", catTone: "ci" },
  { ip: "10.30.110.70", sub: "Catch All", category: "CI", catTone: "ci" },
  { ip: "10.30.132.73", sub: "Catch All", category: "CI", catTone: "ci" },
];

export default function SecurityInsightDashboardPage() {
  const barChartRef = useRef(null);
  const barData = buildStackedBarData();

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" },
    datasets: {
      bar: {
        categoryPercentage: 0.52,
        barPercentage: 1,
      },
    },
    layout: {
      padding: { top: 4, right: 4, left: 4, bottom: 10 },
    },
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          color: "#cbd5e1",
          boxWidth: 8,
          boxHeight: 8,
          padding: 10,
          font: { size: 9 },
          usePointStyle: true,
          pointStyle: "circle",
          sort: (a, b) => {
            const la = barData.datasets[a.datasetIndex]?.label ?? "";
            const lb = barData.datasets[b.datasetIndex]?.label ?? "";
            return (
              ALARM_STACK_META.findIndex((m) => m.label === la) -
              ALARM_STACK_META.findIndex((m) => m.label === lb)
            );
          },
        },
      },
      tooltip: {
        backgroundColor: BG_WIDGET,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: BORDER_WIDGET,
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: { color: "#334155", lineWidth: 1 },
        ticks: {
          color: "#94a3b8",
          maxRotation: 0,
          font: { size: 11 },
          padding: 12,
        },
        border: { color: BORDER_WIDGET },
      },
      y: {
        stacked: true,
        min: 0,
        max: 400,
        grid: { color: "#334155", tickLength: 0, drawBorder: false },
        ticks: {
          color: "#94a3b8",
          stepSize: 100,
          font: { size: 11 },
        },
        border: { display: false },
        title: {
          display: true,
          text: "Event Count",
          color: "#94a3b8",
          font: { size: 11 },
        },
      },
    },
  };

  const donutData = {
    labels: DONUT_LABELS,
    datasets: [
      {
        data: DONUT_DATA,
        backgroundColor: DONUT_COLORS,
        borderColor: DONUT_SLICE_BORDER,
        borderWidth: 2,
        hoverBorderColor: DONUT_SLICE_BORDER,
        hoverOffset: 4,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    radius: "68%",
    cutout: "38%",
    layout: {
      padding: { top: 26, bottom: 26, left: 32, right: 32 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: DONUT_WIDGET_BG,
        titleColor: "#f8fafc",
        bodyColor: "#cbd5e1",
        borderColor: "#475569",
        borderWidth: 1,
      },
    },
  };

  const setAllBarVisibility = (visible) => {
    const chart = barChartRef.current;
    if (!chart) return;
    chart.data.datasets.forEach((_, i) =>
      chart.setDatasetVisibility(i, visible),
    );
    chart.update();
  };

  return (
    <div
      className="mx-auto max-w-[1600px] text-sna-text"
      style={{ backgroundColor: BG_PAGE }}
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 px-1 pt-1 font-light">
        <h1 className="text-lg font-light leading-7 tracking-wide text-sna-text-2">
          Security Insight Dashboard{" "}
          <span className="text-sna-text-muted">|</span>{" "}
          <span className="text-base">Inside Hosts</span>
        </h1>
        <div
          className="flex rounded-md border text-sm"
          style={{ borderColor: BORDER_WIDGET, backgroundColor: BG_WIDGET }}
        >
          <button
            type="button"
            className="rounded bg-[#005eb8] px-4 py-1 text-white"
          >
            Alarms view
          </button>
          <button
            type="button"
            className="px-4 py-1 text-sna-text-2 hover:bg-sna-hover"
          >
            Alerts view
          </button>
        </div>
      </div>

      <AlarmingHosts />

      {/* Row 2 — three equal widgets */}
      <div className="grid grid-cols-1 gap-3 px-1 lg:grid-cols-3 lg:gap-3">
        <DashboardWidget title="Top Alarming Hosts">
          <div className="overflow-x-auto overflow-y-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="text-[10px] text-sna-text sm:text-xs border-b">
                <tr>
                  <th className="px-2 py-1.5 font-medium sm:px-3">Host</th>
                  <th className="px-2 py-1.5 font-medium sm:px-3">Category</th>
                </tr>
              </thead>
              <tbody>
                {hostRows.map((row) => (
                  <tr key={row.ip} className="border-t border-sna-border">
                    <td className="px-2 py-2 sm:px-3">
                      <div className="flex items-end font-light text-base text-blue-500 sm:text-[0.97rem]">
                        <span>{row.ip}</span>
                        <span className="text-white flex"><Dot /> <Dot /> <Dot /></span>
                      </div>
                      <div className="text-[10px] text-sna-text-muted sm:text-xs">
                        {row.sub}
                      </div>
                    </td>
                    <td className="px-2 py-2 sm:px-3">
                      <span
                        className={
                          row.catTone === "dh"
                            ? "rounded bg-red-900/50 px-2 py-0.5 text-xs text-red-200"
                            : "rounded bg-orange-900/50 px-2 py-0.5 text-xs text-orange-200"
                        }
                      >
                        {row.category}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardWidget>

        <DashboardWidget
          title="Alarms by Type"
          footer={
            <div className="flex justify-end gap-4 border-t border-sna-border px-3 py-2 text-xs">
              <button
                type="button"
                onClick={() => setAllBarVisibility(false)}
                className="text-[#3b82f6] hover:underline"
              >
                Deselect All
              </button>
              <button
                type="button"
                onClick={() => setAllBarVisibility(true)}
                className="text-[#3b82f6] hover:underline"
              >
                Select All
              </button>
            </div>
          }
        >
          <div className="mx-2 mb-1 mt-1 h-[320px] rounded border border-sna-border px-1 py-2">
            <Bar
              ref={barChartRef}
              data={barData}
              options={barOptions}
              plugins={[barTotalLabelsPlugin, legendBoxBorderPlugin]}
            />
          </div>
        </DashboardWidget>

        <DashboardWidget title="Today's Alarms">
          <div className="relative flex min-h-[300px] flex-1 items-center justify-center overflow-visible px-2 pb-4 pt-2">
            <div className="h-[300px] w-full max-w-[340px] shrink-0 sm:h-[320px] sm:max-w-[360px]">
              <Doughnut
                data={donutData}
                options={donutOptions}
                plugins={[donutOutsideLabelsPlugin]}
              />
            </div>
          </div>
        </DashboardWidget>
      </div>

      {/* Row 3 — two-thirds + one-third */}
      <div className="mt-3 grid grid-cols-1 gap-3 px-1 lg:grid-cols-3 lg:gap-3">
        <DashboardWidget title="Flow Collection Trend" className="lg:col-span-2">
          <div className="flex min-h-[260px] items-center justify-center px-4 py-6 text-sna-text-muted">
            <span className="text-sm italic">Flow collection data will appear here</span>
          </div>
        </DashboardWidget>

        <DashboardWidget title="Top Applications">
          <div className="flex min-h-[260px] items-center justify-center px-4 py-6 text-sna-text-muted">
            <span className="text-sm italic">Application data will appear here</span>
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
}
