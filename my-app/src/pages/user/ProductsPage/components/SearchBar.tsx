"use client";

import { useEffect, useState } from "react";
import {Search, X} from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm sản phẩm..."
          className="pet-focus w-full rounded-lg border border-[#d8c1ab] bg-[#fffdf8] px-4 py-4 pl-12 text-[#3d2b1f] shadow-sm placeholder:text-[#9a8676] focus:border-[#c47c3d]"
          aria-label="Tìm kiếm sản phẩm"
        />
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9f5f36]" />
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#8f7b6b] hover:bg-[#f5eadc] hover:text-[#4b3525]"
            aria-label="Xóa tìm kiếm"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
