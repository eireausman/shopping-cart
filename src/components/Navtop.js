import React from "react";
import { Link } from "react-router-dom";

const Navtop = ({ cartTotal, cartItemCount }) => {
  return (
    <div className="navContainer">
      <nav name="navigationLinks" className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/AllProducts">Products</Link>
      </nav>
      <Link to="/Cart">
        <div className="cartSummary">
          <div className="itemCount">{cartItemCount}</div>
          <div className="cartValue">
            total: $ {parseFloat(cartTotal).toFixed(2)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navtop;
