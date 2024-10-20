import CompanyInfo from "@/app/(landing)/_landing/CompanyInfo";
import { FeedBackCarousel } from "@/app/(landing)/_landing/feedBackCarousel";
import Footer from "@/app/(landing)/_landing/Footer";
import HeaderCarousel from "@/app/(landing)/_landing/HeaderCarousel";
import HeroSection from "@/app/(landing)/_landing/HeroSection";
import NavBar from "@/app/(landing)/_landing/NavBarLanding";
import { Parallax } from "@/app/(landing)/_landing/parallax";
import Specialities from "@/app/(landing)/_landing/Specialities";
import WhatsAppButton from "@/app/(landing)/_landing/WhatsAppCTA";
import MobileTabBar from "@/app/(landing)/_landing/MobileTabBar";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-white text-black dark:bg-black dark:text-white items-center w-full min-h-screen">
      {/* <HeaderCarousel /> */}
      <NavBar />
      <HeroSection />
      <Specialities />
      <CompanyInfo />
      <FeedBackCarousel />
      <Parallax />
      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
      <Toaster />
    </main>
  );
}
