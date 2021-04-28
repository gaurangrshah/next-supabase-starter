import { useEffect, useState } from "react";

/**
 * @SCOPE:  used to check if a component is mounted
 * used by:
 * - protected
 */

export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}
