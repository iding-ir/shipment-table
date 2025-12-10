import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

import { Dialog } from "../Dialog";
import { store } from "../../../../app/store";
import { openDialog } from "../../dialog-slice";

describe("Dialog component", () => {
  it("should render the dialog closed by default", () => {
    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const dialogElement = screen.getByTestId("dialog");

    expect(dialogElement).toBeInTheDocument();
  });

  it("should open the dialog when state is set to open", () => {
    store.dispatch(openDialog());
    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const dialogElement = screen.getByTestId("dialog");

    expect(dialogElement).toBeInTheDocument();
  });
});
