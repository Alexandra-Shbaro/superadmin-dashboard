export function StatsCard({ title, value }) {
    return (
      <div className="rounded-lg bg-mediumGrey p-4 border border-softBlack/20">
        <p className="text-sm text-lightGrey">{title}</p>
        <p className="mt-2 text-2xl font-bold text-offWhite">{value}</p>
      </div>
    )
  }