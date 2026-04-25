import React from "react";

export default function EditableLabel({ value, placeholder, onChangeValue }) {
  const [isEditing, setIsEditing] = React.useState(false);

  const commitValue = (rawValue) => {
    const newValue = rawValue.trim() === "" ? placeholder : rawValue;
    onChangeValue(newValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => onChangeValue(e.target.value)}
      onBlur={(e) => commitValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") commitValue(e.target.value);
        if (e.key === "Escape") setIsEditing(false);
      }}
      placeholder={placeholder}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
}
