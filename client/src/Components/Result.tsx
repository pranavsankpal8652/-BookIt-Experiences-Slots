import { useLocation, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react"; // lucide-react icon (optional)
import Header from "./Header";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  // Example: get status and refId from state or query params
  const result = location.state || {};

  return (
    <div>
      <Header />
      <div className="flex flex-col  items-center justify-center mt-20  px-4 ">
        {result.ref_id ? (
          <div className="flex flex-col  items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-green-500 rounded-full">
              <Check className="text-white w-12 h-12" strokeWidth={3} />
            </div>{" "}
            <h1 className="text-3xl font-bold  mb-2">{result.msg}</h1>
            <p className="text-[#656565] mb-6">Ref_Id: #{result.ref_id}</p>
          </div>
        ) : (
          <div className="flex flex-col  items-center justify-center">
            <div className="flex items-center justify-center w-20 h-20 bg-red-500 rounded-full">
              <X className="text-white w-12 h-12" strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-bold mb-2">{result.msg}</h1>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="bg-[#E3E3E3] px-6 py-2 rounded-lg font-medium transition text-[#656565]"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
