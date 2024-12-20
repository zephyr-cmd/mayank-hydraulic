"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/(admin)/dashboard/_utils/AuthContext";
import DeleteConfirmationModal from "@/app/(admin)/_resources/modalForm/DeleteConfirmationModal";
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

export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);

  const handleDeleteClick = (manufacturerId) => {
    setSelectedManufacturerId(manufacturerId);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `/api/v2/manufacturer/${selectedManufacturerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast("Manufacturer deleted successfully!", {});
        fetchManufacturers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting manufacturer:", error);
      setIsModalOpen(false);
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  const fetchManufacturers = async (cursor = "", direction = "next") => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/v2/manufacturer?limit=10&cursor=${cursor}&direction=${direction}`
      );
      const data = await res.json();
      setManufacturers(data.manufacturers);
      setTotalDocs(data.totalDocs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManufacturers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 px-5">
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
                  <DropdownMenuItem>Manufacturers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>Manufacturers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <span className="text-lg font-semibold">
          Total Manufacturers : {totalDocs}
        </span>
        <Link href="manufacturers/create-new-manufacturer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create New Manufacturer
          </button>
        </Link>
      </div>

      {/* Manufacturer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 px-5"> */}
        {loading ? (
          <p className="p-5 text-blue-700 min-h-[500px]">
            Loading manufacturers...
          </p>
        ) : (
          manufacturers.map((manufacturer) => (
            <div
              key={manufacturer._id}
              className="border rounded shadow p-4 bg-white m-5"
            >
              <div className="relative flex items-center justify-center w-full aspect-square rounded-lg border border-blue-700">
                {manufacturer.logo && manufacturer.logo.trim().length > 0 ? (
                  <Image
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    fill
                    style={{ objectFit: "contain" }}
                    priority={false}
                    placeholder="blur"
                    blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <p>No Logo</p>
                )}
              </div>
              <h2 className="text-xl font-semibold">{manufacturer.name}</h2>
              {/* <p className="text-gray-700">
                Contact: {manufacturer?.contact_details?.phone || "N/A"}
              </p>
              <p className="text-gray-700">
                Email: {manufacturer?.contact_details?.email || "N/A"}
              </p>
              <p className="text-gray-600">
                Address: {manufacturer?.contact_details?.address || "N/A"}
              </p> */}
              <p className="text-gray-600">
                Products: {manufacturer?.products?.length}
              </p>
              <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
                <Link
                  href={`/dashboard/manufacturers/update/${manufacturer._id}`}
                  className="bg-yellow-400 text-black text-center px-3 py-1 rounded"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDeleteClick(manufacturer._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
