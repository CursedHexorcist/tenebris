import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Info } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleAction = (e, type) => {
    if ((type === 'demo' && !ProjectLink) || (type === 'details' && !id)) {
      e.preventDefault();
      alert(`${type === 'demo' ? 'Live demo' : 'Details'} not available`);
    }
  };

  return (
    <div className="w-full mb-4 last:mb-0">
      {/* Horizontal elongated card */}
      <div className="flex h-32 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border border-white/10 shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
        
        {/* Left - Image */}
        <div className="w-32 flex-shrink-0">
          <img
            src={Img}
            alt={Title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Middle - Content */}
        <div className="flex-grow p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">{Title}</h3>
            <p className="text-sm text-gray-300 mt-1 line-clamp-2">{Description}</p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-3">
              <a
                href={ProjectLink || "#"}
                onClick={(e) => handleAction(e, 'demo')}
                className={`flex items-center text-sm ${ProjectLink ? 'text-blue-400 hover:text-blue-300' : 'text-gray-500 cursor-not-allowed'}`}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </a>
              
              <Link
                to={id ? `/project/${id}` : "#"}
                onClick={(e) => handleAction(e, 'details')}
                className={`flex items-center text-sm ${id ? 'text-purple-400 hover:text-purple-300' : 'text-gray-500 cursor-not-allowed'}`}
              >
                <Info className="w-4 h-4 mr-1" />
                Details
              </Link>
            </div>
            
            {/* Right - Buy button */}
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Get Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
