import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Info } from 'lucide-react';

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleAction = (e, type) => {
    if ((type === 'demo' && !ProjectLink) || (type === 'details' && !id)) {
      e.preventDefault();
      alert(`${type === 'demo' ? 'Demo' : 'Detail'} tidak tersedia`);
    }
  };

  return (
    {/* Kartu horizontal dalam list vertikal */}
    <div className="w-full mb-4 last:mb-0"> 
      <div className="flex h-28 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300 overflow-hidden">
        
        {/* Gambar di kiri */}
        <div className="w-24 flex-shrink-0 bg-gray-700">
          <img 
            src={Img}
            alt={Title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Konten tengah */}
        <div className="flex-grow p-3 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-white line-clamp-1">{Title}</h3>
            <p className="text-xs text-gray-300 line-clamp-2 mt-1">{Description}</p>
          </div>
          
          {/* Tombol aksi */}
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-2">
              {/* Tombol Preview */}
              <button
                onClick={(e) => handleAction(e, 'demo')}
                disabled={!ProjectLink}
                className={`p-1.5 rounded-md ${ProjectLink ? 'text-blue-400 hover:bg-blue-400/10' : 'text-gray-500 cursor-not-allowed'}`}
                title="Preview"
              >
                <Eye className="w-4 h-4" />
              </button>
              
              {/* Tombol Detail */}
              <Link
                to={id ? `/project/${id}` : "#"}
                onClick={(e) => handleAction(e, 'details')}
                className={`p-1.5 rounded-md ${id ? 'text-purple-400 hover:bg-purple-400/10' : 'text-gray-500 cursor-not-allowed'}`}
                title="Detail"
              >
                <Info className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Tombol Beli di kanan */}
            <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
              <ShoppingCart className="w-4 h-4" />
              <span>Beli</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProject;
