//
// Thanks Andrew for this hook!
// Check out his GitHub: https://github.com/andrew4699
//

import { useState, useCallback } from 'react';

//
// useState but the value acts like a physical spring:
// When the value is set, it springs back to its initial value after "revertDelay"
//
// If the value is set again during the revertDelay, the delay resets
export default function useSpringState(initialValue, revertDelay) {
  const [value, setValue] = useState(initialValue);
  const [timer, setTimer] = useState(null);

  const pullSpring = useCallback((newValue) => {
    if (timer !== null) {
      clearTimeout(timer);
    }

    setValue(newValue); // Set the "spring" to the new value

    // Set a timer to release the spring
    setTimer(setTimeout(() => {
      setValue(initialValue);
      setTimer(null);
    }, revertDelay));
  }, [timer, initialValue, revertDelay]);

  return [value, pullSpring];
}
