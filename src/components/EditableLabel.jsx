import React from "react";

// return based on a bool an input or a span with input value as text
export default function EditableLabel({
  value,
  placeholder,
  setLabels,
  index,
}) {
  const [isEditing, setIsEditing] = React.useState(false);

  // two cases for setting editing false
  const handleBlur = (e) => {
    if (e.target.value.trim() === "") {
      setLabels((prev) => {
        const next = [...prev];
        next[index] = placeholder;
        return next;
      });
    }
    setIsEditing(false);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() === "") {
        setLabels((prev) => {
          const next = [...prev];
          next[index] = placeholder;
          return next;
        });
      }
      setIsEditing(false);
    }
    if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={value}
      onChange={(e) => {
        const newValue = e.target.value;
        setLabels((prev) => {
          const next = [...prev];
          next[index] = newValue;
          return next;
        });
      }}
      onBlur={handleBlur} // event
      onKeyDown={handleKeyDown} // event
      placeholder={placeholder}
      autoFocus
    />
  ) : (
    <span onClick={() => setIsEditing(true)}>{value}</span>
  );
}
