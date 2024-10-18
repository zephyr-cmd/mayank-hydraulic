"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import DeleteConfirmationModal from "@/app/(admin)/_resources/modalForm/DeleteConfirmationModal";
import { toast } from "sonner";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  //   const [nextCursor, setNextCursor] = useState(null);
  //   const [prevCursor, setPrevCursor] = useState(null);
  //   const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleDeleteClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/v2/category/${selectedCategoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast("Category deleted successfully!", {});
        fetchCategories();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const fetchCategories = async (cursor = "", direction = "next") => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v2/category?limit=10&cursor=${cursor}&direction=${direction}`
      );
      const data = await res.json();
      setCategories(data.categories);
      setTotalDocs(data.totalDocs);
      //   setNextCursor(data.nextCursor);
      //   setPrevCursor(data.prevCursor);
      //   setHasNextPage(data.hasNextPage);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">
          Total Categories = {totalDocs}
        </span>
        <Link href="categories/create-new-category">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New Category
          </button>
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="border rounded shadow p-4 bg-white m-5"
            >
              <div className="relative flex items-center justify-center w-full aspect-square rounded-lg border border-blue-700">
                {category.image[0] && category.image[0].trim().length > 1 ? (
                  <Image
                    src={category.image[0]}
                    alt={category.name}
                    fill
                    style={{ objectFit: "contain" }}
                    priority={true}
                  />
                ) : (
                  <p>No Image</p>
                )}
              </div>
              <h2 className="text-xl font-semibold">{category.name}</h2>
              <p className="text-gray-700">{category.description}</p>
              <p className="text-gray-600">
                Products: {category.products.length}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => alert(`Update category ${category._id}`)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteClick(category._id)}
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
      {/* <div className="flex justify-between mt-6">
        <button
          onClick={() => fetchCategories(prevCursor, "prev")}
          disabled={!prevCursor}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => fetchCategories(nextCursor, "next")}
          disabled={!hasNextPage}
          className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div> */}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
