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
    const cleanedLogoUrl = formData.logo.startsWith("/")
      ? formData.logo
      : `/${formData.logo.trim()}`;
    setLoading(true);

    try {
      // console.debug("L-44, formData-------->", formData);
      const cleanedFormData = {
        name: formData.name.trim(),
        logo: cleanedLogoUrl,
        contact_details: {
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.address.trim(),
        },
      };
      // console.debug("L54, formData-------->", cleanedFormData);
      const res = await fetch("/api/v2/manufacturer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedFormData),
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
              <BreadcrumbPage>Create Manufacturer</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* <h2 className="text-2xl font-semibold mb-4">Create New Manufacturer</h2> */}
      </div>
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
            defaultValue={formData.name}
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
            defaultValue={formData.logo}
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
            id="phone"
            name="phone"
            defaultValue={formData.contact_details.phone}
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
            id="email"
            name="email"
            defaultValue={formData.contact_details.email}
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
            id="address"
            name="address"
            defaultValue={formData.contact_details.address}
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
