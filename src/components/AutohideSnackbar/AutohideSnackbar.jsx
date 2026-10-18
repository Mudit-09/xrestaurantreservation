
import React, { useEffect } from "react";
import "./AutohideSnackbar.css";

function AutohideSnackbar({
  message = "",
  open = false,
  onClose,
  severity = "success",
  duration = 4000,
}) {
  useEffect(() => {
    if (!open || !message) {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [open, message, duration, onClose]);

  if (!open || !message) {
    return null;
  }

  const validSeverities = ["success", "error", "warning", "info"];
  const currentSeverity = validSeverities.includes(severity)
    ? severity
    : "success";

  return (
    <div
      className={`autohide-snackbar snackbar-${currentSeverity}`}
      role={currentSeverity === "error" ? "alert" : "status"}
      aria-live={currentSeverity === "error" ? "assertive" : "polite"}
    >
      <span className="snackbar-message">{message}</span>

      <button
        type="button"
        className="snackbar-close"
        aria-label="Dismiss notification"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default AutohideSnackbar;
