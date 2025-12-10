import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

import { Dialog } from "../Dialog";
import { store } from "../../../../app/store";
import { openDialog } from "../../dialog-slice";
import { updateShipment } from "../../../../api/shipments";

vi.mock("../../../../api/shipments", () => ({
  updateShipment: vi.fn(),
}));

describe("Dialog component", () => {
  it("should render the dialog closed by default", () => {
    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const dialogElement = screen.queryByTestId("dialog");

    expect(dialogElement).not.toBeInTheDocument();
  });

  it("should open the dialog when state is set to open", () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );
    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const dialogElement = screen.getByTestId("dialog");

    expect(dialogElement).toBeInTheDocument();
  });

  it("should call updateShipment and close the dialog on save", async () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );
    (updateShipment as vi.Mock).mockResolvedValue({
      status: "Delivered",
      destination: "Port of Rotterdam",
    });

    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateShipment).toHaveBeenCalledWith("SHP-001", {
        status: "Booked",
        destination: "Port of Hamburg",
      });
    });
  });

  it("should close the dialog on cancel", () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );

    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const cancelButton = screen.getByTestId("cancel-button");
    fireEvent.click(cancelButton);

    const dialogElement = screen.queryByTestId("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  it("should display an error message if updateShipment fails", async () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );
    (updateShipment as vi.Mock).mockRejectedValue(new Error("Network error"));

    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("error-message");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("should disable the select and input fields when the save button is pressed", async () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );
    (updateShipment as vi.Mock).mockResolvedValue({
      status: "Delivered",
      destination: "Port of Rotterdam",
    });

    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const saveButton = screen.getByTestId("save-button");
    const statusSelect = screen.getByTestId("status-select");
    const destinationInput = screen.getByTestId("destination-input");

    fireEvent.click(saveButton);

    expect(saveButton).toBeDisabled();
    expect(statusSelect).toBeDisabled();
    expect(destinationInput).toBeDisabled();

    await waitFor(() => {
      expect(updateShipment).toHaveBeenCalledWith("SHP-001", {
        status: "Booked",
        destination: "Port of Hamburg",
      });
    });
  });

  it("should show the loading message when the save is in progress", async () => {
    store.dispatch(
      openDialog({
        id: "SHP-001",
        status: "Booked",
        origin: "Port of Shanghai",
        destination: "Port of Hamburg",
        estimatedArrival: new Date().toISOString(),
      })
    );
    (updateShipment as vi.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                status: "Delivered",
                destination: "Port of Rotterdam",
              }),
            1000
          )
        )
    );

    render(
      <Provider store={store}>
        <Dialog />
      </Provider>
    );

    const saveButton = screen.getByTestId("save-button");

    fireEvent.click(saveButton);

    expect(saveButton).toHaveTextContent("Saving...");

    await waitFor(() => {
      const loadingMessage = screen.getByTestId("loading-message");
      expect(loadingMessage).toBeInTheDocument();
      expect(updateShipment).toHaveBeenCalledWith("SHP-001", {
        status: "Booked",
        destination: "Port of Hamburg",
      });
    });
  });
});
