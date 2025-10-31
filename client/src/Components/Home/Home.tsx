import { useEffect, useState } from "react";
import ExperienceCards from "./ExperienceCards";
import Header from "../Header";
import axios from "axios";

interface Experience {
  _id: string;
  name: string;
  place: string;
  description: string;
  price: number;
  image: string;
}

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [presentExperiences, setPresentExperiences] = useState<Experience[]>(
    []
  );
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    setLoading(true); // Show the loader when starting fetch
    axios
      .get("http://localhost:3000/home/experiences")
      .then((response) => {
        setExperiences(response.data);
        setPresentExperiences(response.data);
      })
      .catch((error) => {
        console.error("Error fetching experiences:", error);
      })
      .finally(() => {
        setLoading(false); // Hide loader after fetch complete (success or error)
      });
  }, []);

  const filterExperiences = (searchTerm: string) => {
    const filtered = presentExperiences.filter((exp) =>
      exp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setExperiences(filtered);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Header */}
      <Header
        filterExperiences={filterExperiences}
        setExperiences={setExperiences}
        presentExperiences={presentExperiences}
      />

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
          {/* Or use: <p className="text-center text-gray-500">Loading...</p> */}
        </div>
      ) : (
        /* Main Section */
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 sm:px-10 md:px-16 lg:px-24 py-6 my-7">
          {experiences.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">
              No experiences found.
            </p>
          ) : (
            experiences.map((exp) => (
              <ExperienceCards key={exp._id} exp={exp} />
            ))
          )}
        </main>
      )}
    </div>
  );
}
