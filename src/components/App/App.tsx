import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetDataQuery } from "../../features/data/data-api";
import { Dialog } from "../../features/dialog/components/Dialog";
import {
  openDialog,
  selectDialogOpened,
} from "../../features/dialog/dialog-slice";
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetDataQuery();
  const isOpened = useAppSelector(selectDialogOpened);

  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
    }
  }, [data]);

  if (isLoading) {
    return <div className="app">Loading...</div>;
  }

  if (isError) {
    return <div className="app">Error loading data.</div>;
  }

  return (
    <div className="app">
      <button type="button" onClick={() => dispatch(openDialog())}>
        Open dialog
      </button>

      {isOpened && <Dialog />}
    </div>
  );
};
