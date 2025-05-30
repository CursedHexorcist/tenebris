import React, { useEffect, memo, useMemo, useState } from "react";
import { MessageCircle, Code, Globe, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Memoized Components
const Header = memo(() => (
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
));

const ProfileImageSlider = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    "https://res.cloudinary.com/dc3bfhgfd/image/upload/v1746947564/WhatsApp_Image_2025-05-11_at_14.07.23_73b83b9c_zakzbj.jpg",
    "https://res.cloudinary.com/dc3bfhgfd/image/upload/v1746947607/nierautomata_gakyda.jpg"
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2 relative">
      <div 
        className="relative group w-full max-w-[20rem] mx-auto" 
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        {/* Glow effects */}
        <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#06B6D4] via-[#06B6D4] to-[#FFD6E7] rounded-full blur-2xl animate-spin-slower" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#FFD6E7] via-white to-[#06B6D4] rounded-full blur-2xl animate-pulse-slow opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06B6D4] via-white to-[#FFD6E7] rounded-full blur-2xl animate-float opacity-50" />
        </div>

        {/* Slider container */}
        <div className="relative overflow-hidden w-72 h-72 sm:w-80 sm:h-80 rounded-full mx-auto" aria-live="polite">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.3)] transform transition-all duration-700 group-hover:scale-105">
                <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06B6D4]/20 via-transparent to-[#FFD6E7]/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
                
                <img
                  src={img}
                  alt={`Profile ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  loading="lazy"
                />

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
                  <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-[#06B6D4] w-6' : 'bg-gray-500/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  const { totalProjects, YearExperience } = useMemo(() => {
    const startDate = new Date("1999-12-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: 3,
      YearExperience: experience
    };
  }, []);

  const [isHoveringNier, setIsHoveringNier] = useState(false);
  const [isHoveringGwen, setIsHoveringGwen] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        duration: 800,
        easing: 'ease-in-out-quad'
      });
    };

    initAOS();
    
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  const statsData = [
    {
      icon: Code,
      color: "from-[#06B6D4] to-[#FFD6E7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Globe,
      color: "from-[#06B6D4] to-[#FFD6E7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ];

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-4 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7]">
                Hi there! We're
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Gwen & Nier
              </span>
            </h2>
            
            <p 
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              We're two developers passionate about turning ideas into functional solutions.
              From building scalable systems to crafting custom scripts,
              we focus on creating tools that help users work smarter and faster.
              Every line of code is written with the goal of improving the way things work —
              one project at a time.
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a 
                href="https://www.instagram.com/gwen.example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full lg:w-auto relative group"
                onMouseEnter={() => setIsHoveringGwen(true)}
                onMouseLeave={() => setIsHoveringGwen(false)}
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] transition-all duration-300 ${isHoveringGwen ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-[#030014] rounded-lg border border-transparent transition-all duration-300 ${isHoveringGwen ? 'opacity-100 border-gradient' : 'opacity-0'}`}>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-clip-padding" style={{
                    backgroundImage: 'linear-gradient(#030014, #030014), linear-gradient(to right, #06B6D4, #FFD6E7)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box'
                  }}></div>
                </div>
                <button 
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="relative w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium flex items-center justify-center lg:justify-start gap-2 animate-bounce-slow focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> 
                  Chat With Gwen
                </button>
              </a>

              <a 
                href="https://www.instagram.com/nier.example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full lg:w-auto relative group"
                onMouseEnter={() => setIsHoveringNier(true)}
                onMouseLeave={() => setIsHoveringNier(false)}
              >
                <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] transition-all duration-300 ${isHoveringNier ? 'opacity-0' : 'opacity-100'}`}></div>
                <div className={`absolute inset-0 bg-[#030014] rounded-lg border border-transparent transition-all duration-300 ${isHoveringNier ? 'opacity-100 border-gradient' : 'opacity-0'}`}>
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent bg-clip-padding" style={{
                    backgroundImage: 'linear-gradient(#030014, #030014), linear-gradient(to right, #06B6D4, #FFD6E7)',
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box'
                  }}></div>
                </div>
                <button 
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="relative w-full lg:w-auto sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium flex items-center justify-center lg:justify-start gap-2 animate-bounce-slow delay-200 focus:outline-none focus:ring-2 focus:ring-[#06B6D4]"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> 
                  Chat With Nier
                </button>
              </a>
            </div>
          </div>

          <ProfileImageSlider />
        </div>

        <a href="#Creations" className="focus:outline-none focus:ring-2 focus:ring-[#06B6D4] rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
