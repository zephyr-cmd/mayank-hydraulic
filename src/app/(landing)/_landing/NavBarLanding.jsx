"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const NavBarLanding = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Reset the loaded state when the slide changes
    setIsVideoLoaded(false);
  }, [currentSlide]);

  const handleVideoLoad = () => {
    console.log("Video data is loaded and ready to play.");
    setTimeout(() => {
      setIsVideoLoaded(true);
    }, 4000);
  };
  const handlesideBar = () => {
    setIsOpen(!isOpen);
    setSideBar(!sideBar);
    console.log("handle side bar., isOpen", isOpen, "setSideBar", sideBar);
  };

  useEffect(() => {
    setAnimateIn(true);
  }, [currentSlide]);

  const slides = [
    // {
    //   type: "video",
    //   src: "introVideo4.mp4",
    //   thumbnail: "/introThumbnail.png",
    //   heading: "#EngineeringTomorrow",
    //   description:
    //     "We provide innovative IT services and consultation, leveraging technology to drive sustainable digital transformation. Our commitment extends to caring for our customers and the environment, aligning our practices with the Sustainable Development Goals (SDGs) to create a positive impact.",
    //   buttonText: "Learn More",
    //   buttonLink: "/about-us",
    // },
    // {
    //   type: "image",
    //   src: "/two-lady.jpg",
    //   heading: "Explore Our Services",
    //   description: "We offer a wide range of solutions to meet your needs.",
    //   buttonText: "Explore",
    //   // buttonLink: "/services",
    //   buttonLink: "/coming-soon",
    // },
    {
      type: "image",
      src: "/manInBlack.jpg",
      heading: "Join Our Team",
      description: "We are looking for talented individuals to join us.",
      buttonText: "Careers",
      buttonLink: "/comming-soon",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      <div
        className={`fixed top-0 left-0 w-full z-10 transition ease-in-out duration-700 
              ${
                isSticky
                  ? "bg-white/95 text-black px-5 py-3"
                  : "bg-transparent text-zinc-300 p-7"
              } 
              ${sideBar && !isSticky ? `bg-zinc-950/95` : ""}
            `}
      >
        <nav className="flex items-center justify-between">
          <div className="relative w-[100px] h-[60px]">
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
          <div className="hidden sm:flex space-x-6">
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
          <div className="sm:hidden">
            <button
              onClick={() => handlesideBar()}
              aria-label="Open menu"
              className="focus:outline-none p-2 hover:rounded-full hover:bg-gray-600"
            >
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              )}
            </button>
          </div>
        </nav>
        {isOpen && (
          <div className="md:hidden relative w-full min-h-dvh p-5">
            <Link
              href="/ur-products"
              className="block py-2 hover:text-gray-300"
            >
              Our Products
            </Link>
            <Link href="/about-us" className="block py-2 hover:text-gray-300">
              About Us
            </Link>
            <Link href="/contact-us" className="block py-2 hover:text-gray-300">
              Contact Us
            </Link>
          </div>
        )}
      </div>
      {/* carousel */}
      {/* <div className="carousel relative min-h-screen overflow-hidden bg-white">
      </div> */}
    </div>
  );
};

export default NavBarLanding;
