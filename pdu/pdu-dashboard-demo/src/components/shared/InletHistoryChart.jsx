import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler)

const POWER_VALUE = 5040
const JITTER = 12

function generateTimeLabels() {
  const labels = []
  const start = new Date(2026, 0, 1, 15, 40, 0)
  const end = new Date(2026, 0, 1, 17, 30, 0)
  for (let t = new Date(start); t <= end; t.setMinutes(t.getMinutes() + 5)) {
    labels.push(
      t.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
    )
  }
  return labels
}

function generateData(labels) {
  let val = POWER_VALUE
  return labels.map(() => {
    val += (Math.random() - 0.5) * JITTER
    return Math.round(Math.max(POWER_VALUE - JITTER * 2, Math.min(POWER_VALUE + JITTER * 2, val)))
  })
}

const labels = generateTimeLabels()
const dataPoints = generateData(labels)

const data = {
  labels,
  datasets: [
    {
      data: dataPoints,
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.12)',
      borderWidth: 2,
      pointRadius: 0,
      pointHitRadius: 6,
      tension: 0.3,
      fill: true,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.parsed.y.toLocaleString()} W`,
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#8899aa',
        maxRotation: 45,
        minRotation: 45,
        font: { size: 10 },
      },
      grid: { display: false },
      border: { display: false },
    },
    y: {
      min: 0,
      max: 6000,
      ticks: {
        stepSize: 1000,
        color: '#8899aa',
        font: { size: 11 },
        callback: (v) => `${v.toLocaleString()} W`,
      },
      grid: { display: false },
      border: { display: false },
    },
  },
}

export default function InletHistoryChart() {
  return (
    <div style={{ background: '#0d1b2a', padding: '12px 8px 4px', width: '100%', height: '320px' }}>
      <Line data={data} options={options} />
    </div>
  )
}
