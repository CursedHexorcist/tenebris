import React, { useEffect, useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AboutPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://res.cloudinary.com/dc3bfhgfd/image/upload/v1746947564/WhatsApp_Image_2025-05-11_at_14.07.23_73b83b9c_zakzbj.jpg",
    "https://res.cloudinary.com/dc3bfhgfd/image/upload/v1746947607/nierautomata_gakyda.jpg"
  ];

  const slideInterval = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval.current);
  }, []);

  const resetInterval = () => {
    clearInterval(slideInterval.current);
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  const handleNext = () => {
    nextSlide();
    resetInterval();
  };

  const handlePrev = () => {
    prevSlide();
    resetInterval();
  };

  const handleDotClick = (index) => {
    goToSlide(index);
    resetInterval();
  };

  return (
    <div className="w-full bg-[#1A202C] py-12 px-5 sm:px-10 md:px-20">
      <div className="text-center mb-4 px-[5%] pt-6 md:pt-10">
        <div className="inline-block relative group">
          <h2
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7]"
            data-aos="zoom-in-up"
            data-aos-duration="600"
          >
            About Us
          </h2>
        </div>
        <p
          className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
          data-aos="zoom-in-up"
          data-aos-duration="800"
        >
          <Sparkles className="w-5 h-5 text-[#06B6D4]" />
          Building from ideas, growing through every line of code.
          <Sparkles className="w-5 h-5 text-[#FFD6E7]" />
        </p>
      </div>

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text Section */}
          <div className="text-center sm:text-left">
            <h3
              className="text-3xl font-bold text-[#06B6D4]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Our Mission
            </h3>
            <p
              className="mt-3 text-white text-lg"
              data-aos="fade-up"
              data-aos-duration="1200"
            >
              We strive to create impactful and innovative digital experiences, turning ideas into reality with code.
            </p>
            <div className="mt-6 flex justify-center gap-8">
              <a href="#" className="text-[#06B6D4] hover:text-[#FFD6E7] font-semibold">
                Learn More
              </a>
              <a href="#" className="text-[#06B6D4] hover:text-[#FFD6E7] font-semibold">
                Contact Us
              </a>
            </div>
          </div>

          {/* Profile Image Slider */}
          <div className="relative group w-full max-w-[20rem] mx-auto" data-aos="fade-up" data-aos-duration="1000">
            {/* Glow effects */}
            <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#06B6D4] to-[#FFD6E7] rounded-full blur-2xl animate-spin-slower" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#FFD6E7] via-white to-[#06B6D4] rounded-full blur-2xl animate-pulse-slow opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06B6D4] via-white to-[#FFD6E7] rounded-full blur-2xl animate-float opacity-50" />
            </div>

            {/* Image Slider */}
            <div className="relative overflow-hidden w-72 h-72 sm:w-80 sm:h-80 rounded-full mx-auto">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-700 group-hover:scale-105">
                    <img
                      src={img}
                      alt={`Profile ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-[#06B6D4] w-6' : 'bg-gray-500/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
