import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchShipments } from "../../api/shipments";
import type { Shipment } from "../../types/shitments";

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
