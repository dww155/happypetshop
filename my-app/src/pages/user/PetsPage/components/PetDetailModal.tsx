"use client";

import type { PetResponse } from "../../../../types/petTypes";
import {X} from "lucide-react";

interface PetDetailModalProps {
  pet: PetResponse | null;
  isOpen: boolean;
  onClose: () => void;
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

export default function PetDetailModal({ pet, isOpen, onClose }: PetDetailModalProps) {
  if (!isOpen || !pet) return null;

  const available = pet.available !== false;

  return (
    <div
      className="fixed inset-0 bg-[#2f241c]/55 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-detail-title"
    >
      <div
        className="pet-card rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ead9c6]">
          <h2 id="pet-detail-title" className="text-xl font-bold text-[#3d2b1f]">
            Chi tiết thú cưng
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#8f7b6b] hover:text-[#4b3525] hover:bg-[#f5eadc] rounded-lg transition"
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <div className="mb-5">
            <div className="relative h-72 rounded-lg bg-[#f5eadc] overflow-hidden flex items-center justify-center">
              {pet.imageUrl ? (
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-8xl text-[#b9a38d]" aria-hidden>
                  🐕
                </span>
              )}
              <div
                className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  available ? "bg-[#dff3e8] text-[#23684d]" : "bg-[#eee3d6] text-[#806954]"
                }`}
              >
                {available ? "Còn hàng" : "Đã bán"}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-[#3d2b1f] mb-1">{pet.name ?? "—"}</h3>
              <p className="text-[#6d5a49]">
                {pet.species ?? "—"} · {pet.breed ?? "—"}
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-[#8f7b6b]">Giới tính</dt>
                <dd className="font-medium text-[#3d2b1f]">{pet.gender ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-[#8f7b6b]">Ngày sinh</dt>
                <dd className="font-medium text-[#3d2b1f]">{formatDate(pet.birth ?? "")}</dd>
              </div>
              <div>
                <dt className="text-[#8f7b6b]">Tiêm phòng</dt>
                <dd className="font-medium text-[#3d2b1f]">
                  {pet.vaccinated ? "✅ Đã tiêm phòng" : "⚠️ Chưa tiêm phòng"}
                </dd>
              </div>
              <div>
                <dt className="text-[#8f7b6b]">Tình trạng</dt>
                <dd className="font-medium text-[#3d2b1f]">
                  {available ? "Còn hàng" : "Đã bán"}
                </dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-[#ead9c6]">
              <p className="text-[#8f7b6b] text-sm mb-1">Giá</p>
              <p className="text-2xl font-black text-[#9f5f36]">
                {formatCurrency(pet.price ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
