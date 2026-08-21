export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 rounded-xl border border-[#DCE3DC] bg-white"
          />
        ))}
      </div>
      <div className="h-48 rounded-xl border border-[#DCE3DC] bg-white" />
      <div className="grid gap-6 md:grid-cols-5">
        <div className="h-64 rounded-xl border border-[#DCE3DC] bg-white md:col-span-3" />
        <div className="h-64 rounded-xl border border-[#DCE3DC] bg-white md:col-span-2" />
      </div>
    </div>
  );
}
