import Image from "next/image";
import React from "react";
import ContactUsForm from "@/app/(landing)/contact-us/ContactUsForm";

export default function ContactCard() {
  return (
    <div className="gap-10">
      <div className="relative w-full bg-gradient-to-r from-gray-50 to-gray-100 grid gap-0 sm:pt-[100px]">
        {/* Image container */}
        <div className="absolute inset-0 h-[250px] sm:h-[500px]">
          <Image
            src="/about-us.png"
            alt="About Us Background"
            fill
            className="object-contain sm:object-cover"
            priority={true}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
          />
        </div>

        {/* Black overlay with transparency */}
        <div className="absolute inset-0 h-[250px] sm:h-[500px] bg-black/40"></div>

        {/* Content container */}
        <div className="relative grid w-full text-center  h-[250px] sm:h-[400px] justify-center items-center px-4 space-y-2 lg:pt-24 lg:space-y-4 gap-5">
          <h2 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-100">
            Contact Us
          </h2>
          <p className="text-lg text-gray-200">
            Advance your operations by investing in the right technology
          </p>
        </div>
      </div>
      <div className="container mx-auto py-10 px-10 h-full pt[500px]">
        {/* Flex container to ensure both sections take equal height */}
        <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-6 h-full items-center">
          {/* Company Details - Ensure this takes full height */}
          <div className="bg-gray-100 sm:bg-transparent p-6 rounded-lg sm:rounded-none shadow-lg sm:shadow-none sm:w-1/2 gap-3 h-full w-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Company Details</h2>
            <p>
              <strong>Name of CEO:</strong> Anupam Sengar
            </p>
            <p>
              <strong>Mobile Number:</strong> +91-8826381983
            </p>
            <p>
              <strong>Address:</strong> H. No. 278, Gali No. 6 Charan Singh
              Colony, Vijay Nagar, Ghaziabad Uttar Pradesh, 201009, INDIA
            </p>
          </div>

          {/* Contact Us Form */}
          {/* <div className="bg-white p-6 rounded-lg shadow-lg sm:w-1/2 h-full flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <form className="space-y-4 flex-grow">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-1/3">
                  <label className="mb-1 font-semibold" htmlFor="countryCode">
                    Country Code
                  </label>
                  <select
                    id="countryCode"
                    defaultValue="+91"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  >
                    {countryDialCode.map((country) => (
                      <option key={country.code} value={country.dial_code}>
                        {country.flag} {country.name} ({country.dial_code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-2/3">
                  <label className="mb-1 font-semibold" htmlFor="contactNumber">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Enter your contact number"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  className="block mb-1 font-semibold"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Describe your inquiry..."
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full p-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div> */}
          <div className="bg-white w-full p-6 rounded-lg shadow-lg sm:w-1/2 h-full flex flex-col">
            <ContactUsForm />
          </div>
        </div>
      </div>
    </div>
  );
}

// export default ContactCard;

// <main >
//   contact us
// </main>
