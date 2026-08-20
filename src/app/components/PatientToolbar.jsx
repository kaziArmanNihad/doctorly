import { Calendar, Search, SlidersHorizontal } from "lucide-react";

function PatientToolbar({
  search,
  condition,
  doctor,
  conditions,
  doctors,
  dateFrom,
  dateTo,
  hasFilters,
  onSearchChange,
  onConditionChange,
  onDoctorChange,
  onDateFromChange,
  onDateToChange,
  onReset,
}) {
  return (
    <div className="mb-5 rounded-xl border border-[#DCE3DC] bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A938D]"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name, condition, or doctor..."
            className="w-full rounded-md border border-[#DCE3DC] bg-white py-2.5 pl-10 pr-3 text-[14px] text-[#16241F] placeholder:text-[#A6AEA8] outline-none focus:border-[#0F3D3A] focus:ring-1 focus:ring-[#0F3D3A]"
          />
        </div>

        {/* Select filters */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={15}
            className="hidden text-[#8A938D] sm:block"
          />

          <FilterSelect
            value={condition}
            options={conditions}
            allLabel="All conditions"
            onChange={onConditionChange}
          />

          <FilterSelect
            value={doctor}
            options={doctors}
            allLabel="All doctors"
            onChange={onDoctorChange}
          />
        </div>

        {/* Date filters */}
        <div className="flex items-center gap-2">
          <Calendar size={15} className="hidden text-[#8A938D] sm:block" />

          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="rounded-md border border-[#DCE3DC] bg-white px-3 py-2.5 text-[13.5px] text-[#16241F] outline-none focus:border-[#0F3D3A]"
          />

          <span className="text-[13px] text-[#8A938D]">to</span>

          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="rounded-md border border-[#DCE3DC] bg-white px-3 py-2.5 text-[13.5px] text-[#16241F] outline-none focus:border-[#0F3D3A]"
          />
        </div>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="whitespace-nowrap text-[13px] font-[500] text-[#0F3D3A] hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

function FilterSelect({ value, options, allLabel, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-md border border-[#DCE3DC] bg-white px-3 py-2.5 text-[13.5px] text-[#16241F] outline-none focus:border-[#0F3D3A]"
    >
      {options.map((option) => (
        <option key={option.value ?? option} value={option.value ?? option}>
          {option.label ?? (option === "all" ? allLabel : option)}
        </option>
      ))}
    </select>
  );
}

export default PatientToolbar;
