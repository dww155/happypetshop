"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import { getInfo } from "../../../../services/customerService";
import { addOrUpdateCartItem } from "../../../../services/cartService";
import {CreditCard, PackageCheck, ShoppingCart} from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  availableAmount: number;
  category?: string;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  availableAmount,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [cartLoading, setCartLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const handleAddToCart = async () => {
    if (availableAmount === 0) return;
    if (!user?.id) {
      setCartMessage("Vui lòng đăng nhập để thêm vào giỏ hàng");
      return;
    }
    setCartLoading(true);
    setCartMessage(null);
    try {
      await addOrUpdateCartItem(user.id, { productId: id, quantity: 1 });
      await getInfo().then(setUser);
      setCartMessage("Đã thêm vào giỏ hàng!");
      setTimeout(() => setCartMessage(null), 2000);
    } catch {
      setCartMessage("Không thể thêm vào giỏ hàng");
    } finally {
      setCartLoading(false);
    }
  };

  const handlePayment = () => {
    if (availableAmount === 0) return;
    const checkoutItem = {
      id,
      productId: id,
      name,
      price,
      quantity: 1,
      image,
      isSelected: true,
    };
    sessionStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    navigate("/payment?source=product");
  };

  return (
    <div className="pet-card flex h-full flex-col overflow-hidden rounded-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/user/detailedProduct/${id}`} className="block">
        <div className="relative h-64 bg-[#f5eadc] overflow-hidden cursor-pointer flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            />
          ) : (
            <ShoppingCart className="h-12 w-12 text-[#b9a38d]" aria-hidden />
          )}

          <div className={`absolute top-3 right-3 rounded-lg px-3 py-1 text-sm font-bold shadow-sm ${
            availableAmount > 0 ? "bg-[#dff3e8] text-[#23684d]" : "bg-[#eee3d6] text-[#806954]"
          }`}>
            {availableAmount > 0 ? "Còn hàng" : "Hết hàng"}
          </div>
        </div>
      </Link>

      <div className="p-4 flex-grow flex flex-col">
        <Link to={`/user/detailedProduct/${id}`}>
          <h3 className="text-lg font-bold text-[#3d2b1f] mb-2 line-clamp-2 h-14 hover:text-[#9f5f36] transition-colors">
            {name}
          </h3>
        </Link>

        {cartMessage && (
          <p className="text-sm mb-2 text-[#23684d] font-medium">{cartMessage}</p>
        )}

          <p className="text-sm text-[#6d5a49] mb-3 line-clamp-2">{description}</p>

          <div className="mb-4">
            <p className="flex items-center gap-1.5 text-xs text-[#7e6a58]">
              <PackageCheck className="h-3.5 w-3.5" />
              Số lượng có sẵn:{" "}
              <span
                  className={`font-bold ${
                      availableAmount > 0 ? "text-[#23684d]" : "text-[#a33b2b]"
                  }`}
              >
              {availableAmount}
            </span>
            </p>
          </div>

          <div className="border-t border-[#ead9c6] pt-3 mt-auto flex items-center justify-between">
          <span className="text-2xl font-black text-[#9f5f36]">
            ₫{price.toLocaleString("vi-VN")}
          </span>
            <div className="flex gap-2">
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  disabled={availableAmount === 0 || cartLoading}
                  className="pet-focus bg-[#9f5f36] hover:bg-[#7d4525] text-white font-semibold py-2 px-3 rounded-lg transition disabled:bg-[#c9b9a6] disabled:cursor-not-allowed"
                  aria-label={`Thêm ${name} vào giỏ hàng`}
                  title="Thêm vào giỏ hàng"
              >
                {cartLoading ? "..." : <ShoppingCart className="h-5 w-5" />}
              </button>
              <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handlePayment();
                  }}
                  disabled={availableAmount === 0}
                  className="pet-focus bg-[#2f7d5f] hover:bg-[#23684d] text-white font-semibold py-2 px-3 rounded-lg transition disabled:bg-[#c9b9a6] disabled:cursor-not-allowed"
                  aria-label={`Thanh toán cho ${name}`}
                  title="Thanh toán ngay"
              >
                <CreditCard className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
