import React from "react";

// pass label of data and its default value, returns state variable and setter
export default function useLocalStorage(key, defaultValue) {
  // if there is a key (label) with our data in local storage, use that, otherwise use the default value
  const [value, setValue] = React.useState(() => {
    const saved = localStorage.getItem(key); // check for saved JSON, parse as list
    return saved !== null ? JSON.parse(saved) : defaultValue;
  });

  // update local storage whenever value changes, but only if value is defined (prevents saving undefined on initial render)
  React.useEffect(() => {
    if (value === undefined) return;
    // convert state to json
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
