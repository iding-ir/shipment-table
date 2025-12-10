import { useAppSelector } from "../../app/hooks";
import { selectFilteredData } from "../../features/data/data-api";
import { useSort } from "../../hooks/use-sort";
import "./Table.scss";
import { Arrow } from "../Arrow/Arrow";

export const Table: React.FC = () => {
  const shipments = useAppSelector(selectFilteredData);
  const { sortedData, sortConfig, handleSort } = useSort(shipments);

  return (
    <table>
      <caption>Total Shipments: {sortedData.length}</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th className="clickable" onClick={() => handleSort("status")}>
            <span>Status</span>
            <Arrow sortConfig={sortConfig} column="status" />
          </th>
          <th>Destination</th>
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
          <tr key={shipment.id}>
            <td>{shipment.id}</td>
            <td>{shipment.origin}</td>
            <td>{shipment.status}</td>
            <td>{shipment.destination}</td>
            <td>{new Date(shipment.estimatedArrival).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
