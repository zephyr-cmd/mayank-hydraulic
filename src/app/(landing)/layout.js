import { Inter } from "next/font/google";
import Footer from "@/app/(landing)/_landing/Footer";
import NavBar from "@/app/(landing)/_landing/NavBarLanding";
import MobileTabBar from "@/app/(landing)/_landing/MobileTabBar";
import WhatsAppButton from "./_landing/WhatsAppCTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:
    "Mayank Hydraulic | Hydraulic Piston Pump Manufacturer, Axial Piston Motor Supplier ",
  description:
    "An Authorized Wholesale Dealer, Retailer, Trader, and Supplier, offering a wide range of products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps, Servo Valves, and more.",
};

export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <NavBar />
      <div className={inter.className}>{children}</div>
      <Footer />
      <WhatsAppButton />
      <MobileTabBar />
    </div>
  );
}
