import React, { useState, useEffect, useCallback, memo } from "react";
import { 
  Github, BadgeCheck, ArrowRight, Sparkles, Award, Wand2, Cpu, Zap, Clock, ShieldCheck 
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";

const TYPING_SPEED = 80;
const ERASING_SPEED = 70;
const PAUSE_DURATION = 700;
const WORDS = [
  "Fast Execution",
  "Continuous Improvement",
  "User-Friendly Interface",
  "Optimized Performance",
];

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

const MainTitle = memo(() => (
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
    TENEBRIS <br />
    <span className="bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] bg-clip-text text-transparent">
      DEVELOPER
    </span>
  </h1>
));

const FeatureBadge = memo(({ icon: Icon, label }) => (
  <div className="px-3 py-1 rounded-full border border-white/10 text-white text-sm flex items-center gap-2 bg-white/5 backdrop-blur-md">
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </div>
));

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

const ProjectCard = ({ project }) => {
  const handleDetails = (e) => {
    if (!project.id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <Link
      to={`/project/${project.id}`}
      onClick={handleDetails}
      className="p-4 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#06B6D4]/30 transition-all duration-300 hover:scale-[1.02] group"
    >
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={project.Img}
          alt={project.Title}
          className="w-full h-40 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="text-lg font-semibold text-white">{project.Title}</div>
      <div className="text-sm text-gray-400 mt-1">{project.category || "Project"}</div>
      <div className="mt-3 flex justify-end">
        <button className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 text-sm">
          <span>Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </Link>
  );
};

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectCollection = collection(db, "projects");
        const projectSnapshot = await getDocs(projectCollection);
        const projectData = projectSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          category: doc.data().category || "Free"
        }));
        
        setProjects(projectData);
        setLoading(false);
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
      <div className={`relative z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 w-full">
          <div className="flex flex-col lg:flex-row items-center md:justify-between gap-6 lg:gap-12 pt-16 md:pt-20 pb-10">
            {/* LEFT SIDE */}
            <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6 md:space-y-8" data-aos="fade-right" data-aos-delay="200">
              <MainTitle />
              <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light select-none">
                  {text}
                </span>
                <span className="w-[3px] h-6 bg-gradient-to-t from-[#06B6D4] to-[#FFD6E7] ml-1 animate-blink"></span>
              </div>
              <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="1200">
                {FEATURE_BADGES.map((badge, i) => (
                  <FeatureBadge key={i} {...badge} />
                ))}
              </div>
              <div className="flex gap-4" data-aos="fade-up" data-aos-delay="1600">
                {SOCIAL_LINKS.map((social, i) => (
                  <SocialLink key={i} {...social} />
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div
              className="relative w-full lg:w-1/2 max-w-md sm:max-w-xl md:max-w-2xl aspect-[1/1] cursor-pointer select-none"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <DotLottieReact {...lottieOptions} />
              <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_60px_#06b6d4]"></div>
            </div>
          </div>

          {/* CATEGORY FILTER */}
          <div className="mt-12 text-white" data-aos="fade-up" data-aos-delay="1800">
            <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
              {["All", "Free", "Premium"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  disabled={isTransitioning}
                  className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] text-black border-transparent"
                      : "border-white/30 hover:border-white/60 text-white/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* PROJECTS GRID */}
            {loading ? (
              <div className="text-center text-white/50">Loading projects...</div>
            ) : (
              <>
                {filteredProjects.length === 0 ? (
                  <div className="text-center text-white/50">No projects found.</div>
                ) : (
                  <>
                    <div
                      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 transition-all duration-300 ${
                        isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
                      }`}
                    >
                      {displayedProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                    {selectedCategory === "All" && filteredProjects.length > visibleProjectsCount && (
                      <div className="flex justify-center mt-8">
                        <button
                          onClick={toggleShowAll}
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] text-black font-semibold hover:brightness-110 transition"
                        >
                          {showAllProjects ? "Show Less" : "Show More"}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
