import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/Home";
import ExperienceDetail from "./Components/Detail/Details";
import Checkout from "./Components/Checkout/Checkout";
import Result from "./Components/Result";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<ExperienceDetail />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/result/" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
