"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Carousel = () => {
  const slides = [
    {
      title: "Rexroth A10VSO 10DR",
      imageSrc: "/images/Rexroth/Rexroth-A10VSO-10DR.jpg",
      description:
        "The Rexroth A10VSO 10DR is a variable displacement axial piston pump, designed for high-efficiency hydraulic systems. Known for its precision and durability, it delivers consistent flow rates under varying load conditions, making it ideal for industrial machinery and heavy-duty applications. Experience smooth operation, reduced noise levels, and enhanced energy savings with this reliable hydraulic pump.",
    },
    {
      title: "Tokimec Valves",
      imageSrc: "/images/Valves/Tokimec-Valves.jpg",
      description:
        "Tokimec valves are engineered for precise control in hydraulic systems, offering superior performance across a wide range of industrial applications. Whether used for flow regulation, pressure control, or directional movement, Tokimec valves ensure efficient, reliable operation, even in the harshest environments. Designed for long life and easy maintenance, they are a trusted solution in heavy machinery.",
    },
    {
      title: "Voith Hydraulic Gear Pump",
      imageSrc: "/images/hydraulicPump/Voith-Hydraulic-Gear-Pump.webp",
      description:
        "The Voith Hydraulic Gear Pump is designed for robust and efficient power transmission in hydraulic circuits. Its compact design ensures easy installation in tight spaces, while delivering high performance and reliability under heavy loads. Ideal for applications in construction, agriculture, and industrial equipment, this pump is known for its durability, smooth operation, and minimal maintenance needs.",
      example:
        "A heavy equipment manufacturer integrated the Voith Hydraulic Gear Pump into their machines, reducing downtime by 20% and improving overall system reliability, ensuring longer operational hours.",
    },
    {
      title: "Daikin KSO GO2 Valve",
      imageSrc: "/images/Valves/Daikin-KSO-GO2-Valve.jpg",
      description:
        "The Daikin KSO GO2 Valve offers exceptional precision in controlling hydraulic flow and pressure. Known for its reliability and responsiveness, this valve is ideal for use in high-performance hydraulic systems across industries like manufacturing and heavy machinery. Its compact design and durable construction ensure longevity and reduce the need for frequent maintenance.",
      example:
        "An automotive manufacturing plant utilized Daikin KSO GO2 Valves to enhance their assembly line's hydraulic systems, resulting in a 15% increase in production efficiency and fewer system failures.",
    },
    {
      title: "Parker Hydraulic Pump",
      imageSrc: "/images/hydraulicPump/ParkerHydraulicPump.jpg",
      description:
        "Parker Hydraulic Pumps are built for high efficiency and reliability in demanding hydraulic applications. With their advanced engineering, these pumps offer consistent performance, reduced energy consumption, and minimal noise during operation. They are a preferred choice for industries that require robust hydraulic systems, from mobile equipment to industrial automation.",
      example:
        "A construction company equipped their fleet with Parker Hydraulic Pumps, leading to a 10% reduction in fuel consumption and increased machine uptime, optimizing their on-site operations.",
    },
    {
      title: "Radial Piston Motor",
      imageSrc: "/images/motor/Radial-Piston-Motor-Side.jpg",
      description:
        "The Radial Piston Motor is designed to provide high torque at low speeds, making it perfect for heavy-duty applications such as industrial presses, winches, and construction machinery. With its rugged design and capability to operate under extreme pressure, this motor delivers reliable performance and exceptional power density in harsh environments.",
      example:
        "A mining operation implemented Radial Piston Motors in their extraction equipment, improving torque performance by 25% and reducing wear and tear, ultimately increasing operational longevity.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const minSwipeDistance = 50;

  // Combine touch and mouse handlers into one
  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const distanceMoved = clientX - startX;
    setTranslateX(distanceMoved);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (Math.abs(translateX) > minSwipeDistance) {
      if (translateX > 0) {
        navigateSlide("prev");
      } else {
        navigateSlide("next");
      }
    }
    setTranslateX(0);
  };

  // Generalized navigation logic
  const navigateSlide = (direction) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prevSlide) =>
      direction === "next"
        ? (prevSlide + 1) % slides.length
        : prevSlide === 0
        ? slides.length - 1
        : prevSlide - 1
    );
    setTimeout(() => setIsTransitioning(false), 500); // Match CSS transition time
  };

  return (
    <div className="flex flex-col container mx-auto items-center justify-center gap-1 p-10">
      {/* Navigation Button Carousel */}
      <div className="hidden sm:flex top-4 left-4 justify-between items-center w-full px-4">
        <div className="text-black text-lg">
          {currentSlide + 1} of {slides.length}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-6">
          <button
            onClick={() => navigateSlide("prev")}
            className="text-black p-4 rounded-full border-2 hover:border-gray-700 transition-all duration-300"
          >
            <p className="font-bold text-2xl sm:text-4xl">&nbsp;&lt;&nbsp;</p>
          </button>
          <button
            onClick={() => navigateSlide("next")}
            className="text-black p-4 rounded-full border-2 hover:border-gray-700 transition-all duration-300"
          >
            <p className="font-bold text-2xl sm:text-4xl">&nbsp;&gt;&nbsp;</p>
          </button>
        </div>
      </div>

      {/* Carousel Wrapper */}
      <div
        className="relative flex flex-col sm:flex-row items-center w-full min-h-fit overflow-hidden text-white"
        onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleMove(e.touches[0].clientX)}
        onTouchEnd={handleEnd}
        onMouseDown={(e) => handleStart(e.clientX)}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        <div
          className="flex w-full min-h-fit transition-transform ease-in-out duration-500"
          style={{
            transform: `translateX(calc(-${
              currentSlide * 100
            }% + ${translateX}px))`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="relative flex justify-center items-center min-w-full"
            >
              {/* Slide Content */}
              <div className="relative w-full h-fit sm:h-fit flex flex-col-reverse md:flex-row items-center justify-around">
                <div className="w-full h-fit sm:w-1/2 p-8">
                  <h2 className="text-4xl font-bold text-black mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-black text-lg mb-6 hidden md:block">
                    {slide.description}
                  </p>
                  <Link
                    href={"#"}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                  >
                    Get Best Quote
                  </Link>
                </div>

                {/* Slide Image */}
                <div className="w-full max-w-[300px] sm:max-w-[450px] sm:w-1/2 aspect-square relative sm:m-10">
                  <Image
                    src={slide.imageSrc}
                    alt={`Service ${slide.title}`}
                    fill
                    style={{ objectFit: "cover", overflow: "hidden" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Line */}
      <div className="w-full flex justify-center items-center">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 ${
              index === currentSlide ? "bg-blue-700" : "bg-gray-200/70"
            } transition-all duration-300`}
            style={{ width: `${100 / slides.length}%` }}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
