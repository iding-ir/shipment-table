import { createAppSlice } from "../../app/createAppSlice";

export interface DialogState {
  opened: boolean;
}

const initialState: DialogState = {
  opened: false,
};

export const dialogSlice = createAppSlice({
  name: "dialog",
  initialState,
  reducers: (create) => ({
    openDialog: create.reducer((state) => {
      state.opened = true;
    }),
    closeDialog: create.reducer((state) => {
      state.opened = false;
    }),
  }),
  selectors: {
    selectDialogOpened: ({ opened }) => opened,
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export const { selectDialogOpened } = dialogSlice.selectors;
