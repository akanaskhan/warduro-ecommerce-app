import React from "react";
import { Link } from "react-router-dom";

export default function TermsAndConditions() {
  return (
    <>
      <div className="w-full container p-3 px-1 pt-0 mt-24 md:mt-20 lg:mt-28 xl:mt-28">
        <div className="p-8 text-gray-300  bg-black rounded-lg shadow-lg">
          <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-center mb-8  text-[#FFAA00]">
            Terms and Conditions
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using <strong>WARDURO</strong>, you agree to
              comply with and be bound by these Terms and Conditions. If you do
              not agree, please refrain from using our site or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              2. Purchases and Payment
            </h2>
            <p>
              All payments are processed securely. By placing an order, you
              confirm that the payment details provided are accurate and that
              you authorize us to process the payment for your order.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              3. Product Information
            </h2>
            <p>
              We strive to display accurate product descriptions and images of
              our hoodies. However, we cannot guarantee that all descriptions or
              content are error-free. If you have questions, feel free to
              contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              4. Returns and Refunds
            </h2>
            <p>
              Our return and refund policy applies to all purchases. Please
              review our{" "}
              <Link to="/refund-and-exchange-policy" className="text-blue-500">
                Return Policy
              </Link>{" "}
              for more details.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              5. Intellectual Property
            </h2>
            <p>
              All content on <strong>WARDURO</strong>, including logos, images,
              and text, is the property of WARDURO and is protected by copyright
              laws. Unauthorized use of our content is strictly prohibited.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              6. User Conduct
            </h2>
            <p>
              By using our website, you agree not to engage in any activity that
              may harm WARDURO, other users, or third parties. Misuse of our
              services may result in restricted access.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              7. Limitation of Liability
            </h2>
            <p>
              WARDURO is not liable for any damages arising from the use of our
              site or products. Your use of our website and products is at your
              own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              8. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Changes
              will be effective immediately upon posting. Continued use of our
              site after any updates constitutes acceptance of the revised
              terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us:
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:warduro@gmail.com" className="text-blue-500">
                warduro@gmail.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:+923370791676" className="text-blue-500">
                +92-337-0791676
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
