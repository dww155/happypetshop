export default function OverviewTab() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="pet-card rounded-lg p-6">
          <h3 className="text-lg font-bold text-[#3d2b1f] mb-4">Thống kê nhanh</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[#6d5a49]">Tổng đơn hàng:</span>
              <span className="text-2xl font-black text-[#9f5f36]">12</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#6d5a49]">Đơn hàng đang chờ:</span>
              <span className="text-2xl font-black text-[#d47b35]">2</span>
            </div>
          </div>
        </div>
      </div>
    )
}
