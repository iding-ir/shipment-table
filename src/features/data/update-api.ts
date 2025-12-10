import { createApi } from "@reduxjs/toolkit/query/react";
import { updateShipment, type UpdateShipmentData } from "../../api/shipments";
import type { Shipment } from "../../types/shitments";

export const updateApi = createApi({
  reducerPath: "updateApi",
  baseQuery: async (args) => {
    if (args.url === "updateShipment") {
      const { shipmentId, data } = args.body;
      return { data: await updateShipment(shipmentId, data) };
    }
    throw new Error("Unknown endpoint");
  },
  endpoints: (builder) => ({
    updateShipment: builder.mutation<
      Shipment,
      { shipmentId: string; data: UpdateShipmentData }
    >({
      query: ({ shipmentId, data }) => ({
        url: "updateShipment",
        method: "POST",
        body: { shipmentId, data },
      }),
    }),
  }),
});

export const { useUpdateShipmentMutation } = updateApi;
