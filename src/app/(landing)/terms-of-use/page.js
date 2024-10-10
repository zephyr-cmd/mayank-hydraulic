import Link from "next/link";
import GetInTouch from "../_landing/GetInTouch";

export default function TermsAndConditions() {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-10 text-center sm:mt-20">
        Quick Access Links
      </h2>
      <div className="flex flex-col sm:flex-row gap-5 items-center justify-center p-8 mb-10">
        <Link
          href="/terms-and-conditions"
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          Terms & Conditions
        </Link>

        <Link
          href="/privacy-policy"
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          Privacy Policy
        </Link>

        <Link
          href="/warranty-policy"
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          Warranty Policy
        </Link>

        <Link
          href="/faq"
          className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce"
        >
          FAQ
        </Link>
      </div>
      <GetInTouch />
    </div>
  );
}

export const metadata = {
  title: "Terms of Use | Mayank Hydraulic ",
  description:
    "An Authorized Wholesale Dealer, Retailer, Trader, and Supplier, offering a wide range of products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps, Servo Valves, and more.",
};
