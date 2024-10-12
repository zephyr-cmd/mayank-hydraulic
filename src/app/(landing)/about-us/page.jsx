import Image from "next/image";
import BestDealForm from "../_landing/BestDeal";
import Link from "next/link";
import GetInTouch from "../_landing/GetInTouch";

export default function AboutUs() {
  return (
    <>
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
            About Us
          </h2>
          <p className="text-lg text-gray-200">
            Advance your operations by investing in the right technology
          </p>
        </div>
      </div>
      <div className=" container mx-auto company-profile-container">
        <p className="text-justify my-10">
          At <strong>Mayank Hydraulic&apos;s</strong>, we have been committed to
          delivering high-quality and affordable products, leading to
          significant business growth over the years. Our expertise lies in
          understanding customer needs and offering tailored solutions. We
          specialize in products such as the Rexroth Axial Piston Variable
          Hydraulic Pump, Hydraulic Axial Piston Motor, Electronic Hydraulic
          Valve, and Industrial Bosch Rexroth Throttle Check Valve, among
          others. Our continuous innovation and customer focus have earned us a
          trusted reputation in the industry.
        </p>
        <p className="text-justify my-4">
          Operating from our facility in Ghaziabad, Uttar Pradesh, India, we
          take pride in our ethical business practices and commitment to
          excellence. Our modern manufacturing unit allows us to meet market
          demands effectively, and our success is grounded in long-term
          relationships with clients and a strong focus on quality.
        </p>

        <table className="w-full border-collapse border border-black text-left">
          <tbody>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Nature of Business
              </td>
              <td className="border border-black p-2">
                Manufacturer, Supplier, Trader, and Service Provider
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Year of Establishment
              </td>
              <td className="border border-black p-2">2023</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Company Location
              </td>
              <td className="border border-black p-2">
                Ghaziabad, Uttar Pradesh, India
              </td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Brand Name
              </td>
              <td className="border border-black p-2">Mayank Hydraulics</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                No. of Employees
              </td>
              <td className="border border-black p-2">10</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                No. of Designers
              </td>
              <td className="border border-black p-2">06</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                No. of Engineers
              </td>
              <td className="border border-black p-2">03</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                No. of Production Units
              </td>
              <td className="border border-black p-2">01</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Warehousing Facility
              </td>
              <td className="border border-black p-2">Yes</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">
                Clients Name
              </td>
              <td className="border border-black p-2">ANUPAM SENGAR</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">Banker</td>
              <td className="border border-black p-2">State Bank Of India</td>
            </tr>
            <tr>
              <td className="border border-black p-2 font-semibold">GST No.</td>
              <td className="border border-black p-2">09FIGPS2072K1ZQ</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className=" container mx-auto my-10 space-y-10">
        <div className="flex flex-col justify-start mx-10">
          {/* Section Title */}
          <h2 className="text-blue-600 font-bold text-xl border-l-4 border-blue-600 pl-2 mb-4">
            Why Choose Us?
          </h2>

          {/* Description */}
          <p className="text-gray-700 mb-4">
            We are dedicated to providing top-tier solutions that meet the
            diverse needs of our clients.
          </p>

          {/* Key factors list */}
          <p className="font-semibold mb-2">
            Some of the reasons why our clients trust us include:
          </p>

          {/* List of key factors */}
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Comprehensive product selection</li>
            <li>Uncompromised quality control</li>
            <li>Skilled and professional workforce</li>
            <li>Competitive pricing structures</li>
            <li>Streamlined and transparent operations</li>
          </ul>
        </div>
        <div className="flex flex-col justify-start mx-10">
          {/* Section Title */}
          <h2
            className="
          text-blue-600 font-bold text-xl border-l-4 border-blue-600 pl-2 mb-4"
          >
            Brands We Deal In
          </h2>

          {/* Brands List */}
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>V-Tek</li>
            <li>Yuken</li>
            <li>Dowty</li>
            <li>Tokimec</li>
            <li>Denison</li>
            <li>Rexroth, etc.</li>
          </ul>
        </div>
      </div>
      <GetInTouch />

      {/* <div className="mx-auto w-full max-w-xs relative flex flex-col items-center justify-center text-center overflow-visible">
        <h3 className="text-3xl font-bold">Get Started Now</h3>
        <div className="w-full relative flex flex-col items-center justify-center">
          <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-full blur-sm"></div>
          <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-full"></div>
          <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-[5px] w-1/2 blur-sm"></div>
          <div className="absolute inset-x-auto top-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent h-px w-1/2"></div>
          <div className="absolute inset-0 w-full h-full bg-background [mask-image:radial-gradient(50%_200px_at_top,transparent_20%,white)]"></div>
        </div>
        <p className="mt-6 text-sm">
          Be part of millions people around the world using modern User
          Interfaces.
        </p>

        <span className="absolute -z-[1] backdrop-blur-sm inset-0 w-full h-full flex before:content-[''] before:h-3/4 before:w-full before:bg-gradient-to-r before:from-black before:to-purple-600 before:blur-[90px] after:content-[''] after:h-1/2 after:w-full after:bg-gradient-to-br after:from-cyan-400 after:to-sky-300 after:blur-[90px]"></span>
      </div> */}
    </>
  );
}

// export const metadata = {
//   title: "About Us || Sarvanjana Hospital, Rishikesh",
//   description:
//     "The SGM Sarvanjna Hospital, a multispeciality hospital provides high quotient of quality health care & commitment, which is backed up by a well trained and dedicated hospital staff.",
// };
