import { useEffect, useState } from 'react';

function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

export function useDebounce(value, delay) {
  // State and setters for debounced value

  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay

      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)

      // This is how we prevent debounced value from updating if value is changed ...

      // .. within the delay period. Timeout gets cleared and restarted.

      return () => {
        clearTimeout(handler);
      };
    },

    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}
export default debounce;
