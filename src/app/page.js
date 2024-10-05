import { FeedBackCarousel } from "./(landing)/_landing/feedBackCarousel";
import Footer from "./(landing)/_landing/Footer";
import Header from "./(landing)/_landing/Header";
import HeaderCarousel from "./(landing)/_landing/HeaderCarousel";
import { Parallex } from "./(landing)/_landing/parallex";
import Specialities from "./(landing)/_landing/Specialities";

export default function Home() {
  return (
    <main className="flex flex-col justify-center bg-white text-black dark:bg-black dark:text-white items-center w-full min-h-screen">
      <HeaderCarousel />
      {/* <Header /> */}
      <Specialities />
      <FeedBackCarousel />
      <Parallex />
      <Footer />
    </main>
  );
}
