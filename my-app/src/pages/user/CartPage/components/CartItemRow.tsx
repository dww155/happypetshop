"use client";

import type {CartItemResponse} from "../../../../types/cartTypes";
import {useEffect, useState} from "react";
import {Minus, Plus, ShoppingBag, Trash2} from "lucide-react";

interface CartItemRowProps {
  item: CartItemResponse;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onRemove: (id: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
}

function getProduct(item: CartItemResponse) {
  return item.product ?? item.inventory?.product;
}

export default function CartItemRow({
                                      item,
                                      isSelected,
                                      onToggleSelect,
                                      updateQuantity,
                                      onRemove,
                                    }: CartItemRowProps) {
  const product = getProduct(item);
  const price = product?.price ?? 0;
  const name = product?.name ?? "Sản phẩm";
  const image = product?.imageUrl ?? "";
  const lineTotal = price * item.quantity;
  const [quantity, setQuantity] = useState(item.quantity);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // function wait and call Api
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!product?.id) return;

      updateQuantity(product.id, quantity);
    }, 500);

    return () => clearTimeout(timer);
  }, [quantity, product?.id]);

  return (
      <div
          className="pet-card flex flex-col gap-4 rounded-lg p-4 transition-shadow hover:shadow-md sm:flex-row sm:items-center">
        {/* Top row: checkbox + image + info */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <div className="flex-shrink-0 pt-0.5">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onToggleSelect(item.id)}
                className="w-5 h-5 accent-[#9f5f36] rounded cursor-pointer focus:ring-2 focus:ring-[#f7b267]"
                aria-label={`Chọn ${name}`}
            />
          </div>

          <div className="flex-shrink-0">
            <div className="relative w-20 h-20 bg-[#f5eadc] rounded-lg overflow-hidden flex items-center justify-center">
              {image ? (
                  <img
                      src={image}
                      alt={name}
                      className="w-full h-full object-cover"
                  />
              ) : (
                  <ShoppingBag className="h-7 w-7 text-[#b9a38d]" aria-hidden />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-[#3d2b1f] line-clamp-2">
              {name}
            </h3>
            <p className="text-sm text-[#6d5a49] mt-1">
              Giá: <span className="font-semibold text-[#3d2b1f]">{formatCurrency(price)}</span>
            </p>
            <p className="text-sm font-bold text-[#3d2b1f] mt-2 sm:hidden">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>

        {/* Bottom row (mobile) / inline (desktop): quantity + total + remove */}
        <div
            className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0 border-t border-[#ead9c6] sm:border-t-0 pt-3 sm:pt-0 pl-9 sm:pl-0">
          <div className="flex items-center gap-2 bg-[#f5eadc] rounded-lg p-2">
            <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => Math.max(0, q - 1));
                }}
                disabled={quantity <= 0}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#fffdf8] hover:bg-[#ead9c6] disabled:opacity-50 disabled:cursor-not-allowed transition text-[#4b3525] font-bold"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center text-sm font-semibold text-[#3d2b1f]" aria-live="polite">
                {quantity}
            </span>
            <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuantity((q) => q + 1);
                }}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#fffdf8] hover:bg-[#ead9c6] transition text-[#4b3525] font-bold"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="hidden sm:block text-right min-w-[6rem]">
            <p className="text-sm font-bold text-[#3d2b1f]">
              {formatCurrency(lineTotal)}
            </p>
          </div>

          <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(item.id);
              }}
              className="text-[#a33b2b] hover:text-[#7c2c20] hover:bg-[#fff0ea] p-2 rounded-lg transition flex-shrink-0"
              aria-label={`Xóa ${name} khỏi giỏ hàng`}
              title="Xóa khỏi giỏ hàng"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
  );
}
