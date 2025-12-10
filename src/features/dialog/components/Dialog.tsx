import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeDialog, selectOpenShipment } from "../dialog-slice";
import {
  SHIPMENT_STATUSES,
  type ShipmentStatus,
} from "../../../types/shitments";
import { useUpdateShipmentMutation } from "../../data/update-api";
import "./Dialog.scss";

export const Dialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const shipment = useAppSelector(selectOpenShipment);
  const [status, setStatus] = useState<ShipmentStatus>(
    shipment?.status || SHIPMENT_STATUSES[0]
  );
  const [destination, setDestination] = useState<string>(
    shipment?.destination || ""
  );
  const [updateShipment, { isLoading, isError }] = useUpdateShipmentMutation();

  const handleSave = async () => {
    if (!shipment) {
      return;
    }
    try {
      await updateShipment({
        shipmentId: shipment.id,
        data: { status, destination },
      }).unwrap();
      dispatch(closeDialog());
    } catch (err) {
      console.error("updateShipment failed:", err);
    }
  };

  const handleCancel = () => {
    dispatch(closeDialog());
  };

  if (!shipment) {
    return null;
  }

  return (
    <div className="overlay">
      <dialog className="dialog" data-testid="dialog">
        <form className="form">
          <h2>Quick Edit Shipment: {shipment.id}</h2>

          <label>
            Status:
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ShipmentStatus)}
              disabled={isLoading}
              data-testid="status-select"
            >
              {SHIPMENT_STATUSES.map((statusOption) => (
                <option key={statusOption} value={statusOption}>
                  {statusOption}
                </option>
              ))}
            </select>
          </label>

          <label>
            Destination:
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={isLoading}
              data-testid="destination-input"
            />
          </label>

          {isError && (
            <p className="error" data-testid="error-message">
              Failed to save changes.
            </p>
          )}

          <div className="actions">
            <button
              className="cancel"
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              data-testid="cancel-button"
            >
              Cancel
            </button>
            <button
              className="save"
              type="button"
              onClick={handleSave}
              disabled={isLoading}
              data-testid="save-button"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};
