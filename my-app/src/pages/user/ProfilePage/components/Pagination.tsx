interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

const PaginationControls = ({ current, total, onChange }: PaginationProps) => {
  if (total <= 1) return null;
  
  return (
    <div className="flex items-center gap-2 flex-wrap justify-center mt-6">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="px-4 py-2 rounded-lg bg-[#ead9c6] hover:bg-[#d8c1ab] text-[#3d2b1f] disabled:opacity-50 transition"
      >
        ← Trước
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            current === page ? "bg-[#9f5f36] text-white" : "bg-[#ead9c6] hover:bg-[#d8c1ab] text-[#3d2b1f]"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="px-4 py-2 rounded-lg bg-[#ead9c6] hover:bg-[#d8c1ab] text-[#3d2b1f] disabled:opacity-50 transition"
      >
        Sau →
      </button>
    </div>
  );
};

export default PaginationControls;
