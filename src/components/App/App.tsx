import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Dialog } from "../../features/dialog/components/Dialog";
import {
  openDialog,
  selectDialogOpened,
} from "../../features/dialog/dialog-slice";
import "./App.scss";

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpened = useAppSelector(selectDialogOpened);

  return (
    <div className="app">
      <button type="button" onClick={() => dispatch(openDialog())}>
        Open dialog
      </button>

      {isOpened && <Dialog />}
    </div>
  );
};
