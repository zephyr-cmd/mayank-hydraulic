"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Logout } from "../_utils/logout";
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

function Home() {
  const [status, setStatus] = useState([]);
  const [clientData, setClientData] = useState([]);

  let fetchedData = useCallback(async (token) => {
    try {
      let response = await fetch(`/api/v2/client/free-consultation`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      setClientData(data?.clientData);
      // console.log("L-29, fetchedData---------->", data?.clientData, clientData);
      if (response.status == 401 || response.status == 500) {
        setStatus(response.status);
        setMessage(data.message);
        localStorage.clear();
        Logout();
        return;
      } else if (response.status == 403) {
        setStatus(response.status);
        setMessage("Token expired, Kindly logout & login again !");
        return;
      } else {
        setStatus(response.status);
      }
    } catch (error) {
      throw new Error("Bad fetch response");
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    fetchedData(token);
  }, [fetchedData]);

  if (status !== 200) {
    return (
      <div>
        <h1
          className="flex flex-col justify-center items-center h-dvh
         font-bold text-center dark:text-white"
        >
          <p className="text-2xl font-bold text-red-700 text-center">
            {status}
          </p>
          {/* {message} */}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 px-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Home</BreadcrumbPage>
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
            </BreadcrumbList>
          </Breadcrumb>
          <span className="text-lg font-semibold dark:text-white">Home</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-5 dark:text-white">
          <Table>
            <TableCaption>List of your recent Client Requests.</TableCaption>
            <TableHeader>
              <TableRow className="dark:text-white">
                <TableHead className="w-[100px]">Country Code</TableHead>
                <TableHead className="w-[150px]">Mobile Number</TableHead>
                <TableHead className="w-[150px]">Name</TableHead>
                <TableHead className="w-[200px]">Email</TableHead>
                <TableHead className="w-[150px]">Request From</TableHead>
                <TableHead className="">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientData.map((client) => (
                <TableRow key={client._id}>
                  <TableCell className="font-medium">
                    {client.countryCode}
                  </TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.requestRaiseFrom}</TableCell>
                  <TableCell className="">{client.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {/* <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter> */}
          </Table>
        </div>
      </main>
    </div>
  );
}

export default Home;
