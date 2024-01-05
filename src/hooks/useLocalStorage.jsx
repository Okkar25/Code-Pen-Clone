import { useEffect, useState } from "react";

const PREFIX = "codepen-clone-";

const useLocalStorage = (key, initialValue) => {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    try {
      const jsonValue = localStorage.getItem(prefixedKey);

      // Check if value in local storage exists and is not undefined
      if (jsonValue != null) return JSON.parse(jsonValue);

      // If value is undefined and not exist in local storage, return initial value
      if (typeof initialValue === "function") {
        return initialValue();
      } else {
        return initialValue;
      }
    } 
    
    catch (error) {
      console.error("Error parsing JSON:", error);
      return initialValue; // Return initial value on error
    }
  });

  // resave to local storage when value or prefixedKey changes
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [value, prefixedKey]);

  return [value, setValue]; // like useState
};

export default useLocalStorage;
