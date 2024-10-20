"use client";

import { countryDialCode } from "@/app/(admin)/dashboard/_utils/countryCode";
import { useState } from "react";

const BestDealForm = () => {
  const [selectedCountry, setSelectedCountry] = useState("+91");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white shadow-lg flex flex-col-reverse sm:flex-row container mx-auto rounded-lg p-8">
        {/* Form Section */}
        <div className="p-8 my-2 sm:my-0 w-full sm:w-2/3 rounded-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Save time! Get the best deal
          </h2>

          <div className="space-y-4">
            {/* Country Code and Name Fields */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex  items-center border border-gray-300 rounded-lg p-2 w-full md:w-1/2 focus-within:border-blue-500">
                {/* Country Code Dropdown */}
                <select
                  id="countryCode"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="bg-transparent focus:outline-none appearance-none pr-2 w-1/4"
                >
                  {countryDialCode.map((country) => (
                    <option
                      key={`${country.dial_code}-${country.code}`} // Unique key
                      value={country.dial_code}
                    >
                      {country.flag} {country.name} ({country.dial_code})
                    </option>
                  ))}
                </select>

                {/* Separator Line */}
                <span className="mx-2 text-gray-400">|</span>

                {/* Conditional Input: Mobile number for India, email for others */}
                {selectedCountry === "+91" ? (
                  <input
                    type="tel"
                    id="contactNumber"
                    placeholder="Enter your mobile number"
                    className="bg-transparent focus:outline-none w-full"
                    required
                  />
                ) : (
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="bg-transparent focus:outline-none w-full"
                    required
                  />
                )}
              </div>

              {/* Name Input */}
              <input
                type="text"
                placeholder="Enter your name:"
                className="border border-gray-300 rounded-lg p-2 w-full md:w-1/2"
              />
            </div>

            {/* Product/Service Input */}
            <div>
              <input
                type="text"
                placeholder="Enter Required Product/Service:"
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button className="bg-red-700 text-white font-semibold px-6 py-2 rounded-lg">
                Submit Requirement
              </button>
            </div>

            {/* Footer Note */}
            <div>
              <p className="text-xs text-gray-500">
                Your information is safe with us.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Decorative Section */}
        <div className="bg-red-600 relative w-full sm:w-1/3 p-2 rounded-lg flex items-center justify-center">
          <div className="bg-red-400 p-4 text-white text-center rounded-s-full flex flex-row items-center gap-1">
            <div className="size-4 bg-red-600 rounded-full mr-2"></div>
            <div className="flex flex-row gap-4 items-center">
              <div className="text-xl font-bold">Get</div>
              <div>
                <div className="text-2xl font-bold">Best </div>
                <div className="text-2xl font-bold"> Deal</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDealForm;
