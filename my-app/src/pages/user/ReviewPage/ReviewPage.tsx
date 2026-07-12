"use client";

import { Link } from "react-router-dom";
import { useReview } from "./useReview";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

export default function ReviewPage() {
  const {
    loading,
    placingOrder,
    error,
    review,
    useDefaultAddress,
    newAddress,
    paymentMethod,
    setPaymentMethod,
    setUseDefaultAddress,
    setNewAddress,
    refreshReview,
    placeOrder,
  } = useReview();

  return (
    <main className="pet-page min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#3d2b1f]">Xác nhận đơn hàng</h1>
          <p className="text-[#6d5a49] mt-2">Kiểm tra thông tin sản phẩm, thanh toán và giao hàng trước khi đặt.</p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 pet-card rounded-lg p-6">
            <h2 className="text-lg font-bold text-[#3d2b1f] mb-4">Sản phẩm đã chọn</h2>

            {loading ? (
              <div className="text-[#6d5a49]">Đang tải thông tin đơn hàng...</div>
            ) : review?.reviewDetails?.length ? (
              <div className="space-y-4">
                {review.reviewDetails.map((item) => (
                  <div key={`${item.productId}-${item.quantity}`} className="flex gap-4 border-b border-[#ead9c6] pb-4">
                    <img
                      src={item.imageUrl || "https://placehold.co/100x100?text=Pet"}
                      alt={item.productName}
                      className="w-20 h-20 rounded-lg object-cover border border-[#ead9c6]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-[#3d2b1f]">{item.productName}</p>
                      <p className="text-sm text-[#6d5a49]">Số lượng: {item.quantity}</p>
                      <p className="text-sm text-[#6d5a49]">Đơn giá: {formatCurrency(item.unitPrice)}</p>
                      {!!item.discountAmount && (
                        <p className="text-sm text-emerald-600">Giảm giá: -{formatCurrency(item.discountAmount)}</p>
                      )}
                    </div>
                    <div className="font-bold text-[#3d2b1f]">{formatCurrency(item.totalPrice - (item.discountAmount || 0))}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-[#6d5a49]">Không có sản phẩm để thanh toán.</div>
            )}
          </div>

          <div className="pet-card rounded-lg p-6 h-fit sticky top-24">
            <h2 className="text-lg font-bold text-[#3d2b1f] mb-4">Thanh toán và giao hàng</h2>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#4b3525] mb-2">Phương thức thanh toán</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full border border-[#d8c1ab] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#f7b267] outline-none bg-[#fffdf8]"
              >
                <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                <option value="QR_Scanning">Quét QR</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-[#4b3525] mb-2">Địa chỉ giao hàng</label>
              <div className="space-y-2 mb-2">
                <label className="flex items-center gap-2 text-sm text-[#6d5a49]">
                  <input
                    type="radio"
                    checked={useDefaultAddress}
                    onChange={() => setUseDefaultAddress(true)}
                  />
                  Dùng địa chỉ mặc định
                </label>
                <label className="flex items-center gap-2 text-sm text-[#6d5a49]">
                  <input
                    type="radio"
                    checked={!useDefaultAddress}
                    onChange={() => setUseDefaultAddress(false)}
                  />
                  Nhập địa chỉ mới
                </label>
              </div>

              {!useDefaultAddress && (
                <textarea
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  rows={3}
                  className="w-full border border-[#d8c1ab] rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#f7b267] outline-none bg-[#fffdf8]"
                  placeholder="Nhập địa chỉ giao hàng mới"
                />
              )}

              <button
                type="button"
                onClick={refreshReview}
                className="mt-2 text-sm text-[#9f5f36] hover:text-[#6f4a2f] font-semibold"
              >
                Cập nhật xem trước
              </button>
            </div>

            <div className="border-t border-[#ead9c6] pt-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#6d5a49]">Tạm tính</span>
                <span className="font-semibold">{formatCurrency(review?.totalAmount ?? 0)}</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="text-[#3d2b1f] font-bold">Thành tiền</span>
                <span className="text-[#9f5f36] font-black">{formatCurrency(review?.realAmount ?? 0)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={placingOrder || loading}
              onClick={placeOrder}
              className="w-full bg-[#9f5f36] hover:bg-[#7d4525] text-white py-3 rounded-lg font-bold disabled:opacity-60"
            >
              {placingOrder ? "Đang đặt hàng..." : "Đặt hàng"}
            </button>

            <Link to="/user/cart" className="block text-center mt-3 text-sm text-[#9f5f36] hover:text-[#6f4a2f]">
              ← Quay lại giỏ hàng
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
