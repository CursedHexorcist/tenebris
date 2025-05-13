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
    <div className="group w-full mb-4 last:mb-0">
      <div className="flex items-stretch h-28 bg-gradient-to-r from-slate-800/90 to-slate-900/90 rounded-lg border border-white/10 shadow hover:shadow-md transition-shadow duration-300 overflow-hidden">
        {/* Image thumbnail */}
        <div className="w-24 flex-shrink-0 relative overflow-hidden">
          <img
            src={Img}
            alt={Title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content area */}
        <div className="flex-grow p-3 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white line-clamp-1">{Title}</h3>
            <p className="text-xs text-gray-400 line-clamp-2 mt-1">{Description}</p>
          </div>

          <div className="flex justify-between items-center mt-2">
            {/* Left action buttons */}
            <div className="flex space-x-2">
              <a
                href={ProjectLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleAction(e, 'demo')}
                className={`p-1.5 rounded ${ProjectLink ? 'text-blue-400 hover:bg-blue-400/10' : 'text-gray-500 cursor-not-allowed'}`}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </a>

              <Link
                to={id ? `/project/${id}` : "#"}
                onClick={(e) => handleAction(e, 'details')}
                className={`p-1.5 rounded ${id ? 'text-purple-400 hover:bg-purple-400/10' : 'text-gray-500 cursor-not-allowed'}`}
                title="Details"
              >
                <Info className="w-4 h-4" />
              </Link>
            </div>

            {/* Buy button on right */}
            <button 
              className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Get</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
