import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, ShoppingCart } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };
  
  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group w-full mb-6">
      {/* Horizontal elongated card */}
      <div className="flex h-40 bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl border border-white/10 shadow-lg overflow-hidden">
        
        {/* Image on left */}
        <div className="w-1/3 flex-shrink-0 relative overflow-hidden">
          <img
            src={Img}
            alt={Title}
            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>

        {/* Content middle */}
        <div className="flex-grow p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold bg-gradient-to-r from-[#06B6D4] via-[#06B6D4] to-[#FFD6E7] bg-clip-text text-transparent">
              {Title}
            </h3>
            
            <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2 mt-2">
              {Description}
            </p>
          </div>

          {/* Actions bottom */}
          <div className="flex justify-between items-center pt-3">
            <div className="flex space-x-4">
              {ProjectLink ? (
                <a
                  href={ProjectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLiveDemo}
                  className="inline-flex items-center space-x-1 text-[#06B6D4] hover:text-[#06B6D4]/80 transition-colors duration-200 text-sm"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              ) : (
                <span className="text-gray-500 text-sm">Demo Not Available</span>
              )}
              
              {id ? (
                <Link
                  to={`/project/${id}`}
                  onClick={handleDetails}
                  className="inline-flex items-center space-x-1 text-white/90 hover:text-white transition-colors duration-200 text-sm"
                >
                  <span>Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-gray-500 text-sm">Details Not Available</span>
              )}
            </div>

            {/* Buy button on right */}
            <button className="flex items-center space-x-2 bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              <ShoppingCart className="w-5 h-5" />
              <span>Get</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
