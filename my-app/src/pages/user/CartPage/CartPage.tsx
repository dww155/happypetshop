"use client";

import { Link } from "react-router-dom";
import CartItemRow from "./components/CartItemRow";
import CartSummary from "./components/CartSummary";
import SelectAllBar from "./components/SelectAllBar";
import { useCart } from "./useCart";
import {LogIn, ShoppingBag, ShoppingCart} from "lucide-react";

export default function CartPage() {
  const {
    items,
    selection,
    allSelected,
    loading,
    error,
    isAuthenticated,
    toggleSelect,
    selectAll,
    updateQuantity,
    removeItem,
    checkout,
  } = useCart();

  return (
    <main className="pet-page min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-4xl font-black text-[#3d2b1f] mb-2">
            <ShoppingCart className="h-9 w-9 text-[#9f5f36]" /> Giỏ hàng
          </h1>
          <p className="text-[#6d5a49]">
            Bạn có <span className="font-bold text-[#3d2b1f]">{items.length}</span> sản phẩm trong giỏ hàng
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Not logged in */}
        {!isAuthenticated && (
          <div className="pet-surface text-center py-20 rounded-lg border-2 border-dashed border-[#d8c1ab]">
            <LogIn className="mx-auto mb-4 h-14 w-14 text-[#9f5f36]" />
            <h2 className="text-2xl font-bold text-[#3d2b1f] mb-2">Đăng nhập để xem giỏ hàng</h2>
            <p className="text-[#6d5a49] mb-6">Vui lòng đăng nhập để quản lý giỏ hàng của bạn</p>
            <Link
              to="/login"
              className="inline-block bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="pet-card rounded-lg px-6 py-4 shadow-lg">Đang cập nhật...</div>
          </div>
        )}

        {/* Empty Cart State (when logged in but no items) */}
        {isAuthenticated && items.length === 0 && !loading ? (
          <div className="pet-surface text-center py-20 rounded-lg border-2 border-dashed border-[#d8c1ab]">
            <ShoppingBag className="mx-auto mb-4 h-14 w-14 text-[#9f5f36]" />
            <h2 className="text-2xl font-bold text-[#3d2b1f] mb-2">Giỏ hàng trống</h2>
            <p className="text-[#6d5a49] mb-6">Chưa có sản phẩm nào trong giỏ hàng của bạn</p>
            <Link
              to="/user/products"
              className="inline-block bg-[#9f5f36] hover:bg-[#7d4525] text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Quay lại mua sắm
            </Link>
          </div>
        ) : isAuthenticated && items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select All Bar */}
              <SelectAllBar
                items={items}
                selection={selection}
                allSelected={allSelected}
                onSelectAll={selectAll}
              />

              {/* Cart Items List */}
              <div className="space-y-3">
                {[...items]
                    .sort((a, b) =>
                        (a.product?.name ?? "").localeCompare(b.product?.name ?? "", "vi")
                    )
                    .map((item) => (
                        <CartItemRow
                            key={item.id}
                            item={item}
                            isSelected={selection[item.id] ?? true}
                            onToggleSelect={toggleSelect}
                            onRemove={removeItem}
                            updateQuantity={updateQuantity}
                        />
                    ))}
              </div>

              {/* Continue Shopping CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/user/products"
                  className="inline-flex items-center gap-2 text-[#9f5f36] hover:text-[#6f4a2f] font-semibold transition"
                >
                  ← Tiếp tục mua sắm
                </Link>
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            <div className="lg:col-span-1">
              <CartSummary items={items} selection={selection} onCheckout={checkout} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
