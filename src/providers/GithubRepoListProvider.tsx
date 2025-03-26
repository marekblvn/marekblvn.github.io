import { ReactElement } from "react";
import useGet from "../hooks/useGet";
import { getUserPublicRepoList } from "../services/github-api";

interface GithubRepoListProviderProps {
  onLoadingComponent: ReactElement | null;
  onError: (error: string) => void;
  onData: (data: Array<Record<string, any>> | undefined) => ReactElement;
}

function GithubRepoListProvider({
  onLoadingComponent,
  onError,
  onData,
}: GithubRepoListProviderProps) {
  const { data, loading, error } = useGet(getUserPublicRepoList, false, {
    username: "marekblvn",
  });
  if (loading) return onLoadingComponent;
  if (error) {
    onError(error);
    return onData(data);
  }
  if (data) return onData(data);
}

export default GithubRepoListProvider;
