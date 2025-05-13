Gween
lugwen
Hi Stalker!

Gween[rich]
 — 14:43
pusing
aku udah modifikasi banyak
tpi yg bug skrng bagian our product sampai about us
!                           Nier[#1]
 — 14:43
apa mau korbanin 1
buat yg lain?
Gween[rich]
 — 14:48
bukan masalah korbanin
ini maslaah bugnya gmn atur sizenya
!                           Nier[#1]
 — 14:48
awh
Gween[rich]
 — 14:53
import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
Expand
message.txt
11 KB
coba cari cara
pusing aku
!                           Nier[#1]
 — 14:53
yg itu ya
Gween[rich]
 — 14:53
iru bagian home
!                           Nier[#1]
 — 14:53
desktop mode/ap
Gween[rich]
 — 14:54
yang handle tenebris sampai our project
ye
dia di windows aman
!                           Nier[#1]
 — 14:54
yep
Gween[rich]
 — 14:54
deskstop modenya rusak
u cek aja di hp
u lgsg ganti aja di githubku
!                           Nier[#1]
 — 14:56
hnn
hmm
Gween[rich]
 — 14:56
CursedHexorcist
NierNiggerChinese
Gween[rich]
 — 15:03
ini kode pertamanya
import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
Expand
message.txt
10 KB
!                           Nier[#1]
 — 15:03
sec
Gween[rich]
 — 15:04
sebelm ada penambahan our product
!                           Nier[#1]
 — 15:06
ok
Gween[rich]
 — 15:09
Image
aku rapat dlu
!                           Nier[#1]
 — 15:09
alright
try put
import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
Expand
deepseek_jsx_20250513_809b16.jsx
5 KB
Gween[rich]
 — 15:10
u nyari xeuvelie utk apa
nama akunku
!                           Nier[#1]
 — 15:10
idk
iseng ja
Gween[rich]
 — 15:11
Image
!                           Nier[#1]
 — 15:11
:peclap:
Gween[rich]
 — 15:11
minta ke dia full kodenya
!                           Nier[#1]
 — 15:15
ini pake tailwind ya
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
  { icon: "⚡", label: "Fast Execution" },
  { icon: "🚀", label: "24/7 Service" },
  { icon: "🔒", label: "Safe & Secure" },
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
... (160 lines left)
Collapse
deepseek_jsx_20250513_1394e2.jsx
11 KB
done
coba
kl ad bug blg aja
githubku error
Image
bruh
ini yg diganti app.jsx? @Gween
!                           Nier[#1]
 — 15:24
home.jsx
Gween[rich]
 — 15:24
home lah ege
ngapain di app
Tak fungsi jga kode u
sama aja
!                           Nier[#1]
 — 15:25
uda
bruh
﻿
ShinyBlackCheap Black & Script DM!!
! Nier
chaeltz
陈
[#1]
 
 
 
 
Never Stop Flying 🪽  

BUY/SELL BLACK BGL
About Chaeltz:
 https://chaeltz.vercel.app/
Nier Community Discord:
https://discord.gg/G6sAnjqUX9
import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

// ... (keep all the existing constants and components exactly the same) ...

// Main Home Component
const Home = () => {
  // ... (keep all the existing state and methods exactly the same) ...

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 xl:px-24 2xl:px-32 pt-12 md:pt-20 pb-4">
          <div className="flex flex-col lg:flex-row items-center md:justify-between gap-6 lg:gap-12 pt-8 md:pt-12 pb-8">
            {/* LEFT */}
            {/* ... (keep the left section exactly the same) ... */}

            {/* RIGHT - Lottie Animation */}
            {/* ... (keep the right section exactly the same) ... */}
          </div>

          {/* PROJECT SECTION - Fixed spacing here */}
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
                      to={`/project/${project.id}`}
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
deepseek_jsx_20250513_809b16.jsx
5 KB
