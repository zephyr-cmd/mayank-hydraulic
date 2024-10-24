// "use client";
import Image from "next/image";
import Link from "next/link";
import BestDealForm from "../_landing/BestDeal";
let { ServerURI } = process.env;

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
const ProductDetails = async ({ productId }) => {
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
  return (
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
              {inventory.quantity_in_stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Lead Time */}
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Lead Time: {inventory.lead_time_days} days
            </p>

            {/* Specifications */}
            <h2 className="text-xl font-bold mb-2">Specifications:</h2>
            <ul className="space-y-2 mb-4">
              {specifications.map((spec) => (
                <li key={spec._id.$oid} className="flex justify-between">
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
            <div className="flex justify-between mb-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Category: {categoryId.name}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Manufacturer: {manufacturerId.name}
              </span>
            </div>
          </div>

          {/* Back Button */}
          <Link
            href={"/get-deal"}
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700"
            // onClick={() => window.history.back()}
          >
            Get Best Deal
          </Link>
        </div>
      </div>
      {/* <BestDealForm /> */}
    </div>
  );
};

export default ProductDetails;
