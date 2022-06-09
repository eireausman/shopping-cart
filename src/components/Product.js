import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { singleProductFetch } from "../modules/productsAPI";

const Product = ({ addItemToCart }) => {
  const { id } = useParams();

  const [itemQtyInput, setItemQtyInput] = useState(1);
  const [product, setProduct] = useState({});
  const [addToCartButtonDisabled, setAddToCartButtonDisabled] = useState(true);
  const [productDataIsNotYetPresent, setProductDataIsNotYetPresent] =
    useState(true); // used to provide a loading message to user while awaiting product data from the API

  useEffect(() => {
    // fetch the product data on page load

    (async () => {
      const productData = await singleProductFetch(id);
      setProduct(productData);
      setProductDataIsNotYetPresent(false);
    })();
  }, [id]);

  useEffect(() => {
    // used to provide a loading message to user while awaiting product data
    if (productDataIsNotYetPresent === false) {
      setAddToCartButtonDisabled(false);
    }
  }, [productDataIsNotYetPresent]);

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
    <Fragment>
      {productDataIsNotYetPresent === true ? (
        <div className="singleProductForm" key={product.id}>
          <div title="ProductLoadMessage">Product Loading - Please Wait</div>
        </div>
      ) : (
        <div className="singleProductForm" key={product.id}>
          <p title="ProductTitle">{product.title}</p>
          <img
            alt={product.title}
            className="singleProductImg"
            src={product.image}
          ></img>
          <p title="ProductDescription">{product.description}</p>
          <p>$ {parseFloat(product.price).toFixed(2)}</p>
          <div className="productQtyCntrls">
            <button name="sub1" title="sub1" onClick={updateItemQtyInput}>
              -
            </button>
            <input
              type="text"
              name="itemQty"
              title="itemQty"
              data-testid="itemQty"
              alt="Item Quantity"
              className="productPageItemQty"
              onChange={adjustItemQtyInputState}
              value={itemQtyInput}
            />

            <button name="add1" title="add1" onClick={updateItemQtyInput}>
              +
            </button>
          </div>
          <input
            type="hidden"
            title="itemID"
            name="itemID"
            value={product.id}
          />
          <input type="hidden" name="itemName" value={product.title} />

          <input
            type="hidden"
            name="itemPrice"
            value={parseFloat(product.price).toFixed(2)}
          />

          <button
            title="addToCartButton"
            data-testid="addToCartButton"
            disabled={addToCartButtonDisabled}
            onClick={addItemToCartSubmit}
          >
            Add Product To Cart
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default Product;
