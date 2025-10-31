import { useState } from "react";
import logo from "../assets/logo.png";
interface HeaderProps {
  filterExperiences?: (searchTerm: string) => void; // ✅ function that takes a string, returns void
  setExperiences?: React.Dispatch<React.SetStateAction<any[]>>; // ✅ React state setter
  presentExperiences?: any[]; // ✅ array of experiences
}

export default function Header({
  filterExperiences,
  setExperiences,
  presentExperiences,
}: HeaderProps) {
  const [search, setSearch] = useState("");

  return (
    <div>
      <header className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 py-4 bg-white shadow-md space-y-4 sm:space-y-0">
        {/* Logo */}
        <div className="flex items-center ">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <h1 className="text-2xl font-bold text-black">
            Highway<br></br> Delight
          </h1>
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
          <input
            type="text"
            placeholder="Search experiences..."
            className=" rounded-sm px-4 py-2 sm:px-5 sm:py-3 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#727272] bg-[#EDEDED]"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);
              if (value === "" && setExperiences && presentExperiences) {
                setExperiences(presentExperiences);
              }
            }}
          />
          <button
            className="bg-[#FFD643] px-4 py-2 sm:px-5 sm:py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            onClick={() => {
              if (filterExperiences) {
                filterExperiences(search);
              }
            }}
          >
            Search
          </button>
        </div>
      </header>
    </div>
  );
}
