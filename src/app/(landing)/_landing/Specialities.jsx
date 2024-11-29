import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const specialties = [
  {
    title: "Bosch Rexroth A10VM Axial Piston Motor",
    imgSrc:
      "https://cpimg.tistatic.com/08659043/b/4/Bosch-Rexroth-A10VM-Axial-Piston-Motor.jpg",
    imgAlt: "Bosch Rexroth A10VM Axial Piston Motor",
  },
  {
    title: "A10Vno 41 Rexrauth Hydraulic Pump",
    imgSrc:
      "https://cpimg.tistatic.com/08659023/b/4/A10Vno-41-Rexrauth-Hydraulic-Pump.jpg",
    imgAlt: "A10Vno 41 Rexrauth Hydraulic Pump",
  },
  {
    title: "Rexroth Bosch Aa4csg Series 30 Axial Piston Variable Pump",
    imgSrc:
      "https://cpimg.tistatic.com/08659030/b/4/Rexroth-Bosch-Aa4csg-Series-30-Axial-Piston-Variable-Pump.jpg",
    imgAlt: "Rexroth Bosch Aa4csg Series 30 Axial Piston Variable Pump",
  },
  {
    title: "Hydraulic Tandem Pump",
    imgSrc: "https://cpimg.tistatic.com/08659027/b/4/Hydraulic-Tandem-Pump.jpg",
    imgAlt: "Hydraulic Tandem Pump",
  },
  {
    title: "Parker Dension Hydraulic Pump",
    imgSrc:
      "https://cpimg.tistatic.com/09225153/b/4/Parker-Dension-Hydraulic-Pump.jpg",
    imgAlt: "Parker Dension Hydraulic Pump",
  },
  {
    title: "Danfoss Omt 400 Hydraulic Motor",
    imgSrc:
      "https://cpimg.tistatic.com/08659012/b/4/Danfoss-Omt-400-Hydraulic-Motor.jpg",
    imgAlt: "Danfoss Omt 400 Hydraulic Motor",
  },
  {
    title: "OMT Series Orbital Hydraulic Motor",
    imgSrc:
      "https://cpimg.tistatic.com/08659018/b/4/OMT-Series-Orbital-Hydraulic-Motor.jpg",
    imgAlt: "OMT Series Orbital Hydraulic Motor",
  },
  {
    title: "230 V Danfoss Hydraulic Motor",
    imgSrc:
      "https://cpimg.tistatic.com/08659010/b/4/230-V-Danfoss-Hydraulic-Motor.jpg",
    imgAlt: "230 V Danfoss Hydraulic Motor",
  },
];

const generateHref = (title) => {
  return `#products/${title.replace(/\s+/g, "-").toLowerCase()}`;
};

function Specialities() {
  return (
    <section className="min-h-fit w-full py-12 bg-gradient-to-br from-black to-neutral-950 flex flex-col gap-2 items-center justify-center">
      <p className="bg-gradient-to-r from-blue-700  to-indigo-400 text-transparent bg-clip-text text-center font-bold text-3xl sm:text-5xl  leading-tight tracking-tighter">
        Most Popular Products
      </p>
      <p className="text-white mt-4 p-7 text-center">
        At M/s Mayank Hydraulic, we are proud to be an Authorized Wholesale
        Dealer, Retailer, Trader, and Supplier, offering a wide range of
        products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps,
        Servo Valves, and more.
      </p>
      <div className="container mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 md:gap-8 md:p-20">
        {specialties.map((specialty, index) => (
          <Link href={generateHref(specialty.title)} key={index}>
            <div className="relative group flex flex-col h-80 w-64 overflow-hidden">
              <div className="relative w-full h-full transition-all duration-700 group-hover:scale-110">
                <Image
                  src={specialty.imgSrc}
                  alt={specialty.imgAlt}
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
                  className="absolute transform grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute top-0 right-0 p-4 bg-black/40 hover:bg-black/60 hover:grayscale-0 w-full h-full transition-all duration-700">
                <h3 className="absolute inset-0 text-lg font-bold h-full inset-y-3/4 justify-center text-white text-center ">
                  {specialty.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/our-products">
        <Button>Load More...</Button>
      </Link>
    </section>
  );
}

export default Specialities;
