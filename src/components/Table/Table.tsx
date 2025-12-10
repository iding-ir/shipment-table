import type { Shipment } from "../../types/shitments";
import "./Table.scss";

export const Table: React.FC<{ shipments: Shipment[] }> = ({ shipments }) => {
  return (
    <table>
      <caption>Total Shipments: {shipments.length}</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th>Origin</th>
          <th>Status</th>
          <th>Destination</th>
          <th>ETA</th>
        </tr>
      </thead>
      <tbody>
        {shipments.map((shipment) => (
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
