import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

// Typing Constants
const TYPING_SPEED = 80;
const ERASING_SPEED = 70;
const PAUSE_DURATION = 700;
const WORDS = [
  "Fast Execution",
  "Continuous Improvement",
  "User-Friendly Interface",
  "Optimized Performance",
];

// Badge & Social Link Data
const FEATURE_BADGES = [
  { icon: "âš¡", label: "Fast Execution" },
  { icon: "ðŸš€", label: "24/7 Service" },
  { icon: "ðŸ”’", label: "Safe & Secure" },
];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/gabrieluiux" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/gabrielltan/" },
  { icon: Instagram, link: "https://www.instagram.com/capt_ivonic/?hl=id" },
];

// Dummy Project Data
const PROJECTS = [
  { id: "1", name: "Dashboard Redesign", category: "Ongoing" },
  { id: "2", name: "Mobile App Concept", category: "Coming Soon" },
  { id: "3", name: "E-Commerce UI", category: "Ongoing" },
  { id: "4", name: "Portfolio v2", category: "Coming Soon" },
];

// Title Component
const MainTitle = memo(() => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
    TENEBRIS <br />
    <span className="bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] bg-clip-text text-transparent">
      DEVELOPER
    </span>
  </h1>
));

// Feature Badge
const FeatureBadge = memo(({ icon, label }) => (
  <div className="px-3 py-1 rounded-full border border-white/10 text-white text-sm flex items-center gap-2 bg-white/5 backdrop-blur-md">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
));

// Social Link
const SocialLink = memo(({ icon: Icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white/10 transition"
  >
    <Icon className="w-5 h-5 text-white" />
  </a>
));

// Main Home Component
const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
    window.addEventListener("resize", AOS.refresh);
    return () => window.removeEventListener("resize", AOS.refresh);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const lottieOptions = {
    src: "https://lottie.host/1a32fee8-6121-4e6e-b861-fc4afe794b61/0W8pY7Wfem.lottie",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[140%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
        : "scale-[135%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`,
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div className={relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 pt-12 md:pt-20 pb-4">
          <div className="flex flex-col lg:flex-row items-center md:justify-between gap-6 lg:gap-12 pt-8 md:pt-12 pb-8">
            {/* LEFT */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8" data-aos="fade-right" data-aos-delay="200">
              <MainTitle />
              <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#06B6D4] to-[#FFD6E7] ml-1 animate-blink"></span>
              </div>
              <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="1200">
                {FEATURE_BADGES.map((badge, i) => (
                  <FeatureBadge key={i} {...badge} />
                ))}
              </div>
              <div className="flex gap-3" data-aos="fade-up" data-aos-delay="1400">
                <Link
                  to={/project/your-project-id}
                  className="inline-flex items-center text-[#06B6D4] hover:text-[#06B6D4]/80"
                >
                  <span className="text-sm font-medium">Detail Project</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <a href="#Contact" className="inline-flex items-center text-[#06B6D4] hover:text-[#06B6D4]/80">
                  <span className="text-sm font-medium">Contact</span>
                  <Mail className="w-4 h-4 ml-1" />
                </a>
              </div>
              <div className="hidden sm:flex gap-4" data-aos="fade-up" data-aos-delay="1600">
                {SOCIAL_LINKS.map((s, i) => (
                  <SocialLink key={i} {...s} />
                ))}
              </div>
            </div>

            {/* RIGHT - Lottie Animation */}
            <div
              className="w-full py-6 sm:py-0 lg:w-1/2 relative flex items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[400px] mx-auto opacity-90">
                <div className={`absolute inset-0 bg-gradient-to-r ${
                  isHovering ? "from-black/10 to-black/10" : "from-[#06B6D4]/10 via-white/5 to-[#FFD6E7]/10"
                } rounded-3xl blur-3xl`}></div>
                <div className="relative z-10 w-full">
                  <DotLottieReact {...lottieOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* PROJECT SECTION - Adjusted spacing values */}
          <div className="py-4 md:py-8" data-aos="fade-up" data-aos-delay="300">
            {/* Our Product Header */}
            <div className="text-center mb-4 md:mb-6">
              <div className="inline-block relative group">
                <h2 
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7]" 
                  data-aos="zoom-in-up"
                  data-aos-duration="600"
                >
                  Our Product
                </h2>
              </div>
              <p 
                className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
                data-aos="zoom-in-up"
                data-aos-duration="800"
              >
                <Sparkles className="w-5 h-5 text-[#06B6D4]" />
                Crafting digital experiences that inspire and perform
                <Sparkles className="w-5 h-5 text-[#FFD6E7]" />
              </p>
            </div>

            {/* Project Filter and Content */}
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              {/* Left Side Filter - Slider Style */}
              <div className="md:w-48 flex-shrink-0">
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
                  {["All", "Ongoing", "Coming Soon"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                        selectedCategory === cat
                          ? "bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/50"
                          : "text-gray-400 border border-transparent hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side Projects */}
              <div className="flex-1">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProjects.map((project) => (
                    <Link
                      key={project.id}
                      to={/project/${project.id}}
                      className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#06B6D4]/30 transition"
                    >
                      <div className="text-lg font-semibold text-white">{project.name}</div>
                      <div className="text-sm text-gray-400 mt-1">{project.category}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div> 
    </div>
  );
};

export default memo(Home);
