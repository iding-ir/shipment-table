import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import type { FilterType } from "../../types/filter";

export interface FilterState {
  selected: FilterType;
}

const initialState: FilterState = {
  selected: "All",
};

export const filterSlice = createAppSlice({
  name: "filter",
  initialState,
  reducers: (create) => ({
    setFilter: create.reducer(
      (state, { payload }: PayloadAction<FilterType>) => {
        state.selected = payload;
      }
    ),
  }),
  selectors: {
    selectFilter: ({ selected }) => selected,
  },
});

export const { setFilter } = filterSlice.actions;

export const { selectFilter } = filterSlice.selectors;
