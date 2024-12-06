"use client";

import { Input } from "@/components/ui/input";
import { useFormState } from "react-dom";
import { createFreeConsultation } from "@/components/component/_actions";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { SubmitButton } from "@/components/component/submit-button";
import { countryDialCode } from "@/app/(admin)/dashboard/_utils/countryCode";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const initialState = {
  message: "",
};

export function Parallax() {
  const [selectedCountry, setSelectedCountry] = useState("+91"); // Default to India
  const [isIndia, setIsIndia] = useState(true); // Controls input display
  const [state, formAction] = useFormState(
    createFreeConsultation,
    initialState
  );
  // Handle state updates based on selected country code
  useEffect(() => {
    setIsIndia(selectedCountry === "+91");
  }, [selectedCountry]);

  // Toast notification for messages
  useEffect(() => {
    if (state.message) {
      // console.log(state.message);
      toast(`${state.message}`, {
        // description: "Sunday, December 03, 2023 at 9:00 AM",
      });
    }
  }, [state.message]);

  return (
    <div className=" w-full bg-fixed bg-center bg-no-repeat bg-cover min-h-[350px] relative bg-[url('/sales-consultation.jpg')]">
      <div className="absolute min-h-full w-full bg-black/60" />
      <div className="absolute w-full min-h-full flex flex-col justify-center items-center">
        <div className="container mx-auto">
          <p className="font-extrabold text-center text-xl text-white pb-5">
            Get FREE consultation from our experts.
          </p>
          <div className="flex flex-col w-full justify-center items-center">
            <form
              className="flex flex-col sm:flex-row p-5 gap-5 justify-center items-center w-full"
              action={formAction}
            >
              <div className="flex flex-col gap-5 w-full md:px-32 container mx-auto">
                <Input
                  type="hidden"
                  id="reqestRaiseFrom"
                  name="reqestRaiseFrom"
                  value="Free Consultation"
                />
                <div className="flex flex-col sm:flex-row w-full items-center gap-3">
                  {/* Country Code Dropdown */}
                  <div className="w-full sm:w-1/4">
                    <Select
                      id="countryCode"
                      name="countryCode"
                      defaultValue={selectedCountry}
                      onValueChange={(value) => setSelectedCountry(value)}
                      className="w-full"
                    >
                      <SelectTrigger className="text-sm border border-gray-300 rounded-l-md text-gray-300">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Country Dial Code</SelectLabel>
                          {countryDialCode.map((country) => (
                            <SelectItem
                              key={`${country.dial_code}-${country.name}`}
                              value={country.dial_code}
                            >
                              {country.flag} {country.name} ({country.dial_code}
                              )
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {state?.errors?.countryCode && (
                      <p
                        className="text-sm text-red-700 mt-2"
                        aria-live="polite"
                      >
                        {state.errors.countryCode}
                      </p>
                    )}
                  </div>

                  <div className="w-full sm:w-3/4">
                    {/* Conditional Input: Phone for India, Email for Others */}
                    {isIndia ? (
                      <div>
                        <Input
                          type="text"
                          placeholder="Enter your phone number"
                          name="phoneNumber"
                          className="w-full border border-gray-300 rounded-r-md text-gray-300"
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
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          className="w-full border border-gray-300 rounded-r-md text-gray-300"
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
                </div>
                <div className="flex flex-col justify-center">
                  <SubmitButton />
                  {state?.message && (
                    <p
                      className="text-sm text-blue-700 mt-2"
                      aria-live="polite"
                    >
                      {state?.message}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
