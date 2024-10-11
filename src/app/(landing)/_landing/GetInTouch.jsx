"use client";

import Link from "next/link";
import { useState } from "react";

const GetInTouch = () => {
  return (
    <div className="container mx-auto ">
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center border border-gray-300 rounded-lg p-4">
        {/* Image Part */}
        <div className="w-full md:w-1/2 flex flex-col p-5 space-y-7 flex-shrink-0">
          <h2 className="font-extrabold text-3xl">Get in touch with us</h2>
          {/* <p>
          Reach out to us today and find out how we can assist you in making a
          better world.
        </p> */}
        </div>

        {/* Form Part */}
        <div className="w-full md:w-1/2 flex-grow mt-6 md:mt-0">
          {/* <div className="h-full w-full flex justify-center"> */}
          <div className="flex flex-col p-4 max-w-sm space-y-4 justify-center">
            {/* CEO Information */}
            <div className="flex items-center space-x-2">
              <p className="font-bold text-xl">Anupam Sengar (CEO)</p>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-2">
              <p>
                M/s Mayank Hydraulic <br />
                H. No. 278, GALI NO 6 CHARAN SINGH COLONY, Vijay Nagar,
                Ghaziabad
              </p>
            </div>

            {/* Get Directions */}
            <div className="flex items-center space-x-2 text-red-600">
              <Link href="#directions" className="hover:underline">
                Get Directions
              </Link>
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <Link
                className="flex items-center space-x-2 border border-red-600 text-red-600 px-5 py-2 rounded-md hover:bg-red-600 hover:text-white"
                href={"tel:+918826381983"}
                aria-label="Phone Number +91-8826381983"
              >
                Call Us
              </Link>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
                Get Quote
              </button>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
