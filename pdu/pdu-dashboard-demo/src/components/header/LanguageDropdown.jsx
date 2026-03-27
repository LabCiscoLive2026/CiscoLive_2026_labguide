export default function LanguageDropdown({ options, selected, onSelect }) {
  return (
    <div
      className="absolute right-0 top-full mt-1 min-w-[210px] rounded-xl border-4 border-white/90 bg-[#0a1220] text-gray-100 shadow-xl z-50 py-2"
      role="listbox"
      aria-label="Language options"
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="option"
          aria-selected={selected === opt.value}
          onClick={() => onSelect(opt.value)}
          className={`w-full text-left px-4 py-2 text-sm leading-none hover:bg-white/10 ${
            selected === opt.value ? 'bg-white/10 opacity-60' : ''
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
