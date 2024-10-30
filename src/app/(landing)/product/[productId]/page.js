import Link from "next/link";
import Image from "next/image";
import BestDealForm from "../../_landing/BestDeal";
let { ServerURI } = process.env;
// import { Button } from "@/components/ui/button";
// import ProductDetails from "@/app/(landing)/product/ProductDetails";

async function getData(productId) {
  let res;
  try {
    let response = await fetch(`${ServerURI}/api/v2/product/${productId}`);
    if (response.status == 200) {
      res = await response.json();
      // console.log("L-14, res--------------------->fromt the api", res);
      return res;
    }
  } catch (error) {
    console.log("something went wrong ??", error);
    return res;
  }
}

export default async function Products({ params }) {
  // const router = useRouter();
  const { productId } = params;
  const data = await getData(productId);

  const {
    name,
    description,
    price,
    specifications,
    inventory,
    images,
    manufacturerId,
    categoryId,
  } = data?.product;

  if (!data) return <p>Loading...</p>;
  // console.log("L-10, router--------->", productId);
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-black dark:bg-black dark:text-white items-center w-full min-h-fit">
      <div className="container mx-auto sm:mt-10">
        <section className="back-Button ">
          <Link
            href={"/our-products"}
            className="flex flex-row items-center justify-start cursor-pointer duration-200 hover:scale-105 sm:hover:scale-100"
            title="Go Back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="stroke-blue-500 size-6 md:size-10"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M11 6L5 12M5 12L11 18M5 12H19"
              ></path>
            </svg>
            <span className="md:text-2xl">Go Back</span>
          </Link>
        </section>
        <section>
          {/* <ProductDetails productId={productId} /> */}
          <div className="w-full h-fit">
            <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 overflow-auto p-4">
              {/* Left Section - Product Image */}
              <div className="w-full lg:w-1/2 flex items-center justify-center">
                <Image
                  src={images[0] || "/images/placeholder.png"}
                  alt={name}
                  width={500}
                  height={500}
                  className="object-contain max-h-[80vh]"
                />
              </div>

              {/* Right Section - Product Info */}
              <div className="w-full lg:w-1/2 flex flex-col justify-between p-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{name}</h1>
                  <p className="text-2xl font-semibold text-green-600 mb-4">
                    ₹{price.toLocaleString()}
                  </p>

                  {/* Stock Availability */}
                  <p
                    className={`mb-4 ${
                      inventory.quantity_in_stock > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {inventory.quantity_in_stock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </p>

                  {/* Lead Time */}
                  <p className="mb-4 text-gray-600 dark:text-gray-400">
                    Lead Time: {inventory.lead_time_days} days
                  </p>

                  {/* Specifications */}
                  <h2 className="text-xl font-bold mb-2">Specifications:</h2>
                  <ul className="space-y-2 mb-4">
                    {specifications.map((spec) => (
                      <li key={spec._id} className="flex justify-between">
                        <span className="font-semibold">{spec.key}:</span>
                        <span>{spec.value}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Description */}
                  {description && (
                    <>
                      <h2 className="text-xl font-bold mb-2">Description:</h2>
                      <p className="mb-4">{description}</p>
                    </>
                  )}

                  {/* Category and Manufacturer */}
                  <div className="flex flex-col justify-between mb-4">
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      Category: {categoryId.name}
                    </span>
                    <span className="text-xl text-gray-600 dark:text-gray-400">
                      Manufacturer: {manufacturerId.name}
                    </span>
                  </div>
                </div>

                {/* Back Button */}
                <Link
                  href={"/get-deal"}
                  className="mt-4 py-2 px-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-center"
                  // onClick={() => window.history.back()}
                >
                  Yes! I am interested
                </Link>
              </div>
            </div>
            <BestDealForm />
          </div>
        </section>
      </div>
    </div>
  );
}

// export const metadata = {
//   title: "Products || Mayank Hydraulics",
//   description:
//     "Authorized Wholesale Dealer, Retailer, Trader and Supplier of an extensive array of Hydraulic Pump, Hydraulic Valve, Piston Pump, Servo Valve etc.",
// };
