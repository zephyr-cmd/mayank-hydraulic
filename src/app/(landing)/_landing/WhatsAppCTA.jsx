import Image from "next/image";
import Link from "next/link";

const WhatsAppButton = () => {
  const phoneNumber = "918826381983"; // Replace with your actual phone number in international format
  const message = "Hello! ?"; // Optional pre-filled message
  const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
    message
  )}&type=phone_number&app_absent=0`;

  return (
    <Link
      href={whatsappURL}
      className="hidden md:flex fixed bottom-5 right-5 bg-green-500 text-white p-3 rounded-full shadow-lg items-center hover:bg-green-600 transition duration-300"
      target="_blank"
    >
      <div className="max-w-[300px] aspect-square relative">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="whatsapp"
          width={35}
          height={35}
        />
      </div>
    </Link>
  );
};

export default WhatsAppButton;
