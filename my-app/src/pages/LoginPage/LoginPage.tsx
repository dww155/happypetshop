"use client";

import {useEffect, useState} from "react";
import {useLogin} from "./useLogin.ts";
import Loader from "../../components/ui/loader.tsx";
import {Link, useLocation} from "react-router-dom";
import {Eye, EyeOff, PawPrint} from "lucide-react";

export default function LoginPage() {
  const {
    username,
    password,
    errors,
    isLoading,
    setUsername,
    setPassword,
    handleSubmit,
    clearError,
  } = useLogin();
  const location = useLocation();
  const notAdmin = !location.pathname.includes("/admin");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "auto";
  }, [isLoading]);

  return (
      <div
          className="pet-page min-h-screen flex items-center justify-center px-4 relative overflow-hidden">

        {/* Paw decoration */}
        {/* Loader overlay */}
        {isLoading && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <Loader/>
            </div>
        )}

        <div
            className={`w-full max-w-md transition-all duration-300 ${
                isLoading ? "opacity-40 pointer-events-none scale-95" : ""
            }`}
        >
          <div className="pet-card rounded-lg p-8">

            {/* Header */}
            <div className="text-center mb-8">

              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-lg bg-[#f7b267] text-[#4b3525]">
                <PawPrint className="h-9 w-9" />
              </div>

              <h2 className="text-3xl font-black text-[#3d2b1f]">
                Happy Pet Shop
              </h2>

              <p className="text-[#6d5a49] text-sm mt-1">
                Chăm sóc thú cưng với tình yêu
              </p>

              <div className="mt-4 text-lg font-semibold text-[#9f5f36]">
                Đăng nhập hệ thống
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Error */}
              {errors.general && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {errors.general}
                  </div>
              )}

              {/* username */}
              <div>
                <label className="block text-sm font-semibold text-[#4b3525] mb-1">
                  Tên đăng nhập
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      clearError("username");
                    }}
                    placeholder="Nhập username"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition ${
                        errors.username
                            ? "border-red-500 focus:ring-red-400"
                            : "border-[#d8c1ab] focus:ring-[#f7b267]"
                    }`}
                />

                {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#4b3525] mb-1">
                  Mật khẩu
                </label>

                <div className="relative">
                  <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        clearError("password");
                      }}
                      placeholder="Nhập mật khẩu"
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 transition pr-12 ${
                          errors.password
                              ? "border-red-500 focus:ring-red-400"
                              : "border-[#d8c1ab] focus:ring-[#f7b267]"
                      }`}
                  />

                  {/* Eye Button */}
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#8f7b6b] hover:bg-[#f5eadc] hover:text-[#4b3525]"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Options */}
              <div className="flex items-center justify-between text-sm">

                <label className="flex items-center gap-2 text-[#6d5a49]">
                  <input
                      type="checkbox"
                      className="w-4 h-4 accent-[#9f5f36] rounded focus:ring-[#f7b267]"
                  />
                  Ghi nhớ
                </label>

                <Link
                    to="/forgot-password"
                    className="text-[#9f5f36] hover:text-[#6f4a2f] font-medium"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {/* Button */}
              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-lg font-semibold text-white bg-[#9f5f36] hover:bg-[#7d4525] transition disabled:opacity-50"
              >
                {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
              </button>

            </form>


            {/* Register */}
            {
                notAdmin &&
                <>
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-[#ead9c6]"></div>
                    <span className="px-3 text-sm text-[#8f7b6b]">hoặc</span>
                    <div className="flex-1 border-t border-[#ead9c6]"></div>
                  </div>
                  <p className="text-center text-sm text-[#6d5a49]">
                    Chưa có tài khoản?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-[#9f5f36] hover:text-[#6f4a2f]"
                    >
                      Đăng ký ngay
                    </Link>
                  </p>
                </>
            }

          </div>

          {/* Footer */
          }
          <p className="text-center text-xs text-[#8f7b6b] mt-6">
            © 2026 Happy Pet Shop
          </p>
        </div>
      </div>
  );
}
