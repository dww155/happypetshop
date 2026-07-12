"use client";

import {Check, Tags} from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  layout?: "sidebar" | "tabs";
}

export default function CategoryFilter({
  categories,
  selectedCategories,
  onCategoriesChange,
  layout = "sidebar",
}: CategoryFilterProps) {
  
  const handleToggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter((cat) => cat !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const handleClearAll = () => {
    onCategoriesChange([]);
  };

  if (layout === "tabs") {
    return (
      <div className="pet-card rounded-lg p-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleToggleCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#f7b267] focus:ring-offset-2 ${
                selectedCategories.includes(category)
                  ? "bg-[#9f5f36] text-white"
                  : "bg-[#f5eadc] text-[#4b3525] hover:bg-[#ecd7bd]"
              }`}
              aria-pressed={selectedCategories.includes(category)}
              aria-label={`Lọc theo danh mục ${category}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 text-xl font-bold text-[#3d2b1f]">
          <Tags className="h-5 w-5 text-[#9f5f36]" /> Danh mục
        </h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[#9f5f36] hover:text-[#6f4a2f] font-medium transition"
            aria-label="Xóa tất cả danh mục đã chọn"
          >
            Xóa
          </button>
        )}
      </div>
      <div className="flex flex-col gap-3">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          return (
            <label
              key={category}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[#f5eadc] transition"
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggleCategory(category)}
                className="w-5 h-5 accent-[#9f5f36] rounded focus:ring-2 focus:ring-[#f7b267] focus:ring-offset-2 cursor-pointer"
                aria-label={`Chọn danh mục ${category}`}
              />
              <span
                className={`font-medium transition ${
                  isSelected ? "text-[#9f5f36] font-semibold" : "text-[#3d2b1f]"
                }`}
              >
                {category}
              </span>
              {isSelected && (
                <span className="ml-auto grid h-6 w-6 place-items-center rounded-full bg-[#9f5f36] text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
