"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";
import { RefreshIcon } from "@/components/icons/icons2";

export default function CreateProduct() {
  const intialFormVaule = {
    name: "",
    description: "",
    categoryId: "",
    manufacturerId: "",
    price: "",
    specifications: [{ key: "", value: "" }],
    images: [""],
    inventory: { quantity_in_stock: "", lead_time_days: "" },
    isPopular: false,
  };
  const [formData, setFormData] = useState(intialFormVaule);

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showManufacturerModal, setShowManufacturerModal] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    fetchCategories();
    fetchManufacturers();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/v2/category");
    const fetchedData = await response.json();
    // console.log("L-35 response", fetchedData.categories);
    setCategories(fetchedData.categories);
  };

  const fetchManufacturers = async () => {
    const response = await fetch("/api/v2/manufacturer");
    const fetchedData = await response.json();
    setManufacturers(fetchedData.manufacturers);
  };

  const handleAddSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const handleRemoveSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const handleAddImage = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ""],
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // console.log("L-7, token-------->", token);
      const cleanedFormData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0,
        specifications: formData.specifications.map((spec) => ({
          key: spec.key.trim(),
          value: spec.value.trim(),
        })),
        images: formData.images.filter((img) => img.trim()), // Remove empty images
        inventory: {
          quantity_in_stock:
            parseInt(formData.inventory.quantity_in_stock, 10) || 0,
          lead_time_days: parseInt(formData.inventory.lead_time_days, 10) || 0,
        },
      };
      const response = await fetch("/api/v2/product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to create product");
      }

      console.log("Product submitted successfully");
      toast("Product submitted successfully", {});
      setFormData(intialFormVaule);
    } catch (error) {
      toast(`${error}`, {});
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="flex flex-row gap-5">
          <input
            type="text"
            placeholder="Product Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="Number"
            placeholder="Product Price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        {/* Category Selection with Modal */}
        <div className="flex items-center space-x-4">
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="w-3/4 p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="w-1/4 gap-3 flex items-center ">
            <button
              type="button"
              onClick={fetchCategories}
              className="text-blue-500 hover:text-blue-700 px-7 border-r-2 border-black"
            >
              <RefreshIcon />
            </button>
            <button
              type="button"
              onClick={() => setShowCategoryModal(true)}
              className="text-blue-500 hover:text-blue-700 pl-5"
            >
              Create New Category
            </button>
          </div>
        </div>

        {/* Manufacturer Selection with Modal */}
        <div className="flex items-center space-x-4">
          <select
            value={formData.manufacturerId}
            onChange={(e) =>
              setFormData({ ...formData, manufacturerId: e.target.value })
            }
            className="w-3/4 p-2 border rounded"
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.name}
              </option>
            ))}
          </select>
          <div className="w-1/4 gap-3 flex items-center ">
            <button
              type="button"
              onClick={fetchManufacturers}
              className="text-blue-500 hover:text-blue-700 px-7 border-r-2 border-black"
            >
              <RefreshIcon />
            </button>
            <button
              type="button"
              onClick={() => setShowManufacturerModal(true)}
              className="text-blue-500 hover:text-blue-700 pl-5"
            >
              Create New Manufacturer
            </button>
          </div>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-2">Specifications</h3>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Key"
                value={spec.key}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updatedSpecs = [...prev.specifications];
                    updatedSpecs[index].key = e.target.value;
                    return { ...prev, specifications: updatedSpecs };
                  })
                }
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updatedSpecs = [...prev.specifications];
                    updatedSpecs[index].value = e.target.value;
                    return { ...prev, specifications: updatedSpecs };
                  })
                }
                className="w-1/2 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpecification(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpecification}
            className="text-green-500"
          >
            + Add Specification
          </button>
        </div>

        {/* Images */}
        <div>
          <h3 className="font-semibold mb-2">Images</h3>
          {formData.images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) =>
                  setFormData((prev) => {
                    const updatedImages = [...prev.images];
                    updatedImages[index] = e.target.value;
                    return { ...prev, images: updatedImages };
                  })
                }
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-green-500"
          >
            + Add Image
          </button>
        </div>

        {/* Inventory */}
        <input
          type="number"
          placeholder="Quantity in Stock"
          value={formData.inventory.quantity_in_stock}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              inventory: {
                ...prev.inventory,
                quantity_in_stock: e.target.value,
              },
            }))
          }
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          placeholder="Lead Time (days)"
          value={formData.inventory.lead_time_days}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              inventory: { ...prev.inventory, lead_time_days: e.target.value },
            }))
          }
          className="w-full p-2 border rounded"
        />

        {/* Popular Product */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPopular}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, isPopular: e.target.checked }))
            }
          />
          <label className="ml-2">Popular Product</label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Create Product
        </button>
      </form>

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>Create New Category</h2>
            {/* Form to create a new category */}
          </div>
        </div>
      )}

      {/* Manufacturer Modal */}
      {showManufacturerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2>Create New Manufacturer</h2>
            {/* Form to create a new manufacturer */}
          </div>
        </div>
      )}
    </div>
  );
}
