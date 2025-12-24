// src/pages/product/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, ChevronLeft } from "lucide-react";
import ProductCard from "@/components/common/ProductCard";
import { productApi } from "@/api/product/product.services";
import ProductImage from "@/components/common/ProductImage";
import ProductInfo from "@/components/common/ProductInfo";
import ReviewComponent from "@/components/common/review";
// Sample products data - same as products page

export default function ProductDetailPage() {
  const { id } = useParams(); // ← Đây mới là cách đúng!
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState();
  const [pagination,setPagination] = useState();
  useEffect(() => {
    const fectProductById = async () => {
      const res = await productApi.getProductById(id);
      setProduct(res.data.product);
      setPagination(res.data.pagination) ; 
    };
    fectProductById();
  }, [id]);

  useEffect(() => {
   
    const fectRelatedProduct = async () => {
      const params = new URLSearchParams();
      params.set("categories", product.categoryId);
      const res = await productApi.getProducts(params);
      setRelatedProduct(res.data.product);
    };
    const fectAll = () =>{
      if ( product ){
        fectRelatedProduct();
      }
    }
    fectAll() ;
    
  }, [product]);
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
            />
          </div>

          <div></div>
        </div>

        {/* Related Products */}
        <div className="mt-16 border-t border-border pt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Sản phẩm liên quan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProduct && relatedProduct
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
