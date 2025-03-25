import { ReactElement } from "react";
import useGet from "../hooks/useGet";
import { getUserPublicRepoReadme } from "../services/github-api";

interface GithubRepositoryReadmeProviderProps {
  readonly repoName: string;
  readonly onLoadingComponent: ReactElement | null;
  readonly onError: (error: string) => void;
  readonly onData: (data: string) => ReactElement;
}

function GithubRepositoryReadmeProvider({
  repoName,
  onLoadingComponent,
  onError,
  onData,
}: GithubRepositoryReadmeProviderProps) {
  const { data, loading, error } = useGet(getUserPublicRepoReadme, false, {
    username: "marekblvn",
    repoName: repoName,
  });
  if (loading) return onLoadingComponent;
  if (error) {
    onError(error);
    return onData("");
  }
  if (data) {
    const parsedData = atob(data.content as string);
    return onData(parsedData);
  }
}

export default GithubRepositoryReadmeProvider;
