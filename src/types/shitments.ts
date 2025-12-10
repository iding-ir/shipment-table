export const SHIPMENT_STATUSES = [
  "Booked",
  "In Transit",
  "Delivered",
  "Cancelled",
] as const;

export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: ShipmentStatus;
  estimatedArrival: string;
}
