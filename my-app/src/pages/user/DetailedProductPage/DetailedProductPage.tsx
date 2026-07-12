"use client";

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { addOrUpdateCartItem } from "@/services/cartService";
import { getInfo } from "@/services/customerService";
import { getProductById } from "@/services/productService";
import type { ProductResponse } from "@/types/productTypes";
import {ArrowLeft, CreditCard, Minus, Plus, ShoppingCart} from "lucide-react";

interface CheckoutItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value ?? 0);
}

function formatDate(dateString?: string | null): string {
  if (!dateString) return "Không có";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "Không có";

  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DetailedProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const stock = product?.quantity ?? 0;
  const maxSelectableQuantity = Math.max(1, stock);

  useEffect(() => {
    let cancelled = false;

    const fetchProduct = async () => {
      if (!id) {
        setError("Không tìm thấy mã sản phẩm.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setActionMessage(null);

      try {
        const data = await getProductById(id);
        if (cancelled) return;

        setProduct(data);
        setQuantity(1);
      } catch (e) {
        if (cancelled) return;

        setProduct(null);
        setError(e instanceof Error ? e.message : "Không thể tải thông tin sản phẩm.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    if (!product) return;

    setQuantity((prev) => Math.min(Math.max(prev, 1), Math.max(1, product.quantity)));
  }, [product]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;
    return product.price * quantity;
  }, [product, quantity]);

  const handleAddToCart = async () => {
    if (!product || product.quantity <= 0) return;

    if (!user?.id) {
      setActionMessage("Vui lòng đăng nhập để thêm vào giỏ hàng.");
      return;
    }

    setCartLoading(true);
    setActionMessage(null);

    try {
      await addOrUpdateCartItem(user.id, {
        productId: product.id,
        quantity,
      });

      const refreshedCustomer = await getInfo();
      setUser(refreshedCustomer);
      setActionMessage("Đã thêm vào giỏ hàng.");
    } catch (e) {
      setActionMessage(e instanceof Error ? e.message : "Không thể thêm vào giỏ hàng.");
    } finally {
      setCartLoading(false);
    }
  };

  const handlePayment = () => {
    if (!product || product.quantity <= 0) return;

    const checkoutItem: CheckoutItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.imageUrl ?? "",
      isSelected: true,
    };

    sessionStorage.setItem("checkoutItems", JSON.stringify([checkoutItem]));
    navigate("/user/review?source=product");
  };

  if (loading) {
    return (
      <div className="pet-page min-h-screen flex items-center justify-center px-4">
        <p className="text-lg text-[#6d5a49]">Đang tải thông tin sản phẩm...</p>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="pet-page min-h-screen flex items-center justify-center px-4">
        <div className="max-w-lg w-full pet-card rounded-lg p-6 text-center shadow">
          <p className="text-[#a33b2b] font-semibold mb-2">Không thể hiển thị sản phẩm</p>
          <p className="text-[#6d5a49] mb-4">{error ?? "Không tìm thấy sản phẩm."}</p>
          <Link
            to="/user/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#9f5f36] px-4 py-2 text-white font-medium hover:bg-[#7d4525] transition"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pet-page min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/user/products" className="mb-5 inline-flex items-center gap-2 font-semibold text-[#9f5f36] hover:text-[#6f4a2f]">
          <ArrowLeft className="h-4 w-4" /> Tất cả sản phẩm
        </Link>
        <div className="pet-card rounded-lg overflow-hidden mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center bg-[#f5eadc] rounded-lg overflow-hidden h-96">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <span className="text-[#8f7b6b] text-lg font-semibold">Chưa có ảnh</span>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-black text-[#3d2b1f] mb-4">{product.name}</h1>

                <div className="mb-6">
                  <span className="text-4xl font-black text-[#9f5f36]">{formatCurrency(product.price)}</span>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-[#6d5a49]">
                    Số lượng có sẵn:{" "}
                    <span className={`font-bold text-xl ${stock > 0 ? "text-[#23684d]" : "text-[#a33b2b]"}`}>
                      {stock} sản phẩm
                    </span>
                  </p>
                  {stock === 0 && <p className="text-[#a33b2b] font-semibold mt-2">Sản phẩm đã hết hàng</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-[#4b3525] font-semibold mb-2">Số lượng:</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1 || stock === 0}
                      className="bg-[#f5eadc] hover:bg-[#ead9c6] disabled:bg-[#f3ede6] disabled:cursor-not-allowed text-[#4b3525] font-bold p-3 rounded-lg transition"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={maxSelectableQuantity}
                      value={quantity}
                      onChange={(e) => {
                        const next = Number.parseInt(e.target.value, 10);
                        if (Number.isNaN(next)) {
                          setQuantity(1);
                          return;
                        }
                        setQuantity(Math.min(Math.max(next, 1), maxSelectableQuantity));
                      }}
                      disabled={stock === 0}
                      className="w-20 text-center text-lg font-semibold border-2 border-[#d8c1ab] rounded-lg py-2 disabled:bg-[#f3ede6]"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.min(prev + 1, maxSelectableQuantity))}
                      disabled={quantity >= maxSelectableQuantity || stock === 0}
                      className="bg-[#f5eadc] hover:bg-[#ead9c6] disabled:bg-[#f3ede6] disabled:cursor-not-allowed text-[#4b3525] font-bold p-3 rounded-lg transition"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {actionMessage && <p className="mb-4 text-sm font-medium text-[#23684d]">{actionMessage}</p>}

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={stock === 0 || cartLoading}
                    className="flex-1 bg-[#9f5f36] hover:bg-[#7d4525] disabled:bg-[#c9b9a6] disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    {cartLoading ? "..." : <ShoppingCart className="h-5 w-5" />}
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    type="button"
                    onClick={handlePayment}
                    disabled={stock === 0}
                    className="flex-1 bg-[#2f7d5f] hover:bg-[#23684d] disabled:bg-[#c9b9a6] disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition flex items-center justify-center gap-2 text-lg"
                  >
                    <CreditCard className="h-5 w-5" /> Thanh toán ngay
                  </button>
                </div>

                <div className="bg-[#f5eadc] rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-[#4b3525]">Tổng tiền:</span>
                    <span className="text-2xl font-black text-[#9f5f36]">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm text-[#6d5a49]">
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Danh mục:</span> {product.categoryName ?? "Không rõ"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Thương hiệu:</span> {product.brand ?? "Không rõ"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Xuất xứ:</span> {product.origin ?? "Không rõ"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Đơn vị:</span> {product.unit ?? "Không rõ"}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Tạo lúc:</span> {formatDate(product.createdAt)}
                  </p>
                  <p>
                    <span className="font-semibold text-[#3d2b1f]">Cập nhật:</span> {formatDate(product.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pet-card rounded-lg p-6 lg:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#3d2b1f] mb-4">Mô tả sản phẩm</h2>
          <div className="prose max-w-none">
            <p className="text-[#6d5a49] leading-relaxed text-lg">{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
