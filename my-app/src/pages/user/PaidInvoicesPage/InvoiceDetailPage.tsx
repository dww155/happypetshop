"use client";

import { Link, useParams } from "react-router-dom";
import { useInvoiceDetail } from "./useInvoiceDetail";
import { PAYMENT_STATUS_ENTRIES, normalizePaymentStatus } from "./paymentStatusMeta";
import StatusBadge from "../ProfilePage/components/StatusBadge";

function formatMoney(n: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(n);
}

function formatDate(d: string) {
  return new Date(d).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function paymentMethodLabel(method: string | undefined) {
  if (!method) return "—";
  const u = method.toUpperCase().replace(/-/g, "_");
  if (u === "COD") return "Thanh toán khi nhận hàng (COD)";
  if (u === "QR_SCANNING") return "Quét mã QR";
  return method;
}

export default function InvoiceDetailPage() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const { invoice, loading, error, isAuthenticated, refetch } = useInvoiceDetail(invoiceId);

  const currentCode = normalizePaymentStatus(invoice?.status);
  const statusKnown = PAYMENT_STATUS_ENTRIES.some((s) => s.code === currentCode);

  return (
    <main className="pet-page min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/user/invoices"
            className="text-[#9f5f36] hover:text-[#6f4a2f] font-semibold text-sm"
          >
            ← Danh sách hóa đơn
          </Link>
        </div>

        {!isAuthenticated && (
          <div className="pet-surface text-center py-20 rounded-lg border-2 border-dashed border-[#d8c1ab]">
            <h2 className="text-xl font-bold text-[#3d2b1f] mb-2">Đăng nhập để xem chi tiết</h2>
            <Link
              to="/login"
              className="inline-block mt-4 bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-3 px-8 rounded-lg"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {isAuthenticated && loading && (
          <div className="pet-card text-center py-20 rounded-lg">
            <p className="text-[#6d5a49]">Đang tải hóa đơn...</p>
          </div>
        )}

        {isAuthenticated && !loading && error && (
          <div className="p-6 pet-card rounded-lg border border-red-100">
            <p className="text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 text-[#9f5f36] font-semibold underline"
            >
              Thử lại
            </button>
          </div>
        )}

        {isAuthenticated && !loading && invoice && !error && (
          <div className="space-y-8">
            <header className="pet-card rounded-lg p-6">
              <p className="text-sm text-[#8f7b6b] mb-1">Hóa đơn</p>
              <h1 className="text-2xl font-bold text-[#3d2b1f] font-mono break-all">{invoice.id}</h1>
              <p className="text-sm text-[#6d5a49] mt-2">
                Tạo lúc <span className="font-medium">{formatDate(invoice.createdAt)}</span>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="text-sm text-[#6d5a49]">Trạng thái hiện tại:</span>
                <StatusBadge status={invoice.status ?? ""} />
                <span className="text-xs font-mono text-[#8f7b6b]">({currentCode})</span>
              </div>
            </header>

            <section className="pet-card rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#3d2b1f] mb-4">Các trạng thái thanh toán</h2>
              <p className="text-sm text-[#6d5a49] mb-4">
                Hệ thống dùng các trạng thái sau. Trạng thái áp dụng cho đơn này được tô đậm.
              </p>
              {invoice && !statusKnown && currentCode && (
                <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4">
                  Trạng thái hiện tại: <span className="font-mono font-semibold">{invoice.status}</span>
                </p>
              )}
              <ul className="grid gap-3 sm:grid-cols-1">
                {PAYMENT_STATUS_ENTRIES.map((s) => {
                  const isCurrent = s.code === currentCode;
                  return (
                    <li
                      key={s.code}
                      className={`rounded-lg border px-4 py-3 transition ${
                        isCurrent
                          ? "border-[#2f7d5f] bg-[#dff3e8] ring-2 ring-[#bfe5d1]"
                          : "border-[#ead9c6] bg-[#fff8ed] opacity-90"
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-mono text-xs text-[#8f7b6b]">{s.code}</span>
                        {isCurrent && (
                          <span className="text-xs font-semibold text-emerald-700">Đang áp dụng</span>
                        )}
                      </div>
                      <p className="font-semibold text-[#3d2b1f] mt-1">{s.title}</p>
                      <p className="text-sm text-[#6d5a49] mt-0.5">{s.description}</p>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="pet-card rounded-lg p-6">
              <h2 className="text-lg font-bold text-[#3d2b1f] mb-4">Thông tin giao hàng & thanh toán</h2>
              <dl className="space-y-3 text-sm text-[#6d5a49]">
                <div>
                  <dt className="font-semibold text-[#3d2b1f]">Phương thức thanh toán</dt>
                  <dd className="mt-0.5">{paymentMethodLabel(invoice.paymentMethod)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#3d2b1f]">Địa chỉ giao hàng</dt>
                  <dd className="mt-0.5">{invoice.shippingAddress || "—"}</dd>
                </div>
                <div className="flex flex-wrap gap-6 pt-2 border-t border-[#ead9c6]">
                  <div>
                    <dt className="text-[#8f7b6b]">Tạm tính</dt>
                    <dd className="font-semibold">{formatMoney(Number(invoice.totalAmount ?? 0))}</dd>
                  </div>
                  <div>
                    <dt className="text-[#8f7b6b]">Thực thanh toán</dt>
                    <dd className="text-lg font-bold text-[#2f7d5f]">
                      {formatMoney(Number(invoice.realAmount ?? invoice.totalAmount ?? 0))}
                    </dd>
                  </div>
                </div>
              </dl>
            </section>

            {invoice.invoiceDetails && invoice.invoiceDetails.length > 0 && (
              <section className="pet-card rounded-lg overflow-hidden">
                <h2 className="text-lg font-bold text-[#3d2b1f] px-6 py-4 border-b border-[#ead9c6]">
                  Chi tiết dòng hàng
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#f5eadc] text-left text-[#6d5a49]">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Mục</th>
                        <th className="px-6 py-3 font-semibold text-right">Đơn giá</th>
                        <th className="px-6 py-3 font-semibold text-right">SL</th>
                        <th className="px-6 py-3 font-semibold text-right">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.invoiceDetails.map((d) => (
                        <tr key={d.id} className="border-t border-[#ead9c6]">
                          <td className="px-6 py-3 text-[#3d2b1f]">
                            {d.productId
                              ? `(${d.productName})`
                              : d.petId
                                ? `Thú cưng (${d.petId})`
                                : "Mục"}
                          </td>
                          <td className="px-6 py-3 text-right tabular-nums">
                            {formatMoney(d.unitPrice)}
                          </td>
                          <td className="px-6 py-3 text-right">{d.quantity}</td>
                          <td className="px-6 py-3 text-right font-medium tabular-nums">
                            {formatMoney(d.totalPrice ?? d.unitPrice * d.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
