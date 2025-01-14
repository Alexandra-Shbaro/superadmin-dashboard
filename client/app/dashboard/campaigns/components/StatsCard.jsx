export function StatsCard({ title, value }) {
    return (
      <div className="rounded-lg bg-offWhite p-4 border border-softBlack/20">
        <p className="text-sm text-softBlack">{title}</p>
        <p className="mt-2 text-2xl font-bold text-gray-800">{value}</p>
      </div>
    )
  }