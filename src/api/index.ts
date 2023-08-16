import { AxiosError } from "axios";
import axios from "../lib/axios";
import {
  GetUserResponse,
  GetReposResponse,
  BackendErrorCode,
  GetListParams,
} from "./types";
import { API_AUTH_TOKEN } from "../config";

export class BackendError extends Error {
  code: BackendErrorCode;

  constructor(code: BackendErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}

export type ApiError = BackendError | AxiosError;

const headers = {
  //This is the static token needs to be replaced manually in config file
  Authorization: API_AUTH_TOKEN,
  "X-GitHub-Api-Version": "2022-11-28",
};

export const getUserList = async (
  params: GetListParams
): Promise<GetUserResponse> => {
  const response = await axios.get(`users?q=${params.query}`, {
    headers,
    params: {
      page: params.page,
      per_page: params.perPage,
    },
  });

  if (response?.data) {
    return response?.data;
  }

  return response?.data;
};

export const getReposList = async (
  params: GetListParams
): Promise<GetReposResponse> => {
  const response = await axios.get(`repositories?q=${params.query}`, {
    headers,
    params: {
      page: params.page,
      per_page: params.perPage,
    },
  });

  if (response?.data) {
    response?.data;
  }

  return response?.data;
};
