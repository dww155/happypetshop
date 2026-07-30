"use client";

import { useState } from "react";
import { useProfile } from "./hooks/useProfile";
import ProfileHeader from "./components/ProfileHeader";
import AddressList from "./components/AddressList";
import InvoiceHistory from "./components/InvoiceHistory";
import OverviewTab from "./components/overview";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "addresses" | "invoices">("overview");
  const { user, loading } = useProfile();

  if (loading) {
    return (
      <div className="pet-page min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-[#6d5a49]">Đang tải...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="pet-page min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-[#6d5a49]">Vui lòng đăng nhập để xem hồ sơ.</p>
      </div>
    );
  }

  return (
    <div className="pet-page min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#3d2b1f]">Hồ sơ của bạn</h1>
          <p className="text-[#6d5a49] mt-2">Quản lý thông tin cá nhân, địa chỉ và lịch sử đơn hàng</p>
        </div>

        <ProfileHeader />

        <div className="mt-8 border-b border-[#d8c1ab]">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "overview"
                  ? "text-[#9f5f36] border-[#9f5f36]"
                  : "text-[#6d5a49] border-transparent hover:text-[#3d2b1f]"
              }`}
              aria-selected={activeTab === "overview"}
            >
              Tổng quan
            </button>
            {/* <button
              onClick={() => setActiveTab("addresses")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "addresses"
                  ? "text-[#9f5f36] border-[#9f5f36]"
                  : "text-[#6d5a49] border-transparent hover:text-[#3d2b1f]"
              }`}
              aria-selected={activeTab === "addresses"}
            >
              Địa chỉ
            </button>
            <button
              onClick={() => setActiveTab("invoices")}
              className={`py-4 px-2 font-semibold transition border-b-2 ${
                activeTab === "invoices"
                  ? "text-[#9f5f36] border-[#9f5f36]"
                  : "text-[#6d5a49] border-transparent hover:text-[#3d2b1f]"
              }`}
              aria-selected={activeTab === "invoices"}
            >
              Hóa đơn
            </button> */}
          </div>
        </div>

        <div className="mt-8">
          {activeTab === "overview" && (
            <OverviewTab />
          )}

          {activeTab === "addresses" && <AddressList />}

          {activeTab === "invoices" && <InvoiceHistory />}
        </div>
      </div>
    </div>
  );
}
