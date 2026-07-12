"use client";

import ProductCard from "./components/ProductCard";
import CategoryFilter from "./components/CategoryFilter";
import PriceFilter from "./components/PriceFilter";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

import {useProductManager} from "./hooks/useProductManager";
import {useEffect, useState} from "react";
import type {ProductResponse} from "@/types/productTypes";
import Loader from "@/components/ui/loader";
import axios from "axios";
import {getAllProducts} from "@/services/productService";
import {getAllCategories} from "@/services/categoryService";
import {Bone, Sparkles} from "lucide-react";

export default function ProductsPage() {
  const ITEMS_PER_PAGE = 12;

  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories(),
        ]);

        setProducts(productsData);
        
        const categoryNames = categoriesData.map((cat) => cat.name);
        setCategories(["All", ...categoryNames]);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Lỗi từ server");
        } else {
          setError("Lỗi không xác định");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    selectedCategories,
    // searchQuery,
    minPrice,
    maxPrice,
    sortBy,
    currentPage,
    paginatedProducts,
    totalItems,
    totalPages,
    startIndex,
    endIndex,
    handleCategoryChange,
    handleSearch,
    handlePriceFilterChange,
    handleSort,
    handlePageChange,
    resetFilters,
  } = useProductManager({
    products: products,
    itemsPerPage: ITEMS_PER_PAGE,
  });

  return (
      <div className="pet-page min-h-screen font-body">
        {error && (
            <div className="max-w-7xl mx-auto px-4 mt-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex justify-between items-center shadow-sm">

                <span>{error}</span>

                <button
                    onClick={() => setError(null)}
                    className="ml-4 text-red-700 font-bold"
                >
                  ✕
                </button>

              </div>
            </div>
        )}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <section className="mb-8 overflow-hidden rounded-lg bg-[#6f4a2f] text-white shadow-xl shadow-[#6f4a2f]/15">
            <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-10">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-semibold text-[#ffe2bd]">
                  <Sparkles className="h-4 w-4" /> Chọn đồ xịn cho boss nhỏ
                </div>
                <h1 className="max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
                  Góc mua sắm ấm áp cho thú cưng khỏe mạnh, vui vẻ mỗi ngày
                </h1>
                <p className="mt-4 max-w-xl text-[#f4ddc6]">
                  Thức ăn, phụ kiện và đồ chăm sóc được sắp xếp dễ tìm để bạn chọn nhanh món phù hợp.
                </p>
              </div>
              <div className="grid content-end gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {["Dinh dưỡng", "Đồ chơi", "Chăm sóc", "Phụ kiện"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 p-4 backdrop-blur">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#f7b267] text-[#4b3525]">
                      <Bone className="h-5 w-5" />
                    </span>
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mb-8">
            <SearchBar onSearch={handleSearch}/>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            <div className="lg:col-span-1 space-y-6">

              <div className="pet-surface rounded-lg p-5">
                <CategoryFilter
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onCategoriesChange={handleCategoryChange}
                    layout="sidebar"
                />
              </div>

              <div className="pet-surface rounded-lg p-5">
                <PriceFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    onMinChange={(value) => handlePriceFilterChange(value, maxPrice)}
                    onMaxChange={(value) => handlePriceFilterChange(minPrice, value)}
                    onSort={handleSort}
                    currentSort={sortBy}
                />
              </div>

            </div>


            <div className="lg:col-span-3">

              <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">

                <p className="text-gray-700 text-lg">
                  Tìm thấy{" "}
                  <span className="font-bold text-[#9f5f36]">
                {totalItems}
              </span>{" "}
                  sản phẩm
                </p>

              </div>


              {paginatedProducts.length > 0 ? (

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

                    {paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description?? ""}
                            price={product.price}
                            image={product.imageUrl?? ""}
                            availableAmount={product.quantity}
                            category={product.categoryName}
                        />
                    ))}

                  </div>

              ) : (

                  /* EMPTY STATE */

                  <div className="pet-surface rounded-lg p-12 text-center">

                    <div className="text-6xl mb-4">🐶</div>

                    <h2 className="text-2xl font-bold text-[#3d2b1f] mb-2">
                      Không tìm thấy sản phẩm
                    </h2>

                    <p className="text-gray-600 mb-6">
                      Không có sản phẩm nào phù hợp với bộ lọc của bạn.
                    </p>

                    <button
                        onClick={resetFilters}
                        className="bg-[#9f5f36] hover:bg-[#7d4525] text-white font-semibold py-2 px-6 rounded-lg transition"
                    >
                      Xóa tất cả bộ lọc
                    </button>

                  </div>

              )}


              {/* PAGINATION */}
              {totalItems > 0 && (

                  <div className="mt-10">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        totalItems={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        startIndex={startIndex}
                        endIndex={endIndex}
                    />
                  </div>

              )}

            </div>
          </div>
        </div>


        {/* LOADING */}
        {loading && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
              <Loader/>
            </div>
        )}

      </div>
  );
}
