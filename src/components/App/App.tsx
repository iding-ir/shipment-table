import { useAppSelector } from "../../app/hooks";
import { useGetDataQuery } from "../../features/data/data-api";
import { Dialog } from "../../features/dialog/components/Dialog";
import { selectDialogOpened } from "../../features/dialog/dialog-slice";
import "./App.scss";

export const App: React.FC = () => {
  const { data: shipments, isLoading, isError } = useGetDataQuery();
  const isOpened = useAppSelector(selectDialogOpened);

  if (isLoading) {
    return <div className="centered">Loading...</div>;
  }

  if (isError) {
    return <div className="centered">Error loading data.</div>;
  }

  if (!shipments) {
    return <div className="centered">No data available.</div>;
  }

  return (
    <div className="app">
      <header>Shipment Dashboard</header>

      <main>
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
      </main>

      <footer>Tech assignment</footer>

      {isOpened && <Dialog />}
    </div>
  );
};
