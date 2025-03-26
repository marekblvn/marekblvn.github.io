import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseGetResult<
  T extends Array<Record<string, unknown>> | Record<string, unknown>,
  P extends object
> {
  data: T | undefined;
  loading: boolean;
  error: string | null;
  get: (params?: P) => void;
}

export default function useGet<
  T extends Array<Record<string, unknown>> | Record<string, unknown>,
  P extends object
>(
  asyncCallback: (params: P) => Promise<AxiosResponse<T>>,
  skipInitial: boolean,
  initialParams: P
): UseGetResult<T, P> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<P | undefined>(initialParams);

  const resetError = (): void => setError(null);

  const get = useCallback(
    (_params?: P): void => {
      (async () => {
        resetError();
        setLoading(true);

        try {
          const result = await asyncCallback(_params ?? initialParams);
          setData(result.data);
          setParams(_params ?? params);
        } catch (error) {
          setError((error as Error).message || "Unexpected error has occurred");
        } finally {
          setLoading(false);
        }
      })();
    },
    [asyncCallback, params, initialParams]
  );

  useEffect(() => {
    if (!skipInitial) {
      get(initialParams);
    }
  }, []);

  return {
    data,
    error,
    loading,
    get,
  };
}
