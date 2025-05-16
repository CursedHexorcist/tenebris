import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Mail, ExternalLink, BadgeCheck, ArrowRight, Sparkles, Award, Wand2, Cpu, Zap, Clock, ShieldCheck } from "lucide-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";

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
  { icon: Zap, label: "Fast Execution" },
  { icon: Clock, label: "24/7 Service" },
  { icon: ShieldCheck, label: "Safe & Secure" },
  { icon: Award, label: "Premium Quality" },
  { icon: Wand2, label: "Easy To Use" },
  { icon: Cpu, label: "Executor Compatibility" }
];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/" },
  { icon: BadgeCheck, link: "https://dsc.gg/Tenebris" },
];

// Title Component with smooth flowing gradient animation
const MainTitle = memo(() => {
  return (
    <div className="w-full text-center">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] via-[#FF80B5] to-[#9F5F80] bg-[length:200%_auto] animate-gradient-flow">
          tenebris
        </span>
      </h1>
    </div>
  );
});

// Feature Badge
const FeatureBadge = memo(({ icon: Icon, label }) => (
  <div className="px-3 py-1 rounded-full border border-white/10 text-white text-sm flex items-center gap-2 bg-white/5 backdrop-blur-md">
    <Icon className="w-4 h-4" />
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

// Project Card Component
const ProjectCard = ({ project }) => {
  const handleDetails = (e) => {
    if (!project.id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <Link
      to={`/project/${project.id}`}
      onClick={handleDetails}
      className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur border border-white/10 hover:border-[#06B6D4]/30 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#06B6D4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="relative overflow-hidden rounded-lg mb-3 h-40">
          <img
            src={project.Img}
            alt={project.Title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        </div>
        <div className="text-lg font-semibold text-white">{project.Title}</div>
        <div className="text-sm text-gray-400 mt-1">{project.category || "Project"}</div>
        <div className="mt-3 flex justify-end">
          <button className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 text-sm">
            <span>Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

// Main Home Component
const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjectsCount = 3;

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
    window.addEventListener("resize", AOS.refresh);
    return () => window.removeEventListener("resize", AOS.refresh);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "projects");
        const projectSnapshot = await getDocs(projectCollection);
        const projectData = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          category: doc.data().category || "Free" // Default category
        }));
        
        setProjects(projectData);
        setLoading(false);
        
        // Store in localStorage
        localStorage.setItem("projects", JSON.stringify(projectData));
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
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

  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      setIsTransitioning(true);
      setShowAllProjects(false);
      setTimeout(() => {
        setSelectedCategory(category);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === selectedCategory);

  const displayedProjects = selectedCategory === "All" && !showAllProjects 
    ? filteredProjects.slice(0, visibleProjectsCount) 
    : filteredProjects;

  const toggleShowAll = () => {
    setShowAllProjects(!showAllProjects);
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 w-full">
          {/* Centered Main Title */}
          <div className="flex flex-col items-center justify-center pt-24 pb-16">
            <div className="w-full max-w-3xl text-center" data-aos="fade-up" data-aos-delay="200">
              <MainTitle />
              <div className="h-8 flex items-center justify-center mt-6" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#06B6D4] to-[#FFD6E7] ml-1 animate-blink"></span>
              </div>
              <div className="flex flex-wrap gap-3 justify-center mt-8" data-aos="fade-up" data-aos-delay="1200">
                {FEATURE_BADGES.map((badge, i) => (
                  <FeatureBadge key={i} {...badge} />
                ))}
              </div>
              <div className="flex gap-4 justify-center mt-6" data-aos="fade-up" data-aos-delay="1600">
                {SOCIAL_LINKS.map((s, i) => (
                  <SocialLink key={i} {...s} />
                ))}
              </div>
            </div>
          </div>

          {/* PROJECT SECTION */}
          <div className="mt-20 mb-20 pb-20" data-aos="fade-up" data-aos-delay="300">
            {/* Our Product Header - Removed decorative lines */}
            <div className="text-center mb-12">
              <div className="inline-block relative">
                <h2 
                  className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7]" 
                  data-aos="zoom-in-up"
                  data-aos-duration="600"
                >
                  Our Product
                </h2>
              </div>
              <p 
                className="mt-4 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
                data-aos="zoom-in-up"
                data-aos-duration="800"
              >
                <Sparkles className="w-5 h-5 text-[#06B6D4]" />
                Crafting digital experiences that inspire and perform
                <Sparkles className="w-5 h-5 text-[#FFD6E7]" />
              </p>
            </div>

            {/* Project Filter and Content */}
            <div className="mt-8 flex flex-col md:flex-row gap-6">
              {/* Left Side Filter */}
              <div className="md:w-48 flex-shrink-0">
                <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 w-full">
                  {["All", "Free", "Premium", "Coming Soon"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryChange(cat)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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
                {loading ? (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 animate-pulse h-48"></div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={`grid sm:grid-cols-2 md:grid-cols-3 gap-6 transition-opacity duration-300 ${
                      isTransitioning ? "opacity-50" : "opacity-100"
                    }`}>
                      {displayedProjects.map((project, index) => (
                        <ProjectCard key={project.id || index} project={project} />
                      ))}
                    </div>
                    
                    {selectedCategory === "All" && filteredProjects.length > visibleProjectsCount && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={toggleShowAll}
                          className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 flex items-center gap-2"
                        >
                          {showAllProjects ? (
                            <>
                              <span>Show Less</span>
                              <ArrowRight className="w-4 h-4 rotate-180" />
                            </>
                          ) : (
                            <>
                              <span>Show More</span>
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
