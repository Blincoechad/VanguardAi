import { useEffect, useState, useCallback } from "react";

// Wraps the load/error/data cycle every page needs when it calls the
// service layer, so pages don't each reinvent the same three useState
// calls and try/catch block.
export function useAsyncData(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [error, setError] = useState(null);

  const reload = useCallback(() => {
    let cancelled = false;
    setStatus("loading");
    fetcher()
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setStatus("success");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
        setStatus("error");
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    const cancel = reload();
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  return { data, status, error, reload };
}
