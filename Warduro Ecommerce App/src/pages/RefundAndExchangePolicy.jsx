import React from 'react';

export default function RefundExchangePolicy() {
    return (
        <div className="flex flex-col items-center lg:items-start justify-center  p-3 px-1 pt-0 mt-24 md:mt-20 lg:mt-28 xl:mt-28">
            <div className="max-w-auto bg-black  w-full rounded-lg p-6">
                <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl font-bold mb-4 text-[#FFAA00] text-center">
                    Refund and Exchange Policy
                    
                </h1>
                <p className="whiteText mb-6 text-center lg:text-left">
                    At WARDURO, customer satisfaction is our top priority. Please review our refund and exchange policy below.
                </p>
                <ul className="list-disc pl-5 space-y-4 whiteText text-justify ">
                    <li>We accept exchanges for hoodies that do not meet our product description.</li>
                    <li>Exchange requests are accepted up to 7 days from the date of delivery.</li>
                    <li>Refunds are only provided for defective or damaged items.</li>
                    <li>Exchange requests will be processed within 3-5 working days.</li>
                    <li>Delivery charges are non-refundable for exchange orders.</li>
                    <li>Customers are responsible for return shipping costs unless the product is defective.</li>
                    <li>Orders above Rs. 3,000 are eligible for exchange only, not refunds.</li>
                    <li>If you receive a damaged or incorrect hoodie, we will cover the return shipping charges.</li>
                </ul>
                <p className=" mt-6 text-center text-gray-300">
                    For any questions or concerns, please reach out to our support team. We're here to help!
                </p>
            </div>
        </div>
    );
}
