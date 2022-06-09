import React from "react";
import { render, screen } from "@testing-library/react";
import AllProducts from "../components/AllProducts";
import { act } from "react-dom/test-utils";
import ProductsData from "../assets/AllProductsTestData";
import { BrowserRouter } from "react-router-dom";
import * as API from "../modules/productsAPI";
import { createMemoryHistory } from "history";

const URL_PATH = "http://localhost/";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

describe("All Product Page Test", () => {
  it("Loading message appears on page", () => {
    act(() => {
      render(<AllProducts />);
    });
    expect(screen.getByTestId("pageLoading").textContent).toBe("Loading Page");
  });
  it("Product URL appears as expected", async () => {
    API.allProductsFetch = jest.fn();
    API.allProductsFetch.mockResolvedValue(ProductsData);
    await act(async () => {
      render(
        <BrowserRouter>
          <AllProducts />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("ProductLink-p-1").href).toBe(
      `${URL_PATH}Product/1`
    );
  });
  it("API is called once on initial load", async () => {
    API.allProductsFetch = jest.fn();
    API.allProductsFetch.mockResolvedValue(ProductsData);

    await act(async () => {
      render(
        <BrowserRouter>
          <AllProducts />
        </BrowserRouter>
      );
    });
    expect(API.allProductsFetch).toBeCalled();
    expect(API.allProductsFetch).toBeCalledTimes(1);
  });
  it("EDITING API is called once on initial load", async () => {
    API.allProductsFetch = jest.fn();
    API.allProductsFetch.mockResolvedValue(ProductsData);

    await act(async () => {
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
