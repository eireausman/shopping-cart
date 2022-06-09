import React from "react";
import { render, screen } from "@testing-library/react";
import Navtop from "../components/Navtop";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";

const URL_PATH = "http://localhost/";

describe("Top Navigation pane functions as expected", () => {
  afterEach(async () => {
    jest.clearAllMocks;
  });
  it("Number of items in cart shows correctly", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Navtop cartTotal={102.152532535321512} cartItemCount={5} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("itemCount").textContent).toBe("5");
  });
  it("Value of items rounds and presents correctly", () => {
    act(() => {
      render(
        <BrowserRouter>
          <Navtop cartTotal={102.152532535321512} cartItemCount={5} />
        </BrowserRouter>
      );
    });
    expect(screen.getByTestId("cartValue").textContent).toBe("total: $ 102.15");
  });
});
