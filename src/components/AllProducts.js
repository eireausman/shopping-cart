import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { allProductsFetch } from "./productsAPI";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productList = allProductsFetch();
    productList.then((data) => setProducts([...data]));
  }, []);

  return (
    <section className="productsCards">
      {products.map((product) => (
        <form className="allProductsProductForm" key={product.id}>
          <Link to={`/Product/${product.id}`}>
            <div className="allProductsImgCntr">
              <img
                className="allProductsImg"
                src={product.image}
                alt={product.title}
              ></img>
            </div>
            <div className="allProductsTitlePrice">
              <p>{product.title}</p>
              <p>$ {parseFloat(product.price).toFixed(2)}</p>
              <input type="hidden" value={product.id}></input>
            </div>
          </Link>
        </form>
      ))}
    </section>
  );
};

export default AllProducts;
