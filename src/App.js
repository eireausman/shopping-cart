import "./cssReset.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Navtop from "./components/Navtop";
import Cart from "./components/Cart";
import Homepage from "./components/Homepage";
import AllProducts from "./components/AllProducts";

const App = () => {
  const [cartContents, setCartContents] = useState([]);

  const [cartItemCount, setCartItemCount] = useState(0);

  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    updateCartValue();
    updateCartItemCount();
  });

  const updateCartValue = () => {
    let totalValue = 0;
    const cartContentsArray = Object.values(cartContents);
    for (let i = 0; i < cartContentsArray.length; i += 1) {
      totalValue +=
        cartContentsArray[i].itemPrice * cartContentsArray[i].itemQty;
    }
    setCartTotal(totalValue);
  };

  const updateCartItemCount = () => {
    const cartContentsArray = Object.values(cartContents);
    let cartItemTotal = 0;
    for (let i = 0; i < cartContentsArray.length; i += 1) {
      cartItemTotal += cartContentsArray[i].itemQty;
    }

    setCartItemCount(cartItemTotal);
  };

  const addItemToCart = (productQty, productId, productName, productPrice) => {
    // e.preventDefault();
    const copyCartContents = [...cartContents];
    // check if the product is already in the cart:
    const indexOfExistingCartEntry = copyCartContents.findIndex(
      (element) => parseInt(element.itemID) === parseInt(productId)
    );
    if (indexOfExistingCartEntry !== -1) {
      copyCartContents[indexOfExistingCartEntry].itemQty +=
        parseInt(productQty);
    } else {
      const newItem = {
        itemID: parseInt(productId),
        itemName: productName,
        itemPrice: parseFloat(productPrice).toFixed(2),
        itemQty: parseInt(productQty),
      };
      copyCartContents.push(newItem);
    }
    setCartContents(copyCartContents);
    updateCartValue();
    updateCartItemCount();
  };

  return (
    <BrowserRouter>
      <Navtop cartTotal={cartTotal} cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/AllProducts" element={<AllProducts />} />
        <Route
          path="/Product/:id"
          element={<Product addItemToCart={addItemToCart} />}
        />
        <Route
          path="/Cart"
          element={<Cart cartContents={cartContents} cartTotal={cartTotal} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
