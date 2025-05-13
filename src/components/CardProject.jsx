import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ShoppingCart, Info, Eye } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink kosong");
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full">
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-lg border border-white/10 shadow-md transition-all duration-300 hover:shadow-[#06B6D4]/20 flex items-stretch h-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/10 via-[#06B6D4]/10 to-[#FFD6E7]/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
        
        {/* Left side - Image */}
        <div className="w-1/3 relative overflow-hidden">
          <img
            src={Img}
            alt={Title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Middle - Content */}
        <div className="w-1/2 p-4 z-10 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold bg-gradient-to-r from-[#06B6D4] via-[#06B6D4] to-[#FFD6E7] bg-clip-text text-transparent">
              {Title}
            </h3>
            <p className="text-gray-300/80 text-xs leading-relaxed line-clamp-2 mt-1">
              {Description}
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-2">
            {ProjectLink ? (
              <a
                href={ProjectLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveDemo}
                className="inline-flex items-center space-x-1 text-[#06B6D4] hover:text-[#06B6D4]/80 transition-colors duration-200 text-xs"
                title="Live Demo"
              >
                <Eye className="w-3 h-3" />
              </a>
            ) : (
              <span className="text-gray-500 text-xs" title="Demo Not Available">
                <Eye className="w-3 h-3" />
              </span>
            )}
            
            {id ? (
              <Link
                to={`/project/${id}`}
                onClick={handleDetails}
                className="inline-flex items-center space-x-1 text-white/90 hover:text-white transition-colors duration-200 text-xs"
                title="Details"
              >
                <Info className="w-3 h-3" />
              </Link>
            ) : (
              <span className="text-gray-500 text-xs" title="Details Not Available">
                <Info className="w-3 h-3" />
              </span>
            )}
          </div>
        </div>
        
        {/* Right side - Buy button */}
        <div className="w-1/6 flex items-center justify-center p-2 border-l border-white/10">
          <button className="p-2 rounded-full bg-[#06B6D4]/10 hover:bg-[#06B6D4]/20 text-[#06B6D4] transition-all duration-200 hover:scale-110">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
        
        <div className="absolute inset-0 border border-white/0 group-hover:border-[#06B6D4]/50 rounded-lg transition-colors duration-300 -z-50"></div>
      </div>
    </div>
  );
};

export default CardProject;
