import {
  type Action,
  type ThunkAction,
  combineSlices,
  configureStore,
} from "@reduxjs/toolkit";

import { dataApi } from "../features/data/data-api";
import { dialogSlice } from "../features/dialog/dialog-slice";
import { filterSlice } from "../features/Filter/filter-slice";
import { updateApi } from "../features/data/update-api";

const rootReducer = combineSlices(dataApi, updateApi, dialogSlice, filterSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dataApi.middleware, updateApi.middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
