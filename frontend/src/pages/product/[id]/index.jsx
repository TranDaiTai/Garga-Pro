// src/pages/product/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Star,
  ChevronLeft,
} from "lucide-react";
import Pagination from "@/components/common/Pagination";
import ProductCard from "@/components/common/ProductCard";
import { productApi } from "@/api/product/product.services";
import { reviewApi } from "@/api/review/review.services";
import ProductImage from "@/components/common/ProductImage";
import ProductInfo from "@/components/common/ProductInfo";
import ReviewComponent from "@/components/common/review";
// Sample products data - same as products page
const SAMPLE_PRODUCTS = [
 
];

export default function ProductDetailPage() {
  const { id } = useParams(); // ← Đây mới là cách đúng!
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [review,setReview] = useState(); 

  useEffect(() => {
    const fectProductById = async () => {
      const res = await productApi.getProductById(id);
      setProduct(res.data);
      // console.log(res.data);
    };
    const fectReviewsProduct = async () => {
      const res = await reviewApi.getReviewsProduct(id);
      setReview(res.data);
    };
    fectProductById();
    fectReviewsProduct();
  }, [id]);
  // Tìm sản phẩm theo id (chuyển string → number)

  // Nếu không tìm thấy sản phẩm
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-foreground">
            Không tìm thấy sản phẩm
          </h1>
          <button
            onClick={() => navigate("/product")}
            className="text-accent hover:underline flex items-center gap-2 mx-auto"
          >
            <ChevronLeft className="w-5 h-5" />
            Quay lại danh sách
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Nút quay lại */}
      <div className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Ảnh sản phẩm */}
          <ProductImage product={product} />
          {/* Thông tin sản phẩm */}
          <ProductInfo product={product} />
        </div>

        {/* Detailed Description */}
        <div className="border-t border-border pt-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Chi tiết sản phẩm
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {product.fullDescription}
            </p>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              Thông số kỹ thuật
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-secondary rounded-lg p-4">
                    <p className="text-sm text-muted-foreground capitalize mb-1">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-semibold text-foreground">
                      {String(value)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className=" grid grid-cols-[65%_35%] border-t border-border pt-8 space-y-8">
          {/* Reviews Header */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              ĐÁNH GIÁ SẢN PHẨM
            </h2>

            <ReviewComponent
              product={product}
              review={review}
            />

            {/* Pagination */}
            <Pagination currentPage={1} totalPages={2} onPageChange={null} />
          </div>
          <div></div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.filter(
              (p) => p.category === product.category && p.id !== product.id
            )
              .slice(0, 4)
              .map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
          </div>
          <div className="flex justify-center mt-6">
            <button className="relative w-20 h-auto rounded-sm ">
              Xem thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
