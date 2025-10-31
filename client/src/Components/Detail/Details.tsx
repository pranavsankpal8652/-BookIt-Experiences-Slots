import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Header from "../Header";
import axios from "axios";

type TimeSlot = {
  time: string;
  available: number;
};

type Slot = {
  date: string;
  times: TimeSlot[];
};

type Experience = {
  _id: string;
  name: string;
  place: string;
  description: string;
  about: string;
  price: number;
  image: string;
  slots: Slot[];
};

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSlotAvl, setSelectedslotAvl] = useState<Number>(0);
  const [quantity, setQuantity] = useState(1);

  // Find times for selected date
  const timesForDate =
    experience?.slots?.find((s) => s.date === selectedDate)?.times || [];

  const price = experience?.price ?? 0;
  const tax = price * quantity * 0.05;
  const subtotal = price * quantity;
  const total = subtotal + tax;

  const conn_string = import.meta.env.VITE_CONN_STRING;

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<Experience>(`${conn_string}/detail/experiences/${id}`)
      .then((response) => {
        setExperience(response.data);
      })
      .catch((error) => {
        console.error("Error fetching experience details:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
        <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg font-medium">Loading experience details...</p>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600 text-lg font-semibold">
        Failed to load experience details.
      </div>
    );
  }

  const data = {
    Experince: experience.name.toString(),
    date: selectedDate,
    time: selectedTime,
    quantity: quantity,
    subtotal,
    tax: tax,
    total,
  };

  const confirmBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Select Date and Time First");
      return;
    }
    navigate(`/checkout/${id}`, { state: data });
  };

  return (
    <div>
      <Header />

      {/* Back Button */}
      <div className="flex items-center gap-2 font-medium text-lg mx-30 mt-4 mb-6">
        <button
          className="cursor-pointer hover:text-yellow-500 transition"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <FaLongArrowAltLeft />
        </button>
        <span className="fw-500">Details</span>
      </div>

      {/* Main Section */}
      <div className="min-h-screen flex justify-center px-4 sm:px-8 mb-20">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
          {/* LEFT SIDE */}
          <div>
            <div>
              <img
                src={experience.image}
                alt={experience.name}
                className="w-full h-56 sm:h-72 md:h-[381px] object-cover rounded-xl mb-6"
              />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                {experience.name}
              </h1>
              <p className="text-[#6C6C6C] mb-6">{experience.description}</p>

              {/* Date Boxes */}
              <div className="text-[#161616] my-4">Choose Date</div>
              <div className="flex flex-wrap gap-4 mb-4">
                {experience.slots?.map(({ date }) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => {
                      setSelectedDate(date);
                      setSelectedTime("");
                    }}
                    className={`px-4 py-2 rounded-lg border ${
                      selectedDate === date
                        ? "bg-yellow-400 text-white border-yellow-400"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {new Date(date).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </button>
                ))}
              </div>

              {/* Time Boxes */}
              <div className="text-[#161616] my-4">Choose Time</div>
              <div className="flex flex-wrap gap-4 mb-6">
                {selectedDate === "" ? (
                  <p className="text-gray-500 italic">
                    Please select a date to see available times.
                  </p>
                ) : timesForDate.length === 0 ? (
                  <p className="text-gray-500 italic">
                    No available times for this date.
                  </p>
                ) : (
                  timesForDate.map(({ time, available }) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => {
                        setSelectedTime(time);
                        setSelectedslotAvl(available);
                      }}
                      disabled={available === 0}
                      className={`px-4 py-2 rounded-lg border transition ${
                        available === 0
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : selectedTime === time
                          ? "bg-yellow-400 border-yellow-400 text-white"
                          : "bg-white border-gray-300 hover:bg-yellow-100"
                      }`}
                    >
                      {time}
                      <span className="text-xs text-[#FF4C0A] pl-4">
                        {available === 0 ? "Sold Out" : `${available} Left`}
                      </span>
                    </button>
                  ))
                )}
              </div>
              <div className={`${!selectedDate ? "hidden" : ""}`}>
                <p className="text-xs text-gray-500 my-3">
                  All times are in IST (GMT +5:30)
                </p>
              </div>

              {/* ABOUT */}
              <div>
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  About
                </h2>
                <p className="text-[#6C6C6C] leading-relaxed">
                  {experience.about}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#EFEFEF] shadow-md rounded-2xl p-6 h-fit">
            <div className="space-y-3">
              <div className="flex justify-between text-[#656565]">
                <span>Starts At</span>
                <span className="text-[#161616]">₹{experience.price}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#656565]">Quantity</span>
                <div className="flex gap-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#161616]"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    min={1}
                    value={quantity}
                    readOnly
                    className="rounded-lg w-8 px-2 py-1 text-center text-[#161616] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!Number(selectedSlotAvl)) {
                        alert("select slot first!");
                      } else if (quantity < Number(selectedSlotAvl)) {
                        setQuantity(quantity + 1);
                      } else {
                        alert("Slots Reached Max");
                      }
                    }}
                    className="text-[#161616]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Tax (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="flex justify-between text-gray-800 font-semibold">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => confirmBooking()}
              className="w-full mt-6 bg-[#D7D7D7] font-semibold py-2 rounded-lg text-[#7F7F7F] hover:bg-[#FFD643] hover:text-black transition-colors cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
