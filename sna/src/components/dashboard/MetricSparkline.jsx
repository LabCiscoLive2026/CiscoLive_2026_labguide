import { Line } from 'react-chartjs-2'

export default function MetricSparkline({ data, color, highlight }) {
  const c = highlight ? '#f472b6' : color ?? '#6b7784'
  const chartData = {
    labels: data.map((_, i) => i),
    datasets: [
      {
        data,
        borderColor: c,
        backgroundColor: highlight ? 'rgba(244,114,182,0.15)' : 'rgba(107,119,132,0.08)',
        borderWidth: 1.5,
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  }
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false }, min: 0 },
    },
    interaction: { mode: 'nearest', intersect: false },
  }

  return (
    <div className="h-10 w-full">
      <Line data={chartData} options={options} />
    </div>
  )
}
