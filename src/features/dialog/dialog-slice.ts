import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { Shipment } from "../../types/shitments";

export interface DialogState {
  opened: boolean;
  shipment?: Shipment;
}

const initialState: DialogState = {
  opened: false,
  shipment: undefined,
};

export const dialogSlice = createAppSlice({
  name: "dialog",
  initialState,
  reducers: (create) => ({
    openDialog: create.reducer(
      (state, { payload }: PayloadAction<Shipment>) => {
        state.opened = true;
        state.shipment = payload;
      }
    ),
    closeDialog: create.reducer((state) => {
      state.opened = false;
      state.shipment = undefined;
    }),
  }),
  selectors: {
    selectDialogOpened: ({ opened }) => opened,
    selectOpenShipment: ({ shipment }) => shipment,
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const { selectDialogOpened, selectOpenShipment } = dialogSlice.selectors;
