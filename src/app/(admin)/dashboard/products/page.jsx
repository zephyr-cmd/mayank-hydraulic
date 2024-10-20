"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import DeleteConfirmationModal from "@/app/(admin)/_resources/modalForm/DeleteConfirmationModal";
import { toast } from "sonner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [nextCursor, setNextCursor] = useState(null);
  const [prevCursor, setPrevCursor] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth(); // Step 4: Access the context
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true); // Open the modal
  };
  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/v2/product/${selectedProductId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("L-31, res------------------->", res);
      if (res.ok) {
        console.log("Product deleted successfully!");
        fetchProducts(); // Refresh products
        setIsModalOpen(false);
        toast("Product deleted successfully!", {});
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setIsModalOpen(false); // Close modal on error too
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  // Fetch products with pagination
  const fetchProducts = async (cursor = "", direction = "next") => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v2/product?limit=10&cursor=${cursor}&direction=${direction}`
      );
      const data = await res.json();
      setProducts(data.products);
      setTotalDocs(data.totalDocs);
      setNextCursor(data.nextCursor);
      setPrevCursor(data.prevCursor);
      setHasNextPage(data.hasNextPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  // Fetch products on mount
  useEffect(() => {
    // const savedToken = localStorage.getItem("token");
    // if (savedToken) {
    //   setToken(savedToken);
    // }
    fetchProducts();
  }, []);

  // Handle Delete Product
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await fetch(`/api/v2/product/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("L-210, res------------------->", res);
  //     if (res.ok) {
  //       alert("Product deleted successfully!");
  //       fetchProducts(); // Refresh products
  //     } else {
  //       alert("Failed to delete product.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  return (
    <div className="container mx-auto p-4">
      {/* Top Section: Product Info and Create Button */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">
          Products {products.length} / {totalDocs}
        </span>
        <Link href="products/create-newproduct">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New Product
          </button>
        </Link>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="border rounded shadow p-4 bg-white m-5"
            >
              <div className="relative flex gap-1 sm:gap-2 items-center justify-center w-full aspect-square rounded-lg border border-blue-700">
                <Image
                  src={product?.images[0]}
                  alt={product.name}
                  fill
                  style={{
                    objectFit: "contain",
                    overflow: "hidden",
                  }}
                  priority={false}
                  placeholder="blur"
                  blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-700">Price: ₹ {product.price}</p>
              <p className="text-gray-600">
                Manufacturer: {product.manufacturerId?.name || "N/A"}
              </p>
              <p className="text-gray-600">
                Category: {product.categoryId?.name || "N/A"}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => alert(`Update product ${product._id}`)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => fetchProducts(prevCursor, "prev")}
          disabled={!prevCursor}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchProducts(nextCursor, "next")}
          disabled={!hasNextPage}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
