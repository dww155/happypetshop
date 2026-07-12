"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import PetCard from "./components/PetCard";
import PetDetailModal from "./components/PetDetailModal";
import Loader from "../../../components/ui/loader";
import { getAllPets } from "../../../services/petService";
import type { PetResponse } from "../../../types/petTypes";
import {Heart, Search, Sparkles} from "lucide-react";

export default function PetsPage() {
  const [pets, setPets] = useState<PetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedPet, setSelectedPet] = useState<PetResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllPets();
        setPets(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Lỗi từ server");
        } else {
          setError("Không thể tải danh sách thú cưng");
        }
        setPets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPets = useMemo(() => {
    if (!search.trim()) return pets;
    const q = search.toLowerCase().trim();
    return pets.filter(
      (p) =>
        (p.name ?? "").toLowerCase().includes(q) ||
        (p.species ?? "").toLowerCase().includes(q) ||
        (p.breed ?? "").toLowerCase().includes(q)
    );
  }, [pets, search]);

  return (
    <div className="pet-page min-h-screen font-body">
      {error && (
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 rounded-lg bg-[#6f4a2f] px-6 py-8 text-white shadow-xl shadow-[#6f4a2f]/15 md:px-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-semibold text-[#ffe2bd]">
            <Sparkles className="h-4 w-4" /> Những người bạn đang chờ nhà mới
          </div>
          <h1 className="text-3xl font-black mb-2 sm:text-4xl">
            Thú cưng
          </h1>
          <p className="text-[#f4ddc6] mb-6 max-w-2xl">
            Xem danh sách thú cưng đáng yêu đang có tại cửa hàng và chọn người bạn phù hợp với gia đình bạn.
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9f5f36]" />
            <input
              type="text"
              placeholder="Tìm theo tên, loài, giống..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pet-focus w-full rounded-lg border border-[#d8c1ab] bg-[#fffdf8] py-3 pl-10 pr-4 text-[#3d2b1f] placeholder:text-[#9a8676]"
            />
          </div>
        </div>

        <div className="mb-6">
          <p className="flex items-center gap-2 text-[#4b3525] text-lg">
            <Heart className="h-5 w-5 text-[#9f5f36]" />
            Hiển thị{" "}
            <span className="font-bold text-[#9f5f36]">{filteredPets.length}</span>{" "}
            thú cưng
          </p>
        </div>

        {filteredPets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filteredPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                onClick={() => setSelectedPet(pet)}
              />
            ))}
          </div>
        ) : (
          <div className="pet-surface rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🐕</div>
            <h2 className="text-2xl font-bold text-[#3d2b1f] mb-2">
              {search.trim()
                ? "Không tìm thấy thú cưng"
                : "Chưa có thú cưng nào"}
            </h2>
            <p className="text-[#6d5a49] mb-6">
              {search.trim()
                ? "Thử tìm kiếm với từ khóa khác."
                : "Vui lòng quay lại sau."}
            </p>
            {search.trim() && (
              <button
                onClick={() => setSearch("")}
                className="bg-[#9f5f36] hover:bg-[#7d4525] text-white font-semibold py-2 px-6 rounded-lg transition"
              >
                Xóa tìm kiếm
              </button>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <PetDetailModal
        pet={selectedPet}
        isOpen={!!selectedPet}
        onClose={() => setSelectedPet(null)}
      />
    </div>
  );
}
