"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronDownIcon, SlashIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      <div className="flex flex-col gap-2 mb-7 justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  Components
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/dashboard/products">
                      Products
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/dashboard/categories">
                      Categories
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BreadcrumbLink href="/dashboard/manufacturers">
                      Manufacturers
                    </BreadcrumbLink>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Creat Category</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <h2 className="text-2xl font-semibold mb-4">Create New Category</h2> */}
      </div>
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
