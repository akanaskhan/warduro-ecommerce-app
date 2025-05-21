import React from 'react';
import { BsTiktok, BsTwitterX } from 'react-icons/bs';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import { useForm } from "react-hook-form";
import { Button, message, Modal } from "antd";
import { useNavigate } from "react-router";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../utils/firebase";

function ContactUs() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [modal, contextHolder] = Modal.useModal();

  const onSubmit = (data) => {
    const ContactCollectionRef = collection(db, "WarduroFeedback");
    const obj = {
      ...data,
      createdAt: serverTimestamp(),
    };
    addDoc(ContactCollectionRef, obj).then(() => {
      reset();
      showSuccessModal();
      message.success('Thanks for your feedback.')
    });
  };

  const showSuccessModal = () => {
    let secondsToGo = 5;
    const instance = modal.success({
      title: 'Thanks for contacting us!',
      content: `Your feedback made our day!`,
      okButtonProps: { style: { display: 'none' } }, 
      centered: true,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Your feedback made our day!`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const contactData = {
    phone: "+92-337-0791676",
    email: "warduro@gmail.com",
    socialMedia: [
      { platform: "Facebook", url: "https://www.facebook.com/warduro", icon: <FaFacebook /> },
      { platform: "Instagram", url: "https://www.instagram.com/warduro", icon: <FaInstagram /> },
      { platform: "TikTok", url: "https://www.tiktok.com/@warduro", icon: <BsTiktok /> },
    ]
  };

  return (
    // <div className="contact-us-container p-8 max-w-3xl mx-auto">
    //   <h1 className="text-2xl  md:text-3xl  lg:text-3xl xl:text-4xl xxl:text-4xl font-bold text-center mb-8 text-black">Contact Us</h1>
      
    //   <div className="mb-8 text-center">
    //     <p className="text-lg"><strong>Phone:</strong> {contactData.phone}</p>
    //     <p className="text-lg"><strong>Email:</strong> <a href={`mailto:${contactData.email}`} className="text-blue-600">{contactData.email}</a></p>
    //   </div>

    //   <div className="mb-8">
    //     <h2 className="text-2xl font-semibold mb-4 text-center">Get in Touch</h2>
    //     <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
    //       <input
    //         type="text"
    //         placeholder="Your Name"
    //         className="w-full px-4 py-2 border rounded-md"
    //         {...register("name", { required: true })}
    //       />
    //       {errors.name && <span className="text-sm text-red-500">This field is required</span>}
          
    //       <input
    //         type="email"
    //         placeholder="Your Email"
    //         className="w-full px-4 py-2 border rounded-md"
    //         {...register("email", { required: true })}
    //       />
    //       {errors.email && <span className="text-sm text-red-500">This field is required</span>}

    //       <textarea
    //         placeholder="Your Message"
    //         className="w-full px-4 py-2 border rounded-md"
    //         rows="4"
    //         {...register("message", { required: true })}
    //       ></textarea>
    //       {errors.message && <span className="text-sm text-red-500">This field is required</span>}

    //       <button
    //         type="submit"
    //         className="w-full py-2 rounded-md font-semibold learn-btn transition-all"
    //       >
    //         Send Message
    //       </button>
    //     </form>
    //   </div>

    //   <div className="text-center">
    //     <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
    //     <div className="flex flex-wrap justify-center space-x-4">
    //       {contactData.socialMedia.map((social, index) => (
    //         <a
    //           key={index}
    //           href={social.url}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-lg hover:underline flex items-center"
    //         >
    //           <span className="mr-2">{social.icon}</span>
    //           {social.platform}
    //         </a>
    //       ))}
    //     </div>
    //   </div>

    //   {contextHolder}
    // </div>
    <section className="text-gray-600  relative mt-18 md:mt-20 lg:mt-20 xl:mt-20">
    <div className="absolute inset-0 bg-gray-600">
      <iframe
        width="100%"
        height="100%"
        frameBorder={0}
        marginHeight={0}
        marginWidth={0}
        title="map"
        scrolling="no"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7050398.573097836!2d68.9966984!3d30.36295725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f8fd751f%3A0x46b7a1f7e614925c!2sPakistan!5e0!3m2!1sen!2s!4v1734131762198!5m2!1sen!2s"
        style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
      />
    </div>
    <div className="container px-4 lg:px-5 py-24 mx-auto flex">
  <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
    <h2 className="text-black text-lg mb-1 font-medium title-font">
      Feedback
    </h2>
    <p className="leading-relaxed mb-3 text-gray-600">
      We value your feedback. Let us know how we can improve!
    </p>
    <form onSubmit={handleSubmit(onSubmit)}>

    <div className="relative mb-4">
    
        
      <label htmlFor="email" className="leading-7 text-sm text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className="w-full bg-white rounded border border-gray-300 focus:border-[#FFAA00] focus:ring-2 focus:ring-[#FFAA00] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        {...register("email", { required: true })}
        />
        {errors.email && <span className="text-sm text-red-500">This field is required</span>}

    </div>
    <div className="relative mb-4">
      <label htmlFor="message" className="leading-7 text-sm text-gray-700">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        className="w-full bg-white rounded border border-gray-300 focus:border-[#FFAA00] focus:ring-2 focus:ring-[#FFAA00] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        defaultValue={""}
        {...register("message", { required: true })}
        ></textarea>
        {errors.message && <span className="text-sm text-red-500">This field is required</span>}
        </div>
    <button type="submit" className="text-white w-full bg-[#FFAA00] learn-btn border-0 py-2 px-6 focus:outline-none rounded text-lg transition-all">
      Send Feedback
    </button>
    </form>
    <p className="text-xs text-gray-500 mt-3">
      Your feedback is important to us. Thank you for helping us improve!
    </p>
     
  </div>
  
</div>

  </section>
  
  );
}

export default ContactUs;
