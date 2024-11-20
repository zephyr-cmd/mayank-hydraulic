"use client";

import { countryDialCode } from "@/app/(admin)/dashboard/_utils/countryCode";
import { createFreeConsultation } from "@/components/component/_actions";
import { SubmitButton } from "@/components/component/submit-button";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};
export default function ContactUsForm() {
  const [selectedCountry, setSelectedCountry] = useState("+91");
  const [isIndia, setIsIndia] = useState(true); // Controls input display
  const [state, formAction] = useFormState(
    createFreeConsultation,
    initialState
  );
  // Handle state updates based on selected country code
  useEffect(() => {
    setIsIndia(selectedCountry === "+91");
  }, [selectedCountry]);
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form className="space-y-4 flex-grow" action={formAction}>
        <div className="flex flex-col md:flex-row gap-5">
          {/* Country Code Dropdown */}
          <div className="w-full md:w-1/3">
            <label className="mb-1 font-semibold" htmlFor="countryCode">
              Country Code
            </label>
            <select
              id="countryCode"
              name="countryCode"
              onChange={(e) => setSelectedCountry(e.target.value)} // Fixed event handler
              defaultValue={selectedCountry}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            >
              {countryDialCode.map((country) => (
                <option key={country.code} value={country.dial_code}>
                  {country.flag} {country.name} ({country.dial_code})
                </option>
              ))}
            </select>
          </div>
          <div className="w-full">
            {isIndia ? (
              <div>
                <label className="mb-1 font-semibold" htmlFor="contactDetail">
                  Contact Number
                </label>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  name="phoneNumber"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  required={isIndia}
                />
                {state?.errors?.phoneNumber && (
                  <p className="text-sm text-red-700 mt-2" aria-live="polite">
                    {state.errors.phoneNumber}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <label className="mb-1 font-semibold" htmlFor="contactDetail">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
                  required={!isIndia}
                />
                {state?.errors?.email && (
                  <p className="text-sm text-red-700 mt-2" aria-live="polite">
                    {state.errors.email}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Describe your inquiry..."
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center">
          <SubmitButton buttonName="Submit Requirement" variant="projectbtn1" />
          {state?.message && (
            <p className="text-sm text-blue-700 mt-2" aria-live="polite">
              {state?.message}
            </p>
          )}
        </div>
      </form>
    </section>
  );
}
