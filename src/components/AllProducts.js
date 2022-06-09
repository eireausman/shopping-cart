import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { allProductsFetch } from "../modules/productsAPI";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [productDataIsNotYetPresent, setProductDataIsNotYetPresent] =
    useState(true); // used to provide a loading message to user while awaiting product data from the API

  useEffect(() => {
    const productList = allProductsFetch();
    productList
      .then((data) => setProducts(data))
      .then((data) => setProductDataIsNotYetPresent(false));
  }, []);

  return (
    <Fragment>
      {productDataIsNotYetPresent === true ? (
        <section className="productsCards">
          <div data-testid="pageLoading">Loading Page</div>
        </section>
      ) : (
        <section className="productsCards">
          {products.map((product) => (
            <form className="allProductsProductForm" key={product.id}>
              <Link
                data-testid={`ProductLink-p-` + product.id}
                to={`/Product/${product.id}`}
              >
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
      )}
    </Fragment>
  );
};

export default AllProducts;
