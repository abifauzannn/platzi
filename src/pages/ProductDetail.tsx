// src/pages/ProductDetail.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: { id: number; name: string; image: string };
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Extract the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return (
    <div className="">
      <Header />
      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      ) : (
        <div className="p-6">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col w-[40%]">
              <img
                src={product?.images[0]}
                alt={product?.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
            </div>
            <div className="flex flex-col w-[100%]">
              <h1 className="text-2xl font-semibold mb-4">{product?.title}</h1>
              <p className="text-gray-600">{product?.description}</p>
              <p className="text-xl font-semibold mt-4">${product?.price}</p>
              <p className="text-gray-500 mt-2">
                Category: {product?.category.name}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
