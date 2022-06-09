import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../components/Product";
import { act } from "react-dom/test-utils";
import * as API from "../modules/productsAPI";

afterEach(() => {
  // cleanup on exiting
  jest.clearAllMocks();
});

const productData = {
  id: "3",
  price: "15.99",
  title: "ThisNameOfAProduct",
  description: "ProductDescriptionString",
};

describe("Single Product Page Test", () => {
  it("Page is Loading message shows as expected", async () => {
    const addItemToCartMock = jest.fn();
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    expect(screen.getByTitle("ProductLoadMessage").textContent).toBe(
      "Product Loading - Please Wait"
    );
  });
  it("Product values are set correctly on page load", async () => {
    const addItemToCartMock = jest.fn();
    API.singleProductFetch = jest.fn();
    API.singleProductFetch.mockResolvedValue(productData);
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    expect(screen.getByTitle("itemID").value).toBe("3");
    expect(screen.getByTitle("ProductTitle").textContent).toBe(
      "ThisNameOfAProduct"
    );
    expect(screen.getByTitle("ProductDescription").textContent).toBe(
      "ProductDescriptionString"
    );
    expect(screen.getByTitle("addToCartButton").disabled).toBe(false);
  });
  it("Increment and decrement work as expected", async () => {
    const addItemToCartMock = jest.fn();
    API.singleProductFetch = jest.fn();
    API.singleProductFetch.mockResolvedValue(productData);
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    userEvent.click(screen.getByTitle("add1")); // Increment 1
    expect(screen.getByTitle("itemQty").value).toBe("2");
    userEvent.click(screen.getByTitle("sub1")); // Decrement 1
    expect(screen.getByTitle("itemQty").value).toBe("1");
  });
  it("Changing quantity within Quantity input updates the field value", async () => {
    const addItemToCartMock = jest.fn();
    API.singleProductFetch = jest.fn();
    API.singleProductFetch.mockResolvedValue(productData);
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    await userEvent.type(screen.getByTestId("itemQty"), "2");
    expect(screen.getByTitle("itemQty").value).toBe("12");
  });
  it("Adding an item to cart adds the item and resets quantity field", async () => {
    const addItemToCartMock = jest.fn();
    API.singleProductFetch = jest.fn();
    API.singleProductFetch.mockResolvedValue(productData);
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    userEvent.click(screen.getByTitle("add1")); // Increment 1
    expect(screen.getByTitle("itemQty").value).toBe("2");
    userEvent.click(screen.getByTitle("addToCartButton"));
    expect(addItemToCartMock).toBeCalled();
    expect(addItemToCartMock).toBeCalledTimes(1);
    expect(screen.getByTestId("itemQty").value).toBe("1");
  });
  it("API is called once on initial load", async () => {
    const addItemToCartMock = jest.fn();
    API.singleProductFetch = jest.fn();
    API.singleProductFetch.mockResolvedValue(productData);
    await act(async () => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    expect(API.singleProductFetch).toHaveBeenCalled();
    expect(API.singleProductFetch).toBeCalledTimes(1);
  });
});
