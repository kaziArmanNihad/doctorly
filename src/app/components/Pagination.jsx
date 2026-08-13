import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  const start =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="flex items-center justify-between border-t border-[#E2E0D6] px-5 py-3.5">
      <span className="text-[12.5px] text-[#8A938D]">
        Showing {start}–{end} of {totalItems}
      </span>

      <div className="flex items-center gap-1">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={14} />
        </PaginationButton>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        ).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-7 w-7 items-center justify-center rounded-md text-[12.5px] transition-colors ${
              page === currentPage
                ? "bg-[#0F3D3A] text-[#F6F5F0]"
                : "text-[#5C6863] hover:bg-[#F6F5F0]"
            }`}
          >
            {page}
          </button>
        ))}

        <PaginationButton
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={14} />
        </PaginationButton>
      </div>
    </div>
  );
};

function PaginationButton({
  children,
  disabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex h-7 w-7 items-center justify-center rounded-md border border-[#DCE3DC] text-[#5C6863] transition-colors hover:bg-[#F6F5F0] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export default Pagination;