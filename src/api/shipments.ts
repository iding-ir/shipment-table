import { SHIPMENT_STATUSES, type Shipment } from "../types/shitments";
import { randomDelay } from "../utils/delay";

export const fetchShipments = async (): Promise<Shipment[]> => {
  await randomDelay(200, 500);

  const now = Date.now();
  const length = Math.floor(Math.random() * 5) + 12;
  const shipments: Shipment[] = Array.from({ length }).map((_, i) => {
    const daysOffset = (i - 6) * 3 + (i % 3);
    const date = new Date(now + daysOffset * 24 * 60 * 60 * 1000);
    const status = SHIPMENT_STATUSES[(i * 3) % SHIPMENT_STATUSES.length];

    return {
      id: `SHP-${String(100 + i).padStart(3, "0")}`,
      origin: [
        "Port of Shanghai",
        "Port of Singapore",
        "Port of New York",
        "Port of Dubai",
        "Port of Los Angeles",
      ][i % 5],
      destination: [
        "Port of Rotterdam",
        "Port of Hamburg",
        "Port of Valencia",
        "Port of Sydney",
        "Port of Vancouver",
      ][i % 5],
      status,
      estimatedArrival: date.toISOString(),
    };
  });

  return shipments;
};

export type UpdateShipmentData = Pick<Shipment, "status" | "destination">;

export async function updateShipment(
  shipmentId: string,
  data: UpdateShipmentData
): Promise<UpdateShipmentData> {
  await randomDelay(1000, 2000);

  const succeed = Math.random() < 0.8;

  if (!succeed) {
    return Promise.reject(
      new Error("Network error: failed to update shipment")
    );
  }

  console.log(`Shipment ${shipmentId} updated with data:`, data);

  return data;
}
