import type { SortConfig } from "../../hooks/use-sort";
import type { Shipment } from "../../types/shitments";
import "./Arrow.scss";

export const Arrow = ({
  sortConfig,
  column,
}: {
  sortConfig: SortConfig;
  column: keyof Shipment;
}) => {
  if (sortConfig.key === column) {
    return <i className="arrow">{sortConfig.dir === "asc" ? "▲" : "▼"}</i>;
  }
  return null;
};
