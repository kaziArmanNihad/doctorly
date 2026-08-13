export default function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-[13px] font-[500] text-[#16241F]">
        {label}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-[12.5px] text-[#B3432D]">
          {error.message}
        </p>
      )}
    </div>
  );
}