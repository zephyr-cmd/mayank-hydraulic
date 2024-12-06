"use client";

import { countryDialCode } from "@/app/(admin)/dashboard/_utils/countryCode";
import { createFreeConsultation } from "@/components/component/_actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/component/submit-button";
import { toast } from "sonner";

const initialState = {
  message: " ",
};
const BestDealForm = () => {
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

  useEffect(() => {
    if (state.message) {
      // console.log(state.message);
      toast(`${state.message}`, {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  }, [state.message]);

  return (
    <div className="bg-gray-100 p-8">
      <div className="bg-white shadow-lg flex flex-col-reverse sm:flex-row container mx-auto rounded-lg p-8">
        {/* Form Section */}

        <form
          className="p-8 my-2 sm:my-0 w-full sm:w-2/3 rounded-lg"
          action={formAction}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Save time! Get the best deal
          </h2>

          <div className="space-y-4 w-full">
            <input
              type="hidden"
              id="requestRaiseFrom"
              name="requestRaiseFrom"
              value="Product Page"
            />
            {/* Country Code and Name Fields */}
            <div className="flex flex-col md:flex-row gap-5 w-full">
              <div className="flex  items-center border border-gray-300 rounded-lg p-2 w-full md:w-1/2 focus-within:border-blue-500">
                {/* Country Code Dropdown */}
                <select
                  id="countryCode"
                  name="countryCode"
                  defaultValue={selectedCountry}
                  onChange={(value) => setSelectedCountry(value)}
                  // onValueChange={(value) => setSelectedCountry(value)}
                  // value={selectedCountry}
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
                {isIndia ? (
                  <div>
                    <input
                      // type="text"
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your Phone number"
                      className="bg-transparent focus:outline-none w-full"
                      required={isIndia}
                    />
                    {state?.errors?.phoneNumber && (
                      <p
                        className="text-sm text-red-700 mt-2"
                        aria-live="polite"
                      >
                        {state.errors.phoneNumber}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="bg-transparent focus:outline-none w-full"
                      required={!isIndia}
                    />
                    {state?.errors?.email && (
                      <p
                        className="text-sm text-red-700 mt-2"
                        aria-live="polite"
                      >
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="w-full md:w-1/2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
                {state?.errors?.name && (
                  <p className="text-sm text-red-700 mt-2" aria-live="polite">
                    {state.errors.name}
                  </p>
                )}
              </div>
            </div>

            {/* Product/Service Input */}
            <div>
              <textarea
                type="text"
                id="description"
                name="description"
                placeholder="Enter Required Product/Service:"
                className="border border-gray-300 rounded-lg p-2 w-full"
                minLength={10}
                maxLength={500}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col justify-center">
              <SubmitButton
                buttonName="Submit Requirement"
                variant="destructive"
              />
              {state?.message && (
                <p className="text-sm text-blue-700 mt-2" aria-live="polite">
                  {state?.message}
                </p>
              )}
            </div>

            {/* Footer Note */}
            <div>
              <p className="text-xs text-gray-500">
                Your information is safe with us.
              </p>
            </div>
          </div>
        </form>

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
