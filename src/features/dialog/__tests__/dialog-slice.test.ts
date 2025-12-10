import {
  openDialog,
  closeDialog,
  dialogSlice,
  selectDialogOpened,
} from "../dialog-slice";
import { describe, expect, it } from "vitest";

describe("dialogSlice", () => {
  it("should have initial state set to false", () => {
    const state = dialogSlice.getInitialState();

    const expected = { opened: false };

    expect(state).toEqual(expected);
  });

  it("should open the dialog", () => {
    const state = { opened: false };

    const newState = dialogSlice.reducer(state, openDialog());
    const expected = { opened: true };

    expect(newState).toEqual(expected);
  });

  it("should close the dialog", () => {
    const state = { opened: true };

    const newState = dialogSlice.reducer(state, closeDialog());
    const expected = { opened: false };

    expect(newState).toEqual(expected);
  });

  it("should select the dialog state", () => {
    const state = { dialog: { opened: true } };

    const selected = selectDialogOpened(state);

    expect(selected).toEqual(true);
  });
});
