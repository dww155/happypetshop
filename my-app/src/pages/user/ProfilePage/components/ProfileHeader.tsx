"use client";

import { useState, useEffect } from "react";
import { useProfile } from "../hooks/useProfile";
import {LogOut, Pencil, User} from "lucide-react";

// const DEFAULT_AVATAR =
//   "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop";

function displayName(firstName?: string, lastName?: string, username?: string): string {
  const parts = [firstName, lastName].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : (username ?? "Khách");
}

export default function ProfileHeader() {
  const { user, updateProfile, logout } = useProfile();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.user) {
      const u = user.user;
      setEditFirstName(u.firstName ?? "");
      setEditLastName(u.lastName ?? "");
      setEditEmail(u.email ?? "");
      setEditPhone(u.phone ?? "");
      setEditAddress(u.address ?? "");
    }
  }, [user]);

  if (!user) return null;

  const u = user.user;
  const name = displayName(u.firstName, u.lastName, u.username);
  const joinDate = u.createdAt ? new Date(u.createdAt).toLocaleDateString("vi-VN") : "—";

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(user.user.id, {
        firstName: editFirstName || undefined,
        lastName: editLastName || undefined,
        email: editEmail || undefined,
        phone: editPhone || undefined,
        address: editAddress || undefined,
      });
      setIsEditOpen(false);
      alert("Cập nhật hồ sơ thành công!");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Cập nhật thất bại");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="pet-card rounded-lg overflow-hidden">
      <div className="h-32 bg-[#6f4a2f]"></div>

      <div className="px-6 pb-6">
        <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6 relative z-10">
          <div className="flex flex-col items-center md:items-start">
            <div className="w-32 h-32 rounded-lg border-4 border-[#fffdf8] shadow-lg bg-[#f5eadc] flex items-center justify-center">
              <User className="w-16 h-16 text-[#9f5f36]" />
            </div>

            <p className="text-sm text-[#8f7b6b] mt-2">
              Thành viên từ {joinDate}
            </p>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-black text-[#3d2b1f] mb-2">{name}</h2>
            <div className="space-y-2 text-[#6d5a49]">
              <p className="flex items-center gap-2">
                <span>📧</span>
                {u.email ?? "—"}
              </p>
              <p className="flex items-center gap-2">
                <span>📱</span>
                {u.phone ?? "—"}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex-1 md:flex-none bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-[#f7b267] focus:ring-offset-2 inline-flex items-center justify-center gap-2"
            >
              <Pencil className="h-4 w-4" /> Chỉnh sửa hồ sơ
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 md:flex-none bg-[#a33b2b] hover:bg-[#7c2c20] text-white font-bold py-3 px-6 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 inline-flex items-center justify-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            {/* lớp làm mờ nền */}
            <div
                className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                onClick={() => setIsEditOpen(false)}
            />

            {/* modal */}
            <div className="relative pet-card rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-[#3d2b1f] mb-4">
                Chỉnh sửa hồ sơ
              </h3>

              <form onSubmit={handleEditSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#4b3525] mb-2">
                    Họ
                  </label>
                  <input
                      type="text"
                      value={editLastName}
                      onChange={(e) => setEditLastName(e.target.value)}
                      className="w-full px-4 py-2 border border-[#d8c1ab] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b267]"
                      placeholder="Nhập họ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4b3525] mb-2">
                    Tên
                  </label>
                  <input
                      type="text"
                      value={editFirstName}
                      onChange={(e) => setEditFirstName(e.target.value)}
                      className="w-full px-4 py-2 border border-[#d8c1ab] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b267]"
                      placeholder="Nhập tên"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4b3525] mb-2">
                    Email
                  </label>
                  <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-4 py-2 border border-[#d8c1ab] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b267]"
                      placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4b3525] mb-2">
                    Số điện thoại
                  </label>
                  <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-4 py-2 border border-[#d8c1ab] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b267]"
                      placeholder="Nhập số điện thoại"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4b3525] mb-2">
                    Địa chỉ
                  </label>
                  <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-[#d8c1ab] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7b267]"
                      placeholder="Nhập địa chỉ"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                  >
                    {saving ? "Đang lưu..." : "Lưu thay đổi"}
                  </button>

                  <button
                      type="button"
                      onClick={() => setIsEditOpen(false)}
                      disabled={saving}
                      className="flex-1 bg-[#ead9c6] hover:bg-[#d8c1ab] text-[#3d2b1f] font-bold py-2 px-4 rounded-lg transition disabled:opacity-50"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
      )}
    </div>
  );
}
