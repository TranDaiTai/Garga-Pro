import { Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import { Breadcrumb } from "./Breadcrumb";

export function CartEmpty({
  url_continue_shopping = "/product",
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
     <Breadcrumb/>

      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Giỏ hàng trống
          </h2>
          <p className="text-muted-foreground mb-6">
            Hãy thêm sản phẩm để bắt đầu mua sắm
          </p>
          <Link
            to={url_continue_shopping}
            className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    </div>
  );
}
