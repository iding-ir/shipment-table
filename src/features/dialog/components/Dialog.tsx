import { useAppDispatch } from "../../../app/hooks";
import { closeDialog } from "../dialog-slice";
import "./Dialog.scss";

export const Dialog: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="overlay">
      <dialog className="dialog" data-testid="dialog">
        <button type="button" onClick={() => dispatch(closeDialog())}>
          Close dialog
        </button>
      </dialog>
    </div>
  );
};
