import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchShipments } from "../../api/shipments";
import type { Shipment } from "../../types/shitments";
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: async () => ({ data: await fetchShipments() }),
  tagTypes: [],
  endpoints: (builder) => ({
    getData: builder.query<Shipment[], void>({
      query: () => "",
    }),
  }),
});

export const { useGetDataQuery } = dataApi;

export const selectFilteredData = createSelector(
  (state: RootState) => state.filter.selected,
  dataApi.endpoints.getData.select(),
  (selectedFilter, { data = [] }) => {
    if (selectedFilter === "All") {
      return data;
    }
    return data.filter((item) => item.status === selectedFilter);
  }
);
