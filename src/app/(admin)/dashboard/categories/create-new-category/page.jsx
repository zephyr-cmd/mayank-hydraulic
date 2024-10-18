"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import { toast } from "sonner";

export default function CreateNewManufacturer() {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    contact_details: {
      phone: "",
      email: "",
      address: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update formData based on the input name
    if (name.startsWith("contact_")) {
      const field = name.split("contact_")[1];
      setFormData((prev) => ({
        ...prev,
        contact_details: { ...prev.contact_details, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/v2/manufacturer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast("Manufacturer created successfully!", {});
        router.push("/dashboard/manufacturers");
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to create manufacturer.");
      }
    } catch (error) {
      console.error("Error creating manufacturer:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Manufacturer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name} // Use value instead of defaultValue
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Logo Field */}
        <div>
          <label htmlFor="logo" className="block font-medium">
            Logo (URL)
          </label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={formData.logo} // Use value instead of defaultValue
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="contact_phone" className="block font-medium">
            Phone
          </label>
          <input
            type="text"
            id="contact_phone"
            name="contact_phone" // Update id to match name
            value={formData.contact_details.phone} // Use value instead of defaultValue
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact_email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="contact_email" // Update id to match name
            name="contact_email" // Update id to match name
            value={formData.contact_details.email} // Use value instead of defaultValue
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="contact_address" className="block font-medium">
            Address
          </label>
          <textarea
            id="contact_address" // Update id to match name
            name="contact_address" // Update id to match name
            value={formData.contact_details.address} // Use value instead of defaultValue
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Manufacturer"}
        </button>
      </form>
    </div>
  );
}
