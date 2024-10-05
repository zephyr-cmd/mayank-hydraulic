import { Inter } from "next/font/google";
import Footer from "./_landing/Footer";
import NavBarLanding from "./_landing/NavBarLanding";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title:
//     "Sarvanjana Hospital Rishikesh | Best 24/7 Multispeciality Services in Nepali Farm, Rishikesh, Raiwala",
//   description:
//     "Sarvanjana Hospital in Rishikesh offers 24/7 Multi-Specialty services & emergency care for residents & Tourists of Rishikesh & Raiwala. Visit us for comprehensive care.",
// };

export default function RootLayout({ children }) {
  return (
    <div lang="en">
      <NavBarLanding />
      <div className={inter.className}>{children}</div>
      <Footer />
    </div>
  );
}
