import { Input } from "@/components/ui/input";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

const HeaderCarousel = () => {
  return (
    <div className="relative">
      <header
        className={`sm:fixed top-0 left-0 w-full z-10 transition ease-in-out duration-700 bg-white text-black`}
      >
        <nav className="flex items-center justify-between container mx-auto py-2">
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 items-center justify-center">
            <div className="relative flex gap-1 sm:gap-2 items-center justify-center w-[100px] h-[60px]">
              <Image
                src={"/mhlogopng.png"}
                alt={"logo"}
                fill
                style={{
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                priority={true}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 px-4 sm:border-black sm:border-r-2 items-center">
              <p className="text-black text-lg md:text-2xl ">
                Mayank Hydraulics
              </p>
              <p className="flex text-black gap-1 items-center">
                <CheckCircledIcon />
                <span className="sm:font-bold">GST No.</span> 09FIGPS2072K1ZQ
              </p>
            </div>
            <Link
              className="flex flex-row items-center gap1 sm:gap-2"
              href="https://trustseal.indiamart.com/members/mayank-hydraulic"
              aria-label="IndiaMart Trust Certificate"
              target="_blank"
            >
              <svg
                xmlns="https://www.w3.org/2000/svg"
                width="17"
                height="17.274"
                viewBox="0 0 16.543 17.274"
              >
                <g
                  data-name="Group 1336"
                  transform="translate(-4369.391 -5904.945)"
                >
                  {" "}
                  <circle
                    cx="8.271"
                    cy="8.271"
                    r="8.271"
                    fill="#efc732"
                    data-name="Ellipse 81"
                    transform="translate(4369.391 5904.945)"
                  ></circle>{" "}
                  <path
                    d="M0 0h16.542v2.789H0z"
                    fill="#efc732"
                    data-name="Rectangle 624"
                    transform="translate(4369.391 5919.429)"
                  ></path>{" "}
                  <path
                    d="M4380.563 5908.823l-1.076 1.076-4.009 4.011-2.033-2.032-.276-.278-.545.547-.544.545 3.4 3.4 6.176-6.177zm0 0"
                    fill="#d02627"
                    data-name="Path 939"
                    transform="translate(.796 1.148)"
                  ></path>
                </g>
              </svg>
              <span className="flex text-black">
                <span className="sm:font-bold">TrustSEAL</span> Verified
              </span>
            </Link>
          </div>
          <div className="hidden md:flex flex-col lg:flex-row gap-1 space-x-6 text-sm">
            <Link
              href={"tel:+918826381983"}
              aria-label="Phone Number +91-8826381983"
              className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-black bg-opacity-80 text-[#f1f1f1] rounded-3xl hover:bg-opacity-70 transition shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                />
              </svg>
              Call 9876543210
            </Link>
            <Link
              href={"mailto:mayankhydraulic2000@gmail.com"}
              aria-label="mail to : mayankhydraulic2000@gmail.com"
              className="cursor-pointer group relative flex gap-1.5 px-8 py-4 bg-blue-700 text-[#f1f1f1] rounded-3xl hover:bg-blue-950 transition shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              Send Mail
            </Link>
          </div>
        </nav>
        <div className="bg-black text-white">
          <div className="container mx-auto hidden sm:flex justify-between items-center py-2">
            <div className=" space-x-6">
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
              <Link href="/our-products" className="hover:text-gray-300">
                Our Products
              </Link>
              <Link href="/about-us" className="hover:text-gray-300">
                About Us
              </Link>
              <Link href="/contact-us" className="hover:text-gray-300">
                Contact Us
              </Link>
            </div>
            <div className="relative flex justify-center items-center">
              <Input
                placeholder="Search..."
                className="input shadow-lg bg-transparent px-5 py-3 rounded-xl w-56 outline-none"
                name="search"
                type="search"
              />
              <svg
                className="size-6 absolute top-1.5 right-3 text-white"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="carousel relative min-h-screen overflow-hidden bg-white">
        {/*  */}
      </div>
    </div>
  );
};

export default HeaderCarousel;
