import axios, { AxiosResponse } from "axios";

const apiInstance = axios.create({
  baseURL: "https://api.github.com/",
  responseType: "json",
});

type GetUserPublicReposParams = { username: string };
export async function getUserPublicRepos({
  username,
}: GetUserPublicReposParams): Promise<
  AxiosResponse<Array<Record<string, unknown>>>
> {
  return await apiInstance.get(`/users/${username}/repos`);
}
