import { Link } from "react-router-dom";

type Experience = {
  _id: string;
  name: string;
  place: string;
  description: string;
  price: number;
  image: string;
};

export default function ExperienceCards({ exp }: { exp: Experience }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg 
                 transition-all duration-200 flex flex-col justify-between"
    >
      {/* Image Section */}
      <img
        src={exp.image}
        alt={exp.name}
        className="w-full h-44 sm:h-48 md:h-52 object-cover"
      />

      {/* Content Section */}
      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            {exp.name}
          </h2>
          <span className="text-xs sm:text-sm text-gray-600 bg-[#EDEDED] px-2 py-1 rounded-md">
            {exp.place}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-snug mb-3 line-clamp-3">
          {exp.description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <span className="font-semibold text-black text-base sm:text-lg">
            ₹{exp.price}
          </span>
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm 
                       hover:bg-yellow-500 transition-colors font-medium"
          >
            <Link to={`/detail/${exp._id}`}> View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
