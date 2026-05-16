export default function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    APPLIED: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20",
    SANCTIONED: "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20",
    DISBURSED: "bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-600/20",
    CLOSED: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20",
    REJECTED: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}