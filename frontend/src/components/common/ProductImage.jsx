import { useState } from "react";

const  ProductImage = ({ product }) => {
  const productImages =  product?.image || []
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  return (
    <div className="space-y-4">
      <div className="bg-secondary rounded-xl p-8 h-96 flex items-center justify-center top-24">
        <img
          src={productImages[selectedImageIndex] || "/placeholder.svg"}
          alt={product?.name}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {productImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImageIndex(idx)}
              className={`shrink-0 w-20 h-20 rounded-lg border-2 transition-all ${
                selectedImageIndex === idx
                  ? "border-accent"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover rounded-md"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductImage;