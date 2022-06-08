import React from "react";
import { render, screen } from "@testing-library/react";
import AllProducts from "../components/AllProducts";
import { act } from "react-dom/test-utils";
import ProductsData from "../assets/AllProductsTestData";
import { BrowserRouter } from "react-router-dom";
import * as API from "../modules/productsAPI";
import { createMemoryHistory } from "history";

const URL_PATH = "http://localhost/";
const history = createMemoryHistory();

describe("All Product Page Test", () => {
  afterEach(async () => {
    // jest.clearAllMocks();
  });
  it("Loading message appears on page", () => {
    act(() => {
      render(<AllProducts />);
    });
    expect(screen.getByTestId("pageLoading").textContent).toBe("Loading Page");
  });
  it("Product URL appears as expected", () => {
    act(() => {
      render(
        <BrowserRouter>
          <AllProducts jestTestProductData={ProductsData} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("ProductLink-p-1").href).toBe(
      `${URL_PATH}Product/1`
    );
  });
  it("API is called once on initial load", () => {
    API.allProductsFetch = jest.fn();
    API.allProductsFetch.mockResolvedValue(ProductsData);
    act(() => {
      render(
        <BrowserRouter>
          <AllProducts />
        </BrowserRouter>
      );
    });
    expect(API.allProductsFetch).toBeCalled();
    expect(API.allProductsFetch).toBeCalledTimes(1);
  });
});
