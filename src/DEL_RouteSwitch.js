import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Navtop from "./components/Navtop";
import Cart from "./components/Cart";
import Homepage from "./components/Homepage";

const RouteSwitch = ({ cartVal }) => {
  return (
    <BrowserRouter>
      <Navtop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/Cart" element={<Cart cartVal={cartVal} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
