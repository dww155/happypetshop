"use client";

import {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useAuth} from "../context/authContext.tsx";
import {Bone, FileText, Heart, LogIn, Menu, PawPrint, ShoppingCart, User, X} from "lucide-react";

export default function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {user} = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY) setShowHeader(false);
      else setShowHeader(true);

      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItem =
      "px-3 py-2 rounded-lg transition-all duration-200 font-semibold flex items-center gap-2 text-sm";

  const activeItem = "bg-[#fff8ed] text-[#8f4d25] shadow-sm";
  const inactiveItem = "text-[#fffaf2] hover:bg-white/15";

  return (
      <>
        <header
            className={`sticky top-0 w-full z-50 border-b border-white/25 bg-[#9f5f36]/95 text-white shadow-lg shadow-[#6f3a1d]/10 backdrop-blur-xl transition-all duration-300
          ${showHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-between items-center h-20">

              {/* Logo */}
              <Link
                  to="/user/products"
                  className="flex items-center gap-3 text-xl sm:text-2xl font-black tracking-wide transition hover:opacity-95"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-[#fff8ed] text-[#9f5f36] shadow-sm">
                  <PawPrint className="h-6 w-6" />
                </span>
                <span className="leading-tight">
                  Happy Pet
                  <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-[#f9dcb7]">shop</span>
                </span>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-4">

                <Link
                    to="/user/products"
                    className={`${navItem} ${
                        isActive("/user/products") ? activeItem : inactiveItem
                    }`}
                >
                  <Bone className="h-4 w-4" /> Sản phẩm
                </Link>

                <Link
                    to="/user/pets"
                    className={`${navItem} ${
                        isActive("/user/pets") ? activeItem : inactiveItem
                    }`}
                >
                  <Heart className="h-4 w-4" /> Thú cưng
                </Link>

                {/*<Link*/}
                {/*    to="/user/services"*/}
                {/*    className={`${navItem} ${*/}
                {/*        isActive("/user/services") ? activeItem : "hover:bg-white/20"*/}
                {/*    }`}*/}
                {/*>*/}
                {/*  🛁 Dịch vụ*/}
                {/*</Link>*/}

                <Link
                    to="/user/cart"
                    className={`${navItem} ${
                        isActive("/user/cart") ? activeItem : inactiveItem
                    }`}
                >
                  <ShoppingCart className="h-4 w-4" /> Giỏ hàng
                </Link>

                {user ? (
                    <>
                      <Link
                          to="/user/invoices"
                          className={`${navItem} ${
                              isActive("/user/invoices") ? activeItem : inactiveItem
                          }`}
                      >
                        <FileText className="h-4 w-4" /> Hóa đơn
                      </Link>
                      <Link
                        to="/user/profile"
                        className={`${navItem} ${
                            isActive("/user/profile") ? activeItem : inactiveItem
                        }`}
                      >
                        <User className="h-4 w-4" /> Tài khoản
                      </Link>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className={`${navItem} ${inactiveItem}`}
                    >
                      <LogIn className="h-4 w-4" /> Đăng nhập
                    </Link>
                )}

              </div>

              {/* Mobile button */}
              <button
                  onClick={toggleMenu}
                  className="md:hidden p-2 rounded-lg hover:bg-white/15 transition"
                  aria-label="Mở menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden pb-4 pt-2 space-y-2">

                  <Link
                      to="/user/products"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block ${navItem} ${
                          isActive("/user/products") ? activeItem : inactiveItem
                      }`}
                  >
                    <Bone className="h-4 w-4" /> Sản phẩm
                  </Link>

                  <Link
                      to="/user/pets"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block ${navItem} ${
                          isActive("/user/pets") ? activeItem : inactiveItem
                      }`}
                  >
                    <Heart className="h-4 w-4" /> Thú cưng
                  </Link>

                  {/*<Link*/}
                  {/*    to="/user/services"*/}
                  {/*    onClick={() => setIsMenuOpen(false)}*/}
                  {/*    className={`block ${navItem} ${*/}
                  {/*        isActive("/user/services") ? activeItem : "hover:bg-white/20"*/}
                  {/*    }`}*/}
                  {/*>*/}
                  {/*  🛁 Dịch vụ*/}
                  {/*</Link>*/}

                  <Link
                      to="/user/cart"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block ${navItem} ${
                          isActive("/user/cart") ? activeItem : inactiveItem
                      }`}
                  >
                    <ShoppingCart className="h-4 w-4" /> Giỏ hàng
                  </Link>

                  {user ? (
                      <>
                        <Link
                            to="/user/invoices"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block ${navItem} ${
                                isActive("/user/invoices") ? activeItem : inactiveItem
                            }`}
                        >
                          <FileText className="h-4 w-4" /> Hóa đơn
                        </Link>
                        <Link
                            to="/user/profile"
                            onClick={() => setIsMenuOpen(false)}
                            className={`block ${navItem} ${
                                isActive("/user/profile") ? activeItem : inactiveItem
                            }`}
                        >
                          <User className="h-4 w-4" /> Tài khoản
                        </Link>
                      </>
                  ) : (
                      <Link
                          to="/login"
                          onClick={() => setIsMenuOpen(false)}
                          className={`block ${navItem} ${inactiveItem}`}
                      >
                        <LogIn className="h-4 w-4" /> Đăng nhập
                      </Link>
                  )}

                </div>
            )}
          </nav>
        </header>
      </>
  );
}
