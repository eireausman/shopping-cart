import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { singleProductFetch } from "./productsAPI";

const Product = ({ addItemToCart }) => {
  const { id } = useParams();

  const [itemQtyInput, setItemQtyInput] = useState(1);
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const productData = await singleProductFetch(id);
      setProduct(productData);
    })();
  }, []);

  const adjustItemQtyInputState = (e) => {
    e.preventDefault();
    setItemQtyInput(e.target.value);
  };

  const updateItemQtyInput = (e) => {
    e.preventDefault();

    let itemQty = itemQtyInput;
    if (e.target.name === "add1") {
      setItemQtyInput((itemQty += 1));
    } else if (itemQty > 1) {
      setItemQtyInput((itemQty -= 1));
    }
  };

  const addItemToCartSubmit = (e) => {
    // e.preventDefault();
    addItemToCart(itemQtyInput, id, product.title, product.price);
    setItemQtyInput(1);
  };

  return (
    <div className="singleProductForm" key={product.id}>
      <p>{product.title}</p>
      <img className="singleProductImg" src={product.image}></img>
      <p>{product.description}</p>
      <p>$ {parseFloat(product.price).toFixed(2)}</p>
      <div className="productQtyCntrls">
        <button name="sub1" title="sub1" onClick={updateItemQtyInput}>
          -
        </button>
        <input
          type="text"
          name="itemQty"
          title="itemQty"
          alt="Item Quantity"
          className="productPageItemQty"
          onChange={adjustItemQtyInputState}
          value={itemQtyInput}
        />

        <button name="add1" title="add1" onClick={updateItemQtyInput}>
          +
        </button>
      </div>
      <input type="hidden" title="itemID" name="itemID" value={product.id} />
      <input type="hidden" name="itemName" value={product.title} />

      <input
        type="hidden"
        name="itemPrice"
        value={parseFloat(product.price).toFixed(2)}
      />

      <button title="addToCartButton" onClick={addItemToCartSubmit}>
        Add Product To Cart
      </button>
    </div>
  );
};

export default Product;
