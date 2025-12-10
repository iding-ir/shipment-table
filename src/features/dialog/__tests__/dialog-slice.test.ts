import type { Shipment } from "../../../types/shitments";
import {
  openDialog,
  closeDialog,
  dialogSlice,
  selectDialogOpened,
  selectOpenShipment,
} from "../dialog-slice";
import { describe, expect, it } from "vitest";

describe("dialogSlice", () => {
  it("should have initial state set to false", () => {
    const state = dialogSlice.getInitialState();

    const expected = { opened: false };

    expect(state).toEqual(expected);
  });

  it("should open the dialog", () => {
    const state = { opened: false, shipment: undefined };
    const shipment = {
      id: "SHP-001",
      status: "Booked",
      origin: "Port of Shanghai",
      destination: "Port of Hamburg",
      estimatedArrival: new Date().toISOString(),
    } as Shipment;

    const newState = dialogSlice.reducer(state, openDialog(shipment));
    const expected = { opened: true, shipment };

    expect(newState).toEqual(expected);
  });

  it("should close the dialog correctly", () => {
    const shipment = {
      id: "SHP-001",
      status: "Booked",
      origin: "Port of Shanghai",
      destination: "Port of Hamburg",
      estimatedArrival: new Date().toISOString(),
    } as Shipment;
    const state = { opened: true, shipment };

    const newState = dialogSlice.reducer(state, closeDialog());
    const expected = { opened: false, shipment: undefined };

    expect(newState).toEqual(expected);
  });

  it("should select the dialog opened state", () => {
    const state = { dialog: { opened: true } };

    const selected = selectDialogOpened(state);

    expect(selected).toEqual(true);
  });

  it("should select the dialog shipment state correctly", () => {
    const shipment = {
      id: "SHP-001",
      status: "Booked",
      origin: "Port of Shanghai",
      destination: "Port of Hamburg",
      estimatedArrival: new Date().toISOString(),
    } as Shipment;
    const state = { dialog: { opened: true, shipment } };

    const selected = selectOpenShipment(state);

    expect(selected).toEqual(shipment);
  });
});
