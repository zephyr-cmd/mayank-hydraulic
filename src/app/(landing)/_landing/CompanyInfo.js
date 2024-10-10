const CompanyInfo = () => {
  return (
    <section className="container mx-auto py-7">
      {/* Customer Retention Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Retention
        </h2>
        <p className="text-gray-700 mb-4">
          In today&apos;s competitive landscape, retaining customers is key to
          staying ahead in the market. We are committed to delivering
          exceptional service alongside premium quality products. Our focus on
          customer retention includes:
        </p>
        <ul className="list-disc ml-6 text-gray-700 space-y-2">
          <li>
            Guaranteeing that our customers always receive top-performing
            products.
          </li>
          <li>
            Maintaining transparency and integrity in every interaction with our
            clients.
          </li>
          <li>
            Ensuring customers achieve financial value through our product
            offerings.
          </li>
          <li>
            Consistently meeting deadlines and fulfilling all customer orders
            efficiently.
          </li>
        </ul>
      </div>

      {/* Quality as Priority Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Commitment to Quality
        </h2>
        <p className="text-gray-700 mb-4">
          Quality is at the heart of everything we do. We&apos;ve partnered with
          leading suppliers to source the highest-grade materials. Our extensive
          product line includes hydraulic motors, power packs, solenoid valves,
          and more—all manufactured with the utmost precision. Our skilled team
          ensures each product adheres to the strictest quality standards.
        </p>
      </div>

      {/* Our Warehouse Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Warehousing Excellence
        </h2>
        <p className="text-gray-700">
          A well-organized warehousing system is crucial for production
          efficiency. Our spacious, secure warehouse ensures that all products
          are stored and handled with care, maintaining order throughout the
          process.
        </p>
      </div>
    </section>
  );
};

export default CompanyInfo;
