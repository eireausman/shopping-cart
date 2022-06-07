import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "../components/Product";
import { act } from "react-dom/test-utils";

describe("Single Product Page Test", () => {
  it("Increment and decrement work as expected", () => {
    const addItemToCartMock = jest.fn();
    act(() => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    userEvent.click(screen.getByTitle("add1")); // Increment 1
    expect(screen.getByTitle("itemQty").value).toBe("2");
    userEvent.click(screen.getByTitle("sub1")); // Decrement 1
    expect(screen.getByTitle("itemQty").value).toBe("1");
  });
  it("Add to cart button works as expected", () => {
    const addItemToCartMock = jest.fn();
    act(() => {
      render(<Product addItemToCart={addItemToCartMock} />);
    });
    userEvent.click(screen.getByTitle("addToCartButton"));
    expect(addItemToCartMock).toBeCalled();
    expect(addItemToCartMock).toBeCalledTimes(1);
    expect(addItemToCartMock).toBeCalledWith(2);
  });
});
