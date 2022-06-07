import React from "react";
import { Link } from "react-router-dom";

const Cart = ({ cartContents, cartTotal }) => {
  const copyCartContents = [...cartContents];

  return (
    <section className="cartContainer">
      <div className="cartItemsList">
        {copyCartContents.map((item) => (
          <Link key={Math.random()} to={`/Product/${item.itemID}`}>
            <div className="cartItemRow">
              <div className="cartProductName">Name: {item.itemName}</div>
              <div className="cartProductPrice">
                Price: {parseFloat(item.itemPrice).toFixed(2)}
              </div>
              <div className="cartProductQty">Quantity: {item.itemQty}</div>
              <div className="cartProductTotal">
                Line Total:
                {parseFloat(item.itemPrice * item.itemQty).toFixed(2)}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="cartTotalValue">
        Cart Page and Qty = {parseFloat(cartTotal).toFixed(2)}
      </div>
    </section>
  );
};

export default Cart;
