export function StatsCard({ title, value }) {
    return (
      <div className="rounded-lg bg-[#2C3333] p-4 border border-[#FAFAFA]">
        <p className="text-sm text-[#E7E7E7]">{title}</p>
        <p className="mt-2 text-2xl font-bold text-[#FAFAFA]">{value}</p>
      </div>
    )
  }
  