"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  // itemsPerPage,
  startIndex,
  endIndex,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalItems === 0) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="pet-surface rounded-lg p-6 mt-8">
      <div className="text-center mb-6">
        <p className="text-[#6d5a49] font-medium">
          Hiển thị{" "}
          <span className="font-bold text-[#9f5f36]">{startIndex + 1}</span> -{" "}
          <span className="font-bold text-[#9f5f36]">{Math.min(endIndex, totalItems)}</span> trong{" "}
          <span className="font-bold text-[#9f5f36]">{totalItems}</span> kết quả
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 border border-[#d8c1ab] rounded-lg hover:bg-[#f5eadc] disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-[#4b3525]"
          aria-label="Trang trước"
        >
          ← Trước
        </button>

        {pageNumbers.map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-2 py-2 text-[#8f7b6b]">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                disabled={page === currentPage}
                className={`px-4 py-2 rounded-lg transition font-medium ${
                  page === currentPage
                    ? "bg-[#9f5f36] text-white"
                    : "border border-[#d8c1ab] hover:bg-[#f5eadc] text-[#4b3525]"
                }`}
                aria-label={`Trang ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border border-[#d8c1ab] rounded-lg hover:bg-[#f5eadc] disabled:opacity-50 disabled:cursor-not-allowed transition font-medium text-[#4b3525]"
          aria-label="Trang sau"
        >
          Sau →
        </button>
      </div>
    </div>
  );
}
