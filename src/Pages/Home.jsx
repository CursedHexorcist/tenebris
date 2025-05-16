import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animationData from "@/assets/animasiHero.json";
import { getProjects } from "@/services/projectService";
import { useNavigate } from "react-router-dom";
import { CardProject } from "@/components/CardProject";
import AOS from "aos";
import "aos/dist/aos.css";
import SnowfallScene from "@/components/SnowfallScene";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const navigate = useNavigate();

  const handleDetail = (id) => {
    if (!id) {
      alert("Project ini belum tersedia.");
      return;
    }
    navigate(`/detail/${id}`);
  };

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((item) => item.category === activeCategory);

  useEffect(() => {
    AOS.init({ duration: 800 });
    getProjects().then((data) => setProjects(data));
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Snowfall background */}
      <SnowfallScene />

      {/* Hero Section */}
      <section className="min-h-screen bg-black text-white relative z-10 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-6">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Our Platform
          </h1>
          <p className="text-lg md:text-xl">
            Discover and explore innovative digital products by our team.
          </p>
        </div>
        <div className="flex-1 max-w-md">
          <Lottie animationData={animationData} loop autoplay />
        </div>
      </section>

      {/* Product Category Filter */}
      <div className="flex justify-center gap-4 mt-10 z-10 relative">
        {["all", "game", "web", "soon"].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-white transition ${
              activeCategory === category
                ? "bg-blue-500"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Our Product Section */}
      <section className="py-16 px-6 md:px-20 text-white relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((item, index) => (
            <CardProject
              key={index}
              title={item.title}
              image={item.image}
              onClick={() => handleDetail(item.id)}
              data-aos="fade-up"
            />
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 px-6 md:px-20 text-white relative z-10">
        <h2 className="text-3xl font-bold mb-4 text-center">About Us</h2>
        <p className="text-center max-w-2xl mx-auto">
          We are a passionate team of developers and designers dedicated to
          building high-quality digital products with creativity and purpose.
        </p>
      </section>
    </div>
  );
};

export default Home;
