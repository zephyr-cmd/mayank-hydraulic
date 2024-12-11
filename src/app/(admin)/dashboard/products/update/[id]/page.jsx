"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";
import { useParams } from "next/navigation";
// import { useParams } from "react-router-dom"; // Assuming React Router is used

export default function UpdateProduct() {
  const initialFormValue = {
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

  const [formData, setFormData] = useState(initialFormValue);
  let [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const { token } = useAuth();
  const params = useParams();
  // const { id } = "670e62707baa7a25c34f8096"; // Assuming `id` is passed as a route parameter
  const { id } = params; // Assuming `id` is passed as a route parameter

  useEffect(() => {
    fetchProductDetails();
    fetchCategories();
    fetchManufacturers();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(`/api/v2/product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      let productData = await response.json();
      setFormData({
        name: product?.name || "",
        description: product?.description || "",
        categoryId: product?.categoryId || "",
        manufacturerId: product?.manufacturerId || "",
        price: product?.price || "",
        specifications: product?.specifications || [{ key: "", value: "" }],
        images: product?.images || [""],
        inventory: product?.inventory || {
          quantity_in_stock: "",
          lead_time_days: "",
        },
        isPopular: product?.isPopular || false,
      });
      console.log(
        "L-38, product---------------->",
        params,
        product
        // "&&&&&&&",
        // productData?.product
      );
      if (response.ok) {
        setProduct(productData); // Correctly update product state
        const product = productData?.product; // Safely extract product
        setFormData({
          name: product?.name || "",
          description: product?.description || "",
          categoryId: product?.categoryId || "",
          manufacturerId: product?.manufacturerId || "",
          price: product?.price || "",
          specifications: product?.specifications || [{ key: "", value: "" }],
          images: product?.images || [""],
          inventory: product?.inventory || {
            quantity_in_stock: "",
            lead_time_days: "",
          },
          isPopular: product?.isPopular || false,
        });
      } else {
        throw new Error("Failed to fetch product details");
      }
    } catch (error) {
      console.error(error);
      toast("Failed to load product details", { type: "error" });
    }
  };

  const fetchCategories = async () => {
    const response = await fetch("/api/v2/category");
    const fetchedData = await response.json();
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
      const cleanedFormData = {
        ...formData,
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price) || 0,
        specifications: formData.specifications.map((spec) => ({
          key: spec.key.trim(),
          value: spec.value.trim(),
        })),
        images: formData.images.filter((img) => img.trim()),
        inventory: {
          quantity_in_stock:
            parseInt(formData.inventory.quantity_in_stock, 10) || 0,
          lead_time_days: parseInt(formData.inventory.lead_time_days, 10) || 0,
        },
      };
      console.log("L-146, handleSubmit--------->", token);
      const response = await fetch(`/api/v2/product/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      toast("Product updated successfully", {});
    } catch (error) {
      console.error(error);
      toast(`${error}`, { type: "error" });
    }
  };

  console.log("L-143, formData-------------->", formData?.categoryId?.name);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        Update : {`${formData?.name}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded"
        />

        <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
          <select
            value={formData?.categoryId?._id}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="p-2 border rounded w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={formData?.manufacturerId?._id}
            onChange={(e) =>
              setFormData({ ...formData, manufacturerId: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select Manufacturer</option>
            {manufacturers.map((manufacturer) => (
              <option key={manufacturer._id} value={manufacturer._id}>
                {manufacturer.name}
              </option>
            ))}
          </select>
        </div>
        {/* Specifications */}
        <div>
          <h3 className="font-semibold">Specifications</h3>
          {formData.specifications.map((spec, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Key"
                value={spec.key}
                onChange={(e) => {
                  const newSpecs = [...formData.specifications];
                  newSpecs[index].key = e.target.value;
                  setFormData({ ...formData, specifications: newSpecs });
                }}
                className="w-1/2 p-2 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Value"
                value={spec.value}
                onChange={(e) => {
                  const newSpecs = [...formData.specifications];
                  newSpecs[index].value = e.target.value;
                  setFormData({ ...formData, specifications: newSpecs });
                }}
                className="w-1/2 p-2 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => handleRemoveSpecification(index)}
              >
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSpecification}
            className="text-green-600 underline text-sm"
          >
            + Add Specification
          </button>
        </div>

        {/* Images */}
        <div>
          <h3 className="font-semibold">Images</h3>
          {formData.images.map((image, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => {
                  const newImages = [...formData.images];
                  newImages[index] = e.target.value;
                  setFormData({ ...formData, images: newImages });
                }}
                className="w-full p-2 border rounded"
                required
              />
              <button type="button" onClick={() => handleRemoveImage(index)}>
                ❌
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="text-green-600 underline text-sm"
          >
            + Add Image
          </button>
        </div>

        {/* Inventory */}
        <div>
          <h3 className="font-semibold">Inventory</h3>
          <input
            type="number"
            placeholder="Quantity in Stock"
            value={formData?.inventory?.quantity_in_stock}
            onChange={(e) =>
              setFormData({
                ...formData,
                inventory: {
                  ...formData.inventory,
                  quantity_in_stock: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded mb-2"
            required
          />
          <input
            type="number"
            placeholder="Lead Time (days)"
            value={formData?.inventory?.lead_time_days}
            onChange={(e) =>
              setFormData({
                ...formData,
                inventory: {
                  ...formData.inventory,
                  lead_time_days: e.target.value,
                },
              })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Popular Product */}
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData?.isPopular}
              onChange={(e) =>
                setFormData({ ...formData, isPopular: e.target.checked })
              }
              className="mr-2"
            />
            Popular Product
          </label>
        </div>

        {/* Add the rest of the form components (Specifications, Images, Inventory, etc.) similar to CreateProduct */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
