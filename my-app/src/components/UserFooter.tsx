"use client";

import { Link } from "react-router-dom";
import {Bone, Heart, Mail, MapPin, PawPrint, Phone, ShoppingBag} from "lucide-react";

export default function UserFooter() {


  return (
      <footer className="bg-[#4b3525] text-[#fff8ed] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#f7b267] text-[#4b3525]">
                  <PawPrint className="h-5 w-5" />
                </span>
                <h4 className="text-xl font-black">Happy Pet Shop</h4>
              </div>
              <p className="text-[#e8d5c2] leading-relaxed">
                Cửa hàng thân thiện cho đồ ăn, phụ kiện, dịch vụ chăm sóc và những người bạn nhỏ đáng yêu.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Liên kết nhanh</h4>
              <ul className="text-[#e8d5c2] space-y-3">
                <li>
                  <Link to="/user/products" className="inline-flex items-center gap-2 hover:text-white transition">
                    <ShoppingBag className="h-4 w-4" /> Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link to="/user/pets" className="inline-flex items-center gap-2 hover:text-white transition">
                    <Heart className="h-4 w-4" /> Thú cưng
                  </Link>
                </li>
                <li>
                  <Link to="/user/services" className="inline-flex items-center gap-2 hover:text-white transition">
                    <Bone className="h-4 w-4" /> Dịch vụ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Liên hệ</h4>
              <div className="space-y-3 text-[#e8d5c2]">
                <p className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@happypetshop.com</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> 0123 456 789</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Mở cửa mỗi ngày</p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-[#d8c1ab]">
            <p>&copy; 2026 Happy Pet Shop. Bảo lưu mọi quyền.</p>
          </div>
        </div>
      </footer>
  );
}
