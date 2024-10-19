"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";

export default function CreateNewCategory() {
  const router = useRouter();
  const { token } = useAuth();
  const initialFormValue = {
    name: "",
    description: "",
    image: "",
  };

  const [formData, setFormData] = useState(initialFormValue);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the image URL starts with "/"
    const cleanedImageUrl = formData.image.startsWith("/")
      ? formData.image
      : `/${formData.image.trim()}`;

    try {
      const cleanedFormData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: cleanedImageUrl,
      };

      const response = await fetch("/api/v2/category", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) throw new Error("Failed to create category");

      toast("Category created successfully", {});
      setFormData(initialFormValue); // Reset form on success
      router.push("/dashboard/categories");
    } catch (error) {
      toast(`${error.message}`, {});
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        {/* Image URL */}
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full p-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
