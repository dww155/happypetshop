"use client";

import type { CartItemResponse } from "../../../../types/cartTypes";
import {ArrowLeft, CreditCard} from "lucide-react";

interface CartSummaryProps {
  items: CartItemResponse[];
  selection: Record<string, boolean>;
  onCheckout: () => void;
}

function getPrice(item: CartItemResponse): number {
  return item.product?.price ?? item.inventory?.product?.price ?? 0;
}

export default function CartSummary({ items, selection, onCheckout }: CartSummaryProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const isSelected = (item: CartItemResponse) => selection[item.id] ?? true;
  const selectedItems = items.filter((item) => isSelected(item));
  const subtotal = selectedItems.reduce((sum, item) => sum + getPrice(item) * item.quantity, 0);
  // const shippingFee = subtotal > 0 ? 30000 : 0; // Free shipping for order > 0
  // const grandTotal = subtotal + shippingFee;
  const grandTotal = subtotal ;
  const selectedCount = selectedItems.length;
  const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  const isDisabled = selectedItems.length === 0;

  return (
    <div className="pet-card rounded-lg p-6 sticky top-24">
      {/* Header */}
      <h2 className="text-lg font-bold text-[#3d2b1f] mb-6">Tóm tắt đơn hàng</h2>

      {/* Items Info */}
      {!isDisabled && (
        <div className="mb-4 pb-4 border-b border-[#ead9c6]">
          <p className="text-sm text-[#6d5a49]">
            <span className="font-semibold text-[#3d2b1f]">{selectedCount}</span> sản phẩm đã chọn (
            <span className="font-semibold text-[#3d2b1f]">{selectedQuantity}</span> cái)
          </p>
        </div>
      )}

      {/* Subtotal */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-[#6d5a49]">Tạm tính:</span>
        <span className="font-semibold text-[#3d2b1f]">
          {formatCurrency(subtotal)}
        </span>
      </div>

      {/* Shipping Fee */}
      {/* {subtotal > 0 && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Phí vận chuyển:</span>
          <span className="font-semibold text-gray-800">
            {formatCurrency(shippingFee)}
          </span>
        </div>
      )} */}

      {/* Grand Total */}
      <div className="flex justify-between items-center mb-6 pb-6 border-t border-[#ead9c6] pt-4">
        <span className="text-lg font-bold text-[#3d2b1f]">Tổng cộng:</span>
        <span className="text-2xl font-black text-[#9f5f36]">
          {formatCurrency(grandTotal)}
        </span>
      </div>

      {/* Empty State Message */}
      {isDisabled && (
        <div className="text-center mb-4 py-4 bg-[#f5eadc] rounded-lg border border-[#ead9c6]">
          <p className="text-sm text-[#6d5a49]">Vui lòng chọn sản phẩm để thanh toán</p>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        disabled={isDisabled}
        className={`flex w-full items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold transition focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isDisabled
            ? "bg-[#d8c1ab] text-[#8f7b6b] cursor-not-allowed"
            : "bg-[#9f5f36] hover:bg-[#7d4525] text-white focus:ring-[#f7b267]"
        }`}
        aria-label="Thanh toán"
      >
        <CreditCard className="h-5 w-5" /> Thanh toán ({selectedCount > 0 ? selectedCount : 0})
      </button>

      {/* Continue Shopping Link */}
      <a
        href="/products"
        className="mt-4 flex items-center justify-center gap-2 text-[#9f5f36] hover:text-[#6f4a2f] text-sm font-semibold transition"
      >
        <ArrowLeft className="h-4 w-4" /> Tiếp tục mua sắm
      </a>
    </div>
  );
}
