
import React, { useState } from "react";
import "./SmsForm.css";

function SmsForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedNumber = phoneNumber.replace(/[\s-]/g, "");
    const indianMobilePattern = /^(?:\+91)?[6-9]\d{9}$/;

    if (!indianMobilePattern.test(cleanedNumber)) {
      setIsError(true);
      setMessage("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setIsError(false);
    setMessage(
      "Your number is valid. SMS delivery is not enabled in this demo."
    );
  };

  return (
    <form className="sms-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="sms-phone-number">Mobile number</label>

      <div className="sms-form-controls">
        <input
          id="sms-phone-number"
          name="phoneNumber"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="Enter your mobile number"
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
            setMessage("");
            setIsError(false);
          }}
          aria-describedby={message ? "sms-form-message" : undefined}
          aria-invalid={isError}
          required
        />

        <button type="submit">Submit</button>
      </div>

      {message && (
        <p
          id="sms-form-message"
          className={`sms-form-message ${isError ? "error" : "success"}`}
          role={isError ? "alert" : "status"}
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default SmsForm;
