"use client";
import { useInvoiceHistory } from "../hooks/useInvoiceHistory";
import type { Invoice, SortOption } from "../hooks/useInvoiceHistory"; 
import Pagination from "./Pagination"; 
import StatusBadge from "./StatusBadge"; 

const mockInvoices: Invoice[] = [
  {
    id: "INV-2025-001",
    date: "2025-01-05",
    status: "Paid",
    totalAmount: 750000,
    items: 3,
  },

  {
    id: "INV-2025-002",
    date: "2025-01-03",
    status: "Paid",
    totalAmount: 450000,
    items: 2,
  },

  {
    id: "INV-2025-003",
    date: "2025-01-01",
    status: "Pending",
    totalAmount: 280000,
    items: 1,
  },

  {
    id: "INV-2024-048",
    date: "2024-12-28",
    status: "Paid",
    totalAmount: 320000,
    items: 2,
  },

  {
    id: "INV-2024-047",
    date: "2024-12-25",
    status: "Paid",
    totalAmount: 550000,
    items: 4,
  },

  {
    id: "INV-2024-046",
    date: "2024-12-20",
    status: "Cancelled",
    totalAmount: 180000,
    items: 1,
  },

  {
    id: "INV-2024-045",
    date: "2024-12-15",
    status: "Paid",
    totalAmount: 420000,
    items: 2,
  },

  {
    id: "INV-2024-044",
    date: "2024-12-10",
    status: "Paid",
    totalAmount: 890000,
    items: 5,
  },

  {

    id: "INV-2024-043",
    date: "2024-12-05",
    status: "Paid",
    totalAmount: 310000,
    items: 2,
  },

  {
    id: "INV-2024-042",
    date: "2024-11-30",
    status: "Paid",
    totalAmount: 625000,
    items: 3,
  },

];


export default function InvoiceHistory() {
  const { 
    currentInvoices, 
    currentPage, 
    totalPages, 
    sortBy, 
    setSortBy, 
    goToPage, 
    startIndex, 
    totalCount 
  } = useInvoiceHistory(mockInvoices);

  const fmtMoney = (n: number) => `₫${n.toLocaleString("vi-VN")}`;
  const fmtDate = (d: string) => new Date(d).toLocaleDateString("vi-VN");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <label className="text-sm font-semibold text-gray-700">Sắp xếp theo:</label>
        <select
          value={sortBy}
          onChange={(e) => { setSortBy(e.target.value as SortOption); goToPage(1); }}
          className="px-4 py-2 border border-[#d8c1ab] rounded-lg focus:ring-2 focus:ring-[#f7b267] bg-[#fffdf8]"
        >
          <option value="date-desc">Ngày mới nhất</option>
          <option value="date-asc">Ngày cũ nhất</option>
          <option value="amount-desc">Số tiền cao nhất</option>
          <option value="amount-asc">Số tiền thấp nhất</option>
        </select>
      </div>

      <div className="hidden md:block pet-card rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#f5eadc] border-b border-[#ead9c6]">
            <tr>
              {["Mã hóa đơn", "Ngày", "Số mục", "Tổng tiền", "Trạng thái", "Hành động"].map(h => (
                <th key={h} className="px-6 py-3 text-left text-sm font-semibold text-[#4b3525]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-[#ead9c6] hover:bg-[#fff8ed] transition">
                <td className="px-6 py-4 text-sm font-semibold text-[#3d2b1f]">{invoice.id}</td>
                <td className="px-6 py-4 text-sm text-[#6d5a49]">{fmtDate(invoice.date)}</td>
                <td className="px-6 py-4 text-sm text-[#6d5a49]">{invoice.items} sản phẩm</td>
                <td className="px-6 py-4 text-sm font-semibold text-[#9f5f36]">{fmtMoney(invoice.totalAmount)}</td>
                <td className="px-6 py-4 text-sm">
                  <StatusBadge status={invoice.status} /></td>
                <td className="px-6 py-4 text-center text-sm">
                  <button className="text-[#9f5f36] hover:text-[#6f4a2f] font-semibold">Xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {currentInvoices.map((invoice) => (
          <div key={invoice.id} className="pet-card rounded-lg p-4 border-l-4 border-[#9f5f36]">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-bold text-[#3d2b1f]">{invoice.id}</p>
                <p className="text-sm text-[#6d5a49]">{fmtDate(invoice.date)}</p>
              </div>
              <StatusBadge status={invoice.status} />
            </div>
            <div className="space-y-2 mb-4 text-sm text-[#6d5a49]">
              <p><span className="font-semibold text-[#4b3525]">Số mục:</span> {invoice.items}</p>
              <p>
                <span className="font-semibold text-[#4b3525]">Tổng tiền:</span>
                <span className="text-lg font-bold text-[#9f5f36] ml-2">{fmtMoney(invoice.totalAmount)}</span>
              </p>
            </div>
            <button className="w-full bg-[#9f5f36] hover:bg-[#7d4525] text-white font-semibold py-2 rounded-lg">
              Xem chi tiết
            </button>
          </div>
        ))}
      </div>

      {totalCount === 0 ? (
        <div className="pet-card text-center py-12 rounded-lg">
          <p className="text-[#6d5a49]">📄 Bạn chưa có hóa đơn nào</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <Pagination current={currentPage} total={totalPages} onChange={goToPage} />
          <p className="text-sm text-[#6d5a49]">
             Hiển thị {startIndex + 1}–{startIndex + currentInvoices.length} trong {totalCount} hóa đơn
          </p>
        </div>
      )}
    </div>
  );
}
