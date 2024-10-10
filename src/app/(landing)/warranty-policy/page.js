import GetInTouch from "../_landing/GetInTouch";

export default function WarrantyPolicy() {
  return (
    <section className=" py-10 px-5 sm:px-10 ">
      <div className="container mx-auto pb-10">
        <div className="lg:w-3/4">
          {/* Left Side */}
          <div className="py-8 ">
            <p className="text-4xl md:text-6xl text-black mt-4 border-l-4 border-blue-500 pl-4 font-exo">
              Warranty Policy
            </p>
          </div>

          {/* Right Side - Accordions */}
          <div className="py-2 max-w-4xl">
            <p className="mb-6">
              This Warranty Agreement <strong>Policy</strong> is established
              between Mayank Hydraulic <strong>Company</strong> and the
              purchaser <strong>Customer</strong> of hydraulic components{" "}
              <strong>Product</strong>. By acquiring the Product, the Customer
              agrees to the terms laid out in this document.
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                1. Coverage of Warranty:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  1.1 The Product is covered by a warranty for a period of [12
                  months] from the date of purchase, ensuring it is free from
                  defects in materials and workmanship when used under standard
                  operating conditions.
                </li>
                <li>
                  1.2 The Company reserves the right to either repair or replace
                  any defective component during the warranty period, based on
                  its assessment.
                </li>
                <li>
                  1.3 This warranty is applicable only to Products purchased
                  directly from Mayank Hydraulic or its authorized resellers.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                2. Exclusions and Limitations:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  2.1 The warranty is void if any damage or malfunction is
                  caused by improper installation, negligence, misuse,
                  accidents, modifications, or repairs done by unauthorized
                  parties.
                </li>
                <li>
                  2.2 The warranty does not extend to Products used with
                  non-recommended or incompatible equipment or accessories.
                </li>
                <li>
                  2.3 Routine wear and tear, as well as consumable components
                  like seals, gaskets, filters, and O-rings, are not covered
                  under this warranty.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                3. Filing a Warranty Claim:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  3.1 To submit a warranty claim, the Customer must contact the
                  Company in writing within the warranty period and provide a
                  detailed explanation of the issue.
                </li>
                <li>
                  3.2 The Company may request proof of purchase, such as a valid
                  invoice or sales receipt, to validate the claim.
                </li>
                <li>
                  3.3 Upon confirmation of the claim’s validity, the Company
                  will repair or replace the defective components as soon as
                  possible.
                </li>
                <li>
                  3.4 Warranty-covered Products must be shipped prepaid to
                  Mayank Hydraulic, Ghaziabad, along with a return
                  authorization. Repairs completed under warranty will continue
                  with the remainder of the original warranty period.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                4. Limitation of Liability:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  4.1 The Company’s liability under this Policy is limited
                  strictly to the repair or replacement of defective components
                  as outlined in Section 3.
                </li>
                <li>
                  4.2 The Company is not responsible for indirect, incidental,
                  or special damages arising from the use or performance of the
                  Product, including loss of profits, business, or data.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                5. Non-Transferability of Warranty:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  5.1 This warranty applies only to the original purchaser and
                  is non-transferable. It is valid solely for Products purchased
                  directly from Mayank Hydraulic or its authorized distributors.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                6. Legal Jurisdiction and Governing Law:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  6.1 This Policy is governed by Indian law, and any disputes or
                  claims arising from it will be subject to the jurisdiction of
                  courts located in Punjab, India.
                </li>
              </ul>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                7. Modification and Termination:
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  7.1 Mayank Hydraulic reserves the right to modify or terminate
                  this Warranty Policy without prior notice. However,
                  modifications will not affect warranty coverage for Products
                  already purchased under the original terms.
                </li>
              </ul>
            </div>

            <p>
              Please ensure you read and understand this Warranty Policy before
              making a purchase. By purchasing the Product, the Customer agrees
              to adhere to these terms.
            </p>

            <p className="mt-4">
              For any questions regarding the warranty or to seek clarification,
              please reach out to Mayank Hydraulic customer service team.
            </p>
          </div>
        </div>
      </div>
      <GetInTouch />
    </section>
  );
}

export const metadata = {
  title: "Warranty Policy | Mayank Hydraulic ",
  description:
    "An Authorized Wholesale Dealer, Retailer, Trader, and Supplier, offering a wide range of products including Hydraulic Pumps, Hydraulic Valves, Piston Pumps, Servo Valves, and more.",
};
