import axios, { AxiosResponse } from "axios";

const apiInstance = axios.create({
  baseURL: "https://api.github.com/",
  responseType: "json",
});

type GetUserPublicRepoListParams = { username: string };

export async function getUserPublicRepoList({
  username,
}: GetUserPublicRepoListParams): Promise<
  AxiosResponse<Array<Record<string, unknown>>>
> {
  return await apiInstance.get(`/users/${username}/repos`);
}

type GetUserPublicRepoReadmeParams = { username: string; repoName: string };
export async function getUserPublicRepoReadme({
  username,
  repoName,
}: GetUserPublicRepoReadmeParams): Promise<
  AxiosResponse<Record<string, unknown>>
> {
  return await apiInstance.get(`/repos/${username}/${repoName}/readme`);
}
