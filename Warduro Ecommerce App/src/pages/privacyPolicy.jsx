import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='flex flex-col items-center lg:items-start justify-center  p-3 px-1 pt-0 mt-24 md:mt-20 lg:mt-28 xl:mt-28 '>

   
    <div className="w-full container p-8 px-3 text-gray-300  bg-black rounded-xl shadow-lg">
      <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-center mb-8 text-[#FFAA00]">
        Privacy Policy
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">1. Introduction</h2>
        <p>
          Welcome to WARDURO! We value your privacy and are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you interact with us.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">2. Information We Collect</h2>
        <p>We may collect the following information:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Personal Information:</strong> Name, contact details, shipping addresses, and payment information.</li>
          <li><strong>Usage Data:</strong> Your interactions with our website, including pages visited and browsing behavior.</li>
          <li><strong>Cookies:</strong> Used to enhance user experience and analyze site performance.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">3. How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Process and deliver your hoodie orders efficiently.</li>
          <li>Provide customer support and respond to your queries.</li>
          <li>Send updates, promotions, and newsletters (with your consent).</li>
          <li>Improve our website and shopping experience.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">4. Sharing Your Information</h2>
        <p>We only share your data with:</p>
        <ul className="list-disc list-inside ml-4">
          <li><strong>Service Providers:</strong> For payment processing, order delivery, and email notifications.</li>
          <li><strong>Legal Obligations:</strong> To comply with legal requirements when necessary.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">5. Cookies</h2>
        <p>
          Our site uses cookies to enhance your browsing experience. You can manage cookie preferences through your browser settings. Note that disabling cookies may limit some website features.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">6. Data Security</h2>
        <p>
          We implement security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">7. Your Rights</h2>
        <p>
          You have the right to access, update, or delete your personal information. Please contact us to exercise your rights.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">8. Updates to This Policy</h2>
        <p>
          We may update this privacy policy periodically. Changes will be reflected on this page with an updated date.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-[#FFAA00]">9. Contact Us</h2>
        <p>For any questions or concerns, please contact us:</p>
        <p><strong>Email:</strong> <a href="mailto:warduro@gmail.com" className="text-blue-500">warduro@gmail.com</a></p>
        <p>
  <strong>Phone:</strong>{' '}
  <a href="tel:+923370791676" className="text-blue-500">
    +92-337-0791676
  </a>
</p>
      </section>
    </div>
    </div>
  );
};

export default PrivacyPolicy;
