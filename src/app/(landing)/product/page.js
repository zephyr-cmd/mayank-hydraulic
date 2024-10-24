import CategoryList from "@/app/(landing)/our-products/category";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Products() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-black dark:bg-black dark:text-white items-center w-full min-h-fit">
      <div className="container mx-auto">
        <section className="flex flex-col justify-center items-center p-5 w-full">
          <p className="font-extrabold text-center p-5 bg-gradient-to-r from-blue-700 to-indigo-400 text-transparent bg-clip-text text-3xl md:text-3xl lg:text-5xl leading-tight tracking-tighter ">
            Showroom
          </p>
          <div>
            <div className="flex flex-col justify-center items-center mt-10 space-y-10">
              <p className="font-bold text-lg text-center">
                We “M/s Mayank Hydraulic” are Authorized Wholesale Dealer,
                Retailer, Trader and Supplier of an extensive array of Hydraulic
                Pump, Hydraulic Valve, Piston Pump, Servo Valve etc.
              </p>
            </div>
          </div>
        </section>
        <section>
          <CategoryList />
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Products || Mayank Hydraulics",
  description:
    "Authorized Wholesale Dealer, Retailer, Trader and Supplier of an extensive array of Hydraulic Pump, Hydraulic Valve, Piston Pump, Servo Valve etc.",
};
