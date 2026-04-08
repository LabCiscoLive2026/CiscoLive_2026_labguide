import { Expand, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function DashboardWidget({
  title,
  children,
  className = "",
  footer,
  titleExtra,
  defaultCollapsed = false,
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <section
      className={`flex min-w-0 flex-col rounded border border-sna-border bg-sna-widget-surface ${collapsed ? "self-start" : ""} ${className}`}
    >
      <div className={`flex items-center justify-between px-3 py-2.5 ${collapsed ? "" : "border-b border-sna-border"}`}>
        <div className="flex items-center gap-1.5">
          <h2 className="text-base font-light leading-7 tracking-wide text-sna-text">{title}</h2>
          {titleExtra}
        </div>
        <div className="flex items-center gap-1 text-sna-text-muted">
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="rounded p-1 hover:bg-sna-hover hover:text-sna-text"
            aria-label={collapsed ? "Expand" : "Minimize"}
          >
            {collapsed ? (
              <Plus className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Minus className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
          {/* <button
            type="button"
            className="rounded p-1 hover:bg-sna-hover hover:text-sna-text"
            aria-label="Full screen"
          >
            <Expand className="h-4 w-4" strokeWidth={1.75} />
          </button> */}
        </div>
      </div>
      {!collapsed && (
        <>
          <div className="min-h-0 flex-1">{children}</div>
          {footer}
        </>
      )}
    </section>
  );
}
