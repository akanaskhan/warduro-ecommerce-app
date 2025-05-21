import { useEffect, useState } from "react";
import { BiLogoWhatsapp } from "react-icons/bi";

export default function WhatsApp() {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const footer = document.querySelector("footer"); // Select the footer element
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsFooterVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the footer is visible
    );

    observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  useEffect(() => {
    // Add a slight delay to animate the fade
    if (isFooterVisible) {
      setTimeout(() => setIsVisible(false), 100);
    } else {
      setIsVisible(true);
    }
  }, [isFooterVisible]);

  return (
    <>
    <style>
        {`
        .whatsapp-btn {
  transition: opacity 0.2s ease-in-out;
}

.whatsapp-btn.hidden {
  opacity: 0;
}

.whatsapp-btn.visible {
  opacity: 1;
}
`}
    </style>
      <a
        href="https://api.whatsapp.com/send/?phone=923370791676"
        className={`fixed bottom-7 right-7 z-10 content-center bg-[#25D366] hover:bg-green-600 transition-all rounded-full shadow-xl 
          ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <BiLogoWhatsapp className="text-white text-5xl m-2" />
        </div>
      </a>
    </>
  );
}
