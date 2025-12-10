import { SHIPMENT_STATUSES } from "./shitments";

export const FILTERS = ["All", ...SHIPMENT_STATUSES] as const;
export type FilterType = (typeof FILTERS)[number];
