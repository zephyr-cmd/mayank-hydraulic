// "use client";

import Image from "next/image";
import Link from "next/link";
let { ServerURI } = process.env;

async function getData() {
  let res = [];
  try {
    // console.log("L-8, res--------------------->", "inside get Data");
    let response = await fetch(`${ServerURI}/api/v2/category`);
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

async function CategoryList() {
  const data = await getData();

  // console.log("L-52, data--------------->", data);
  if (!Array.isArray(data.categories)) {
    // Handle the case where data is not an array
    return (
      <div className="flex m-5 p-5 justify-center items-center">
        No Products to Display
      </div>
    );
  }
  return (
    <section className="min-h-full w-full pt-2 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center">
      <div className="flex flex-col w-full p-5 sm:p-15 md:p-20 gap-5 md:gap-10 h-fit">
        {/* {data.map((category) => ( */}
        {data.categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 w-full h-full"
          >
            {/* Left Part - Category Image and Name */}
            <div className="flex flex-col items-start justify-center w-full md:w-1/4 p-5 overflow-hidden">
              <Image
                src={
                  category.image && category.image.length > 0
                    ? category.image[0]
                    : "/mh-logo-font-jpeg.jpg"
                }
                alt={category.name}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
              <h2 className="text-lg font-bold text-center mt-2 text-gray-900 dark:text-white">
                {category.name}
              </h2>
            </div>
            {/* Right Part - List of Products */}
            <div className="flex flex-col md:w-3/4">
              <h5 className="my-2 px-5 text-xl font-semibold text-left text-gray-900 dark:text-white">
                Products
              </h5>
              <div className="flex flex-col items-start justify-start p-5 w-full h-full">
                <div className="grid grid-cols-2">
                  {category.products.length > 0 ? (
                    <ul className="space-y-2">
                      {category.products.map((product) => (
                        <li key={product._id}>
                          <Link
                            href={`/product/${product._id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No products available.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
