"use client";

import type { PetResponse } from "../../../../types/petTypes";
import {Calendar, HeartPulse} from "lucide-react";

interface PetCardProps {
  pet: PetResponse;
  onClick?: () => void;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

function formatDate(s: string): string {
  if (!s) return "—";
  try {
    return new Date(s).toLocaleDateString("vi-VN");
  } catch {
    return s;
  }
}

export default function PetCard({ pet, onClick }: PetCardProps) {
  const available = pet.available !== false;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => (e.key === "Enter" || e.key === " ") && onClick() : undefined}
      className={`pet-card rounded-lg hover:shadow-xl transition duration-300 overflow-hidden h-full flex flex-col ${onClick ? "cursor-pointer hover:-translate-y-1" : ""}`}
    >
      <div className="relative h-64 bg-[#f5eadc] overflow-hidden flex items-center justify-center">
        {pet.imageUrl ? (
          <img
            src={pet.imageUrl}
            alt={pet.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl text-[#b9a38d]" aria-hidden>
            🐕
          </span>
        )}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold ${
            available ? "bg-[#dff3e8] text-[#23684d]" : "bg-[#eee3d6] text-[#806954]"
          }`}
        >
          {available ? "Còn hàng" : "Đã bán"}
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-[#3d2b1f] mb-2 line-clamp-1">
          {pet.name ?? "—"}
        </h3>
        <p className="text-sm text-[#6d5a49] mb-2">
          {pet.species ?? "—"} · {pet.breed ?? "—"}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[#7e6a58] mb-2">
          <Calendar className="h-3.5 w-3.5" /> Giới tính: {pet.gender ?? "—"} · Sinh: {formatDate(pet.birth ?? "")}
        </p>
        <p className="flex items-center gap-1.5 text-xs text-[#7e6a58] mb-3">
          <HeartPulse className="h-3.5 w-3.5" />
          {pet.vaccinated ? "✅ Đã tiêm phòng" : "⚠️ Chưa tiêm phòng"}
        </p>

        <div className="mt-auto pt-3 border-t border-[#ead9c6]">
          <span className="text-xl font-black text-[#9f5f36]">
            {formatCurrency(pet.price ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
