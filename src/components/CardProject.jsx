import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const CardProject = ({ Img, Title, Description, id }) => {
  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Store link not available");
    }
  };

  return (
    <div className="w-full max-w-sm rounded-xl overflow-hidden bg-white/5 backdrop-blur-md shadow-lg border border-white/10 transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img
          src={Img}
          alt={Title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2 text-black text-xs px-2 py-1 rounded shadow-sm font-semibold bg-[#FFD6E7]">
          Script
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-white">{Title}</h3>
        <p className="text-gray-300 text-sm line-clamp-2">{Description}</p>

        <div className="pt-2 flex justify-end">
          {id ? (
            <Link
              to={`/project/${id}`}
              onClick={handleDetails}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm text-white font-medium bg-gradient-to-r from-[#06B6D4] to-[#FFD6E7] hover:opacity-90 transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              Visit Store
            </Link>
          ) : (
            <span className="text-gray-500 text-sm">Unavailable</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
