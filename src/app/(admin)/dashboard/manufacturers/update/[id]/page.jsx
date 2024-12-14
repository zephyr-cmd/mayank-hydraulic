"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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

export default function UpdateManufacturer() {
  const router = useRouter();
  const params = useParams();
  const { token } = useAuth();
  const { id } = params || {};
  const initialFormValue = {
    name: "",
    logo: "",
    contact_details: {
      phone: "",
      email: "",
      address: "",
    },
  };

  const [formData, setFormData] = useState(initialFormValue);
  const [loading, setLoading] = useState(false);

  // Fetch manufacturer details when the component mounts
  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const response = await fetch(`/api/v2/manufacturer/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok)
          throw new Error("Failed to fetch manufacturer details");

        const manufacturerData = await response.json();
        const data = manufacturerData.manufacturer;

        // console.log("L-41, Fetched Data:", data);

        setFormData({
          name: data.name || "",
          logo: data.logo || "",
          contact_details: {
            phone: data.contact_details?.phone || "",
            email: data.contact_details?.email || "",
            address: data.contact_details?.address || "",
          },
        });
      } catch (error) {
        toast(`Error: ${error.message}`, {});
        console.error(error);
      }
    };

    fetchManufacturer();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested contact details separately
    if (["phone", "email", "address"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        contact_details: {
          ...prev.contact_details,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ensure the logo URL is cleaned
    const cleanedLogoUrl =
      formData.logo && formData.logo.startsWith("/")
        ? formData.logo
        : `/${(formData.logo || "").trim()}`;

    try {
      const cleanedFormData = {
        name: formData.name.trim(),
        logo: cleanedLogoUrl,
        contact_details: {
          phone: formData.contact_details.phone.trim(),
          email: formData.contact_details.email.trim(),
          address: formData.contact_details.address.trim(),
        },
      };

      const response = await fetch(`/api/v2/manufacturer/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cleanedFormData),
      });

      if (!response.ok) throw new Error("Failed to update manufacturer");

      toast("Manufacturer updated successfully", {});
      router.push("/dashboard/manufacturers");
    } catch (error) {
      toast(`Error: ${error.message}`, {});
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-2 justify-between">
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
              <BreadcrumbPage>Manufacturer Update</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h2 className="text-2xl font-semibold mb-4">{`${formData?.name}`}</h2>
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
            value={formData.name}
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
            value={formData.logo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.contact_details.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.contact_details.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address Field */}
        <div>
          <label htmlFor="address" className="block font-medium">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.contact_details.address}
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
          {loading ? "Updating..." : "Update Manufacturer"}
        </button>
      </form>
    </div>
  );
}
