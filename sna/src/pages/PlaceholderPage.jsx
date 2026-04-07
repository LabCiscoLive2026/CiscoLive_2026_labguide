export default function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-2xl text-[#e6e8ea]">
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-[#9aa7b4]">
        Lab shell only — wire this view to real data when you are ready.
      </p>
    </div>
  )
}
