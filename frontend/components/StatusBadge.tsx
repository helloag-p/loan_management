export default function StatusBadge({

  status

}: {
  status: string
}) {

  const colors: any = {

    APPLIED:
      "bg-yellow-400",

    SANCTIONED:
      "bg-blue-500",

    DISBURSED:
      "bg-purple-500",

    CLOSED:
      "bg-green-500",

    REJECTED:
      "bg-red-500"
  }

  return (

    <span
      className={`px-3 py-1 rounded text-white ${colors[status]}`}
    >
      {status}
    </span>
  )
}