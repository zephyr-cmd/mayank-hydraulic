import Link from "next/link";
import GetInTouch from "../_landing/GetInTouch";

export default function PrivacyPolicy() {
  return (
    <section className=" py-10 px-5 sm:px-10 ">
      <div className="container mx-auto pb-10">
        <div className="lg:w-3/4">
          {/* Left Side */}
          <div className="py-8 ">
            <p className="text-4xl md:text-6xl text-black mt-4 border-l-4 border-blue-500 pl-4 font-exo">
              Privacy Policy
            </p>
          </div>

          {/* Right Side - Accordions */}
          <div className="py-2 max-w-4xl">
            <p className="mb-6">
              At Mayank Hydraulic, we highly respect your privacy and are
              committed to protecting your personal information. This Privacy
              Policy explains how we gather, use, disclose, and protect your
              data through our website &nbsp;
              <Link
                className="text-blue-700 underline"
                href={"https://mayank-hydraulic.vercel.app"}
              >
                <strong>https://mayank-hydraulic.vercel.app</strong>
              </Link>
              . By interacting with our website, you agree to the terms
              described in this policy.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Types of Data We Collect
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Personal Data:</strong> We may gather personally
                  identifiable information (e.g., name, email address, phone
                  number, company name) when you voluntarily submit this data
                  through forms or interact with our customer support.
                </li>
                <li>
                  <strong>Non-Personal Data:</strong> Through cookies and
                  similar technologies, we may automatically collect
                  non-identifiable data such as your browser type, IP address,
                  device information, and patterns of website usage when you
                  visit our site.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. How We Use the Data
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Service Delivery:</strong> Your personal data allows
                  us to respond to inquiries, process orders, and provide
                  customer support.
                </li>
                <li>
                  <strong>Site Enhancement:</strong> Non-personal information
                  helps us optimize website functionality, analyze traffic, and
                  enhance user experience.
                </li>
                <li>
                  <strong>Communication:</strong> We may use your email address
                  to send updates, promotional content, or information about
                  orders. You can opt out of such communications at any time.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Data Security Measures
              </h2>
              <p className="mb-4">
                We employ industry-standard security methods to protect your
                personal data against unauthorized access, misuse, and
                alteration. However, please note that no data transmission or
                electronic storage method is entirely secure, and we cannot
                guarantee absolute security.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Sharing and Disclosure
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Third-Party Providers:</strong> We may share your
                  information with reliable third-party service providers who
                  assist with our website operations or process your requests.
                  These providers must adhere to strict confidentiality
                  agreements.
                </li>
                <li>
                  <strong>Legal Obligations:</strong> If required by law,
                  regulation, or legal process, we may disclose your information
                  to protect our rights, safety, or property.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Links to External Sites
              </h2>
              <p className="mb-4">
                Our website may contain links to third-party websites. Please
                note that this Privacy Policy applies only to our own website.
                We are not responsible for the privacy practices of external
                sites, and we encourage you to review their individual privacy
                policies.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. User Choices</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  You can opt out of receiving marketing emails by following the
                  &nbsp;
                  <q>unsubscribe</q>
                  &nbsp; instructions in our communications.
                </li>
                <li>
                  You can also control cookie preferences directly through your
                  web browser settings.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Protection of Children&apos;s Privacy
              </h2>
              <p className="mb-4">
                Our website is not intended for individuals under the age of 16.
                We do not knowingly collect personal data from children. If you
                believe a child has provided us with their information, please
                contact us, and we will promptly delete it.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                8. Changes to the Policy
              </h2>
              <p className="mb-4">
                We reserve the right to update or modify this Privacy Policy
                from time to time. Any changes will be reflected on this page,
                and the effective date will be adjusted accordingly.
              </p>
            </div>

            <p>
              By using our website, you acknowledge that you have read,
              understood, and agree to this Privacy Policy. Please check back
              periodically for any updates or revisions.
            </p>

            <p className="mt-4">
              If you have any questions regarding this Privacy Policy, feel free
              to contact Mayank Hydraulic Ghaziabad for clarification.
            </p>
          </div>
        </div>
      </div>
      <GetInTouch />
    </section>
  );
}

export const metadata = {
  title: "Privacy Policy | Mayank Hydraulic ",
  description:
    "An Authorized Wholesale Dealer, Retailer, Trader, and Supplier, offering a wide range of products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps, Servo Valves, and more.",
};
