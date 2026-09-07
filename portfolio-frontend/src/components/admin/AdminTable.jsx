import { Pencil, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

export default function AdminTable({
  title,
  addLabel = "Add New",
  addTo,
  columns,
  rows,
  onEdit,
  onDelete,
  isLoading,
  emptyMessage = "Nothing here yet.",
  editIcon: EditIcon = Pencil,
  editLabel = "Edit",
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-semibold">{title}</h1>
        {addTo && (
          <Button as={Link} to={addTo} variant="primary">
            <Plus size={16} /> {addLabel}
          </Button>
        )}
      </div>

      <Card className="overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            Loading…
          </div>
        ) : rows.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-dim dark:text-slate">
            {emptyMessage}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-void/10 dark:border-white/10">
                {columns.map((col) => (
                  <th
                    key={col.label}
                    className="text-left font-mono text-xs uppercase tracking-wide text-slate-dim dark:text-slate px-5 py-3"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-void/5 dark:border-white/5 last:border-0 hover:bg-void/[0.02] dark:hover:bg-white/[0.02]"
                >
                  {columns.map((col) => (
                    <td
                      key={col.label}
                      className="px-5 py-3.5 text-void dark:text-ink"
                    >
                      {col.render(row)}
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-slate-dim dark:text-slate hover:text-signal"
                          aria-label={editLabel}
                        >
                          <EditIcon size={15} />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="text-slate-dim dark:text-slate hover:text-red-400"
                          aria-label="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
