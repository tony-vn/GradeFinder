import React from "react";

export default function YesNoDropdown({ answer, setAnswer}) {
  return (
    <div>
      <label>Alternative Weight Scheme: </label>
      <select
        value={answer === null ? "" : String(answer)}
        onChange={(e) => {
          const value = e.target.value;
          setAnswer(value === "" ? null : value === "true");
        }}
      >
        <option value="">-- Select --</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}
