import { useAppSelector } from "../../app/hooks";
import { useGetDataQuery } from "../../features/data/data-api";
import { Dialog } from "../../features/dialog/components/Dialog";
import { selectDialogOpened } from "../../features/dialog/dialog-slice";
import { Filter } from "../../features/Filter/components/Filter";
import { Table } from "../Table/Table";
import "./App.scss";

export const App: React.FC = () => {
  const { isLoading, isError } = useGetDataQuery();
  const isOpened = useAppSelector(selectDialogOpened);

  if (isLoading) {
    return <div className="centered">Loading...</div>;
  }

  if (isError) {
    return <div className="centered">Error loading data.</div>;
  }

  return (
    <div className="app">
      <header>Shipment Dashboard</header>

      <main>
        <Filter />
        <Table />
      </main>

      <footer>Tech assignment</footer>

      {isOpened && <Dialog />}
    </div>
  );
};
