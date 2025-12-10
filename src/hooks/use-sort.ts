import { useMemo, useState } from "react";
import type { Shipment } from "../types/shitments";

export type SortConfig = {
  key: keyof Shipment;
  dir: "asc" | "desc";
};

type UseSortResult = {
  sortedData: Shipment[];
  sortConfig: SortConfig;
  handleSort: (key: keyof Shipment) => void;
};

export function useSort(data: Shipment[]): UseSortResult {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "estimatedArrival",
    dir: "desc",
  });

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const items = [...data];
    items.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.key === "status") {
        const res = aValue.localeCompare(bValue);
        return sortConfig.dir === "asc" ? res : -res;
      }

      if (sortConfig.key === "estimatedArrival") {
        const res =
          new Date(a.estimatedArrival).getTime() -
          new Date(b.estimatedArrival).getTime();
        return sortConfig.dir === "asc" ? res : -res;
      }

      return 0;
    });
    return items;
  }, [data, sortConfig]);

  const handleSort = (key: keyof Shipment) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      return { key, dir: "asc" };
    });
  };

  return { sortedData, sortConfig, handleSort };
}
