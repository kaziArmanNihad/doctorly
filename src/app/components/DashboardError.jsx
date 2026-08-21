export default function DashboardError() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-xl border border-[#DCE3DC] bg-white p-8 text-center">
        <div className="font-serif-display text-[19px] text-[#0F1F1B]">
          Dashboard unavailable
        </div>
        <p className="mt-2 text-[13.5px] text-[#4B564F]">
          Couldn&apos;t load doctors or patients. Check that the API is running
          and try again.
        </p>
      </div>
    </div>
  );
}
