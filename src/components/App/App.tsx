import { useAppSelector } from "../../app/hooks";
import {
  selectFilteredData,
  useGetDataQuery,
} from "../../features/data/data-api";
import { Dialog } from "../../features/dialog/components/Dialog";
import { selectDialogOpened } from "../../features/dialog/dialog-slice";
import { Filter } from "../../features/Filter/components/Filter";
import { Table } from "../Table/Table";
import "./App.scss";

export const App: React.FC = () => {
  const { isLoading, isError } = useGetDataQuery();
  const isOpened = useAppSelector(selectDialogOpened);
  const shipments = useAppSelector(selectFilteredData);

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
        <Filter />
        <Table shipments={shipments} />
      </main>

      <footer>Tech assignment</footer>

      {isOpened && <Dialog />}
    </div>
  );
};
