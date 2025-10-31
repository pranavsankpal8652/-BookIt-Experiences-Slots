import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Header from "../Header";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

export default function Checkout() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const data = location.state;
  const [TotalPrice, setTotalPrice] = useState(data.total);

  const [promo, setPromo] = useState("");
  const [PromoCodeApplied, setPromoCodeApplied] = useState(false);

  const [agree, setAgree] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const conn_string = import.meta.env.VITE_CONN_STRING;

  var finalPrice = 0;

  const validatePromocode = () => {
    axios
      .post(`${conn_string}/checkout/promo/validate`, {
        promoCode: promo,
      })
      .then((response) => {
        console.log("Promocode valid:", response.data);

        if (response.data.valid) {
          const discount = response.data.discount;
          if (discount.type === "percentage") {
            const discountAmount = (data.total * discount.value) / 100;
            finalPrice = data.total - discountAmount;
          } else if (discount.type === "fixed") {
            finalPrice = data.total - discount.value;
          }
          setTotalPrice(finalPrice);
          setPromoCodeApplied(true);

          Swal.fire({
            icon: "success",
            title: "Code Validated",
            text: "Discount Applied Successfully",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data.msg,
          });
        }
      })
      .catch((error) => {
        console.error("Invalid promocode:", error);
        // Show error message to user
      });
  };

  const handlePayment = (event: React.FormEvent) => {
    event.preventDefault(); // prevent default form submit refresh
    const emailPattern = /^\S+@\S+\.\S+$/;

    if (!userName || !email || !agree) {
      alert("All fields are Required to Proceed!");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    axios
      .post(`${conn_string}/bookings/add`, {
        id,
        data,
        userName,
        email,
      })
      .then((response) => {
        console.log("Payment successful:", response.data);
        if (response.status == 200) {
          navigate("/result", {
            replace: true, // this prevents back navigation
            state: { ref_id: response.data.ref_id, msg: response.data.msg },
          });
        } else {
          navigate("/result", { state: { msg: response.data.msg } });
        }
      })
      .catch((error) => {
        console.error("Payment failed:", error);
        // Show error message to user
      });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <Header />

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 py-8">
        {/* Go Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-6 font-medium"
        >
          <FaArrowLeft /> Checkout
        </button>

        <form
          onSubmit={handlePayment}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-22 items-start"
        >
          {/* LEFT SIDE */}
          <div className="md:col-span-2 bg-[#EFEFEF] p-4 sm:p-6 rounded-2xl shadow-md w-4xl">
            <h2 className="text-2xl font-semibold mb-6">Checkout</h2>

            {/* Full Name & Email */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full mb-4">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={userName}
                  required
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 bg-[#DDDDDD] text-[#727272]"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 bg-[#DDDDDD] text-[#727272]"
                />
              </div>
            </div>

            {/* Promo Code */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
              <input
                type="text"
                placeholder="Promo code"
                value={promo}
                disabled={PromoCodeApplied}
                onChange={(e) => setPromo(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 bg-[#DDDDDD] text-[#727272]"
              />
              <button
                type="button"
                onClick={() => validatePromocode()}
                disabled={PromoCodeApplied}
                className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition w-full sm:w-auto disabled:hover:bg-black"
              >
                Apply
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 mt-4">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="w-4 h-4 accent-black "
                required
              />
              <label className="text-sm text-gray-600 leading-tight">
                I agree to the terms and safety policy
              </label>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#EFEFEF] rounded-2xl shadow-md p-4 sm:p-6 h-fit">
            <div className="space-y-3 text-gray-700 text-sm sm:text-base">
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-medium">{data?.Experince}</span>
              </div>
              <div className="flex justify-between">
                <span>Date</span>
                <span>{data.date}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span>
                <span>{data.time}</span>
              </div>
              <div className="flex justify-between">
                <span>Qty</span>
                <span>{data.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{data.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{data.tax}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{TotalPrice}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
            >
              Pay and Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
