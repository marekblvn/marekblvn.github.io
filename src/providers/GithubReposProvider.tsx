import { ReactElement } from "react";
import useGet from "../hooks/useGet";
import { getUserPublicRepos } from "../services/github-api";

interface GithubReposProviderProps {
  onLoadingComponent: ReactElement | null;
  onError: (error: string) => void;
  onData: (data: Array<Record<string, any>>) => ReactElement;
}

function GithubReposProvider({
  onLoadingComponent,
  onError,
  onData,
}: GithubReposProviderProps) {
  const { data, loading, error } = useGet(getUserPublicRepos, false, {
    username: "marekblvn",
  });
  if (loading) return onLoadingComponent;
  if (error) {
    onError(error);
    return onData(data);
  }
  if (data) return onData(data);
}

export default GithubReposProvider;
