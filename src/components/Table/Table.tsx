import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectFilteredData } from "../../features/data/data-api";
import { useSort } from "../../hooks/use-sort";
import "./Table.scss";
import { Arrow } from "../Arrow/Arrow";
import type { Shipment } from "../../types/shitments";
import { openDialog } from "../../features/dialog/dialog-slice";

export const Table: React.FC = () => {
  const dispatch = useAppDispatch();
  const shipments = useAppSelector(selectFilteredData);
  const { sortedData, sortConfig, handleSort } = useSort(shipments);

  const handleRowClick = (shipment: Shipment) => {
    dispatch(openDialog(shipment));
  };

  return (
    <table>
      <caption>Total Shipments: {sortedData.length}</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th>Destination</th>
          <th className="clickable" onClick={() => handleSort("status")}>
            <span>Status</span>
            <Arrow sortConfig={sortConfig} column="status" />
          </th>
          <th
            className="clickable"
            onClick={() => handleSort("estimatedArrival")}
          >
            <span>ETA</span>
            <Arrow sortConfig={sortConfig} column="estimatedArrival" />
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((shipment) => (
          <tr key={shipment.id} onClick={() => handleRowClick(shipment)}>
            <td>{shipment.id}</td>
            <td>{shipment.origin}</td>
            <td>{shipment.destination}</td>
            <td>{shipment.status}</td>
            <td>{new Date(shipment.estimatedArrival).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
