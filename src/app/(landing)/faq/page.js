import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GetInTouch from "../_landing/GetInTouch";

export default function FAQ() {
  const faqData = [
    {
      question: "What are the ideal applications for piston pumps?",
      answer:
        "Piston pumps are ideal for high-pressure, precision-controlled environments that demand efficient performance, such as in hydraulic presses, industrial machinery, and mobile equipment.",
    },
    {
      question:
        "What are the advantages of hydraulic motors in industrial settings?",
      answer:
        "Hydraulic motors excel in delivering high torque at low speeds, making them suitable for demanding applications such as winches, conveyors, and machine tools, where precision and heavy-duty performance are crucial.",
    },
    {
      question:
        "How can I choose the correct hydraulic pump or motor for my needs?",
      answer:
        "Our experienced team can assist in assessing your specific needs—including flow rate, pressure, speed, and environmental factors—to recommend the most appropriate hydraulic pump or motor for your application.",
    },
    {
      question:
        "What is the expected lifespan of your hydraulic pumps and motors?",
      answer:
        "With regular maintenance, our hydraulic pumps and motors are engineered to offer long-lasting, reliable performance, ensuring that your operations remain productive over the years.",
    },
    {
      question: "What types of hydraulic pumps do you offer?",
      answer:
        "We offer a wide range of hydraulic pumps, including Servo Pumps, Axial Piston Pumps, Gear Pumps, Vane Pumps, and Pump Motor Assemblies. \n - Servo pumps enhance machine efficiency and cut energy costs, improving overall performance. \n - Axial piston pumps provide high power for heavy-duty operations like lifting and powering machinery. \n - Gear pumps offer consistent fluid transfer, supporting smooth industrial processes. \n - Vane pumps operate with low noise and vibration, creating a more stable work environment. \n - Pump motor assemblies are versatile, suitable for hydraulic, cooling, and circulation systems.",
    },
  ];

  return (
    <section className=" py-10 px-5 sm:px-10 ">
      <div className="container mx-auto pb-10">
        <div className="lg:w-3/4">
          {/* Left Side */}
          <div className="py-8 ">
            <h2 className="text-base sm:text-xl font-bold text-black uppercase">
              FAQ&apos;s
            </h2>
            <p className="text-4xl md:text-6xl text-black mt-4 border-l-4 border-blue-500 pl-4 font-exo">
              Hydraulic Products
            </p>
          </div>

          {/* Right Side - Accordions */}
          <div className="">
            {faqData.map((service, index) => (
              <div key={index} className="border-b border-gray-200">
                <Accordion type="single" collapsible>
                  <AccordionItem value={1 + index}>
                    <AccordionTrigger className="font-poppins text-lg font-medium text-black text-left">
                      {service.question}
                    </AccordionTrigger>
                    <AccordionContent className="font-poppins text-lg font-medium text-black">
                      {service.answer}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
      <GetInTouch />
    </section>
  );
}

export const metadata = {
  title: "FAQ's | Mayank Hydraulic ",
  description:
    "An Authorized Wholesale Dealer, Retailer, Trader, and Supplier, offering a wide range of products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps, Servo Valves, and more.",
};
