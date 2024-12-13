"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";

export default function UpdateCategory() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const { id } = params || {};
  const initialFormValue = {
    name: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);

  // Fetch the category details when component mounts
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/v2/category/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch category details");

        const categoryData = await response.json();
        const data = categoryData.category;

        // console.log("L -36, Fetched Data:", data);

        setFormData({
          name: data.name || "",
          description: data.description || "",
          image: Array.isArray(data.image) ? data.image[0] : data.image || "",
        });
      } catch (error) {
        toast(`Error: ${error.message}`, {});
        console.error(error);
      }
    };

    fetchCategory();
  }, [id, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanedImageUrl =
      formData.image && formData.image.startsWith("/")
        ? formData.image
        : `/${(formData.image || "").trim()}`;

    try {
      const cleanedFormData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: cleanedImageUrl,
      };

      const response = await fetch(`/api/v2/category/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) throw new Error("Failed to update category");

      toast("Category updated successfully", {});
      router.push("/dashboard/categories");
    } catch (error) {
      toast(`${error.message}`, {});
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Update Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Category Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Image URL
          </label>
          <input
            id="image"
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Category"}
        </button>
      </form>
    </div>
  );
}
