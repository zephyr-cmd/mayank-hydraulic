import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/icons/socialMedia";
import {
  EnvelopeClosedIcon,
  MobileIcon,
  Share1Icon,
} from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="w-full bg-white text-black">
      <div className="container mx-auto py-12">
        <div className="flex flex-col-reverse md:flex-row md:justify-between gap-8 w-full p-5">
          <div className="flex flex-col gap-y-2 w-full ">
            {/* <HospitalIcon className="text-[#c9ac5c] h-8 w-8" /> */}
            <p className="text-5xl uppercase font-thin">Mayank Hydraulic</p>
            <p className="text-sm sm:text-justify">
              H. No. 278, GALI NO 6 CHARAN SINGH COLONY, Vijay Nagar, Ghaziabad
            </p>
            <p className="text-sm sm:text-justify">
              UTTAR PRADESH, 201009, INDIA
            </p>
            <div className="flex flex-col mt-3 gap-y-2">
              <Link
                href={"mailto:mayankhydraulic2000@gmail.com"}
                aria-label="mail to : mayankhydraulic2000@gmail.com"
                className="flex flex-row gap-2 items-center"
              >
                <EnvelopeClosedIcon
                  className="h-5 w-5"
                  textcolor="fill-white"
                />
                mayankhydraulic2000@gmail.com
              </Link>
              <Link
                href={"tel:+918826381983"}
                aria-label="Phone Number +91-8826381983"
                className="flex flex-row gap-2 items-center"
              >
                <MobileIcon className="h-5 w-5" textcolor="fill-white" />
                +91-8826381983
              </Link>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-around gap-8 w-full">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-lg">Menu</p>
              <Link className="hover:text-gray-300" href="/" aria-label="Home">
                Home
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/coming-soon"
                aria-label="Testimonial"
              >
                Testimonial
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/about-us"
                aria-label="About Us"
              >
                About Us
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/contact-us"
                aria-label="contact-us"
              >
                Contact Us
              </Link>
              {/* <Link
              className="hover:text-gray-300"
              href="/coming-soon"
              aria-label="Contact Us"
            >
              Contact Us
            </Link> */}
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold text-lg ">Our Products</p>
              <Link
                className="hover:text-gray-300"
                href="/#hydraulic-pump"
                aria-label="hydraulic-pump"
              >
                Hydraulic Pump
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/#locations"
                aria-label="hydraulic-valve"
              >
                Hydraulic Valve
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/#locations"
                aria-label="piston-pump"
              >
                Piston Pump
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/#locations"
                aria-label="Servo-pump"
              >
                Servo Pump
              </Link>
              <Link
                className="hover:text-gray-300"
                href="/#more"
                aria-label="more"
              >
                More++
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-5 flex flex-col-reverse gap-7 md:flex-row lg:px-8 justify-between items-center text-sm lg:text-lg mx-5">
          <div className=" text-sm">
            <p>
              © 2024 Mayank Hydraulic All Rights Reserved.&nbsp;
              <Link className="text-blue-700" href="/terms-of-use">
                (Terms of Use)
              </Link>
            </p>
            <p>
              Developed and Managed by : &nbsp;
              <Link className="text-blue-700" href="#">
                AdaLabs
              </Link>
            </p>
          </div>
          {/* <div className="flex space-x-6 mt-4 md:mt-0">
            <p>
              <span className="text-red-700">❤</span> from India
            </p>
          </div> */}
          <div className="flex flex-row space-x-4 mt-2 items-center">
            <Link
              href="https://www.facebook.com/profile.php?id=61553121369711"
              aria-label="Facebook"
              target="_blank"
            >
              <FacebookIcon className="h-5 w-5" textcolor="fill-white" />
            </Link>
            <Link
              href="https://www.instagram.com/mayank_hydraulic"
              aria-label="Instagram"
              target="_blank"
            >
              <InstagramIcon className="h-5 w-5" textcolor="fill-white" />
            </Link>
            <Link
              href="https://x.com/example.in"
              aria-label="Twitter"
              target="_blank"
            >
              <XIcon className="h-5 w-5" textcolor="fill-white" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/example"
              aria-label="LinkedIn"
              target="_blank"
            >
              <LinkedinIcon className="h-5 w-5" textcolor="fill-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
