"use client";

import type { CartItemResponse } from "../../../../types/cartTypes";

interface SelectAllBarProps {
  items: CartItemResponse[];
  selection: Record<string, boolean>;
  allSelected: boolean;
  onSelectAll: (selectAll: boolean) => void;
}

export default function SelectAllBar({
  items,
  selection,
  allSelected,
  onSelectAll,
}: SelectAllBarProps) {
  const isSelected = (item: CartItemResponse) => selection[item.id] ?? true;
  const selectedCount = items.filter((item) => isSelected(item)).length;
  const totalQuantity = items.reduce((sum, item) => sum + (isSelected(item) ? item.quantity : 0), 0);

  return (
    <div className="sticky top-20 pet-card rounded-lg px-4 py-3 flex items-center gap-4 z-10">
      {/* Select All Checkbox */}
      <input
        type="checkbox"
        checked={allSelected}
        onChange={(e) => onSelectAll(e.target.checked)}
        className="w-5 h-5 accent-[#9f5f36] rounded cursor-pointer focus:ring-2 focus:ring-[#f7b267]"
        aria-label="Chọn tất cả"
      />

      {/* Select All Label */}
      <label
        onClick={() => onSelectAll(!allSelected)}
        className="text-sm font-semibold text-[#4b3525] cursor-pointer hover:text-[#2f241c]"
      >
        Chọn tất cả ({items.length})
      </label>

      {/* Selection Summary */}
      {selectedCount > 0 && (
        <div className="ml-auto flex items-center gap-6">
          <span className="text-sm text-[#6d5a49]">
            Đã chọn: <span className="font-bold text-[#3d2b1f]">{selectedCount}</span> sản phẩm (
            <span className="font-bold text-[#3d2b1f]">{totalQuantity}</span> cái)
          </span>
        </div>
      )}
    </div>
  );
}
