"use client";
// components/MobileTabBar/ for mobile phone to access all links
import { useState, useEffect } from "react";
import Link from "next/link";

const MobileTabBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [expanded, setExpanded] = useState({
    profile: false,
    range: false,
  });

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setIsVisible(false); // hide MobileTabBar when scrolling down
    } else {
      setIsVisible(true); // show MobileTabBar when scrolling up
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const toggleProfile = () => {
    setExpanded({ profile: !expanded.profile, range: false });
  };

  const toggleRange = () => {
    setExpanded({ profile: false, range: !expanded.range });
  };

  return (
    <div
      className={`fixed sm:hidden text-xs bottom-0 left-0 right-0 bg-white border-t border-gray-300 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-between p-4">
        {/* Home */}
        <Link
          href={"/"}
          className="flex flex-col items-center"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <p>Home</p>
        </Link>
        {/* Profile */}
        <Link
          href={"/about-us"}
          className="flex flex-col items-center"
          // onClick={toggleProfile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>

          <p>Profile</p>
        </Link>
        {/* Our Range */}
        <Link
          href={"/our-products"}
          className="flex flex-col items-center"
          // onClick={toggleRange}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>

          <p>Our Range</p>
        </Link>
        {/* Contact Us */}
        <Link href="/contact-us" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>

          <p>Contact Us</p>
        </Link>
        {/* Call Us */}
        <Link href="tel:9876543210" className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>

          <p>Call Us</p>
        </Link>
      </div>

      {/* Profile Expanded Menu */}
      {expanded.profile && (
        <div className="absolute bottom-full text-sm left-0 right-0 bg-gray-100 p-4 rounded-t-3xl pt-10 flex flex-col items-center ">
          <Link href="/about-us" className="block mb-2">
            About Us
          </Link>
          <Link href="/testimonial" className="block mb-2">
            Testimonial
          </Link>
          <Link href="/download-brochure" className="block">
            Download Brochure
          </Link>
        </div>
      )}

      {/* Our Range Expanded Menu */}
      {expanded.range && (
        <div className="absolute bottom-full left-0 right-0 bg-gray-100 p-4 max-h-[70vh] overflow-y-scroll text-sm rounded-t-3xl pt-10 flex flex-col items-center">
          <p>Product Category 1</p>
          <p>Product Category 2</p>
          <p>Product Category 3</p>

          {/* Add more categories */}
        </div>
      )}
    </div>
  );
};

export default MobileTabBar;
