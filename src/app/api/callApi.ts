import { useState } from "react";
import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AppActionResultDto } from "../types/AppActionResult.dto";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const useCallApi = <T>(api: AxiosInstance) => {
  const [error, setError] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const callApi = async (
    endpoint: string,
    method: HttpMethod,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<AppActionResultDto> => {
    setLoading(true);
    try {
      let result;
      switch (method) {
        case "GET":
          result = await api.get<AppActionResultDto>(endpoint, config);
          break;
        case "POST":
          result = await api.post<AppActionResultDto>(endpoint, data, config);
          break;
        case "PUT":
          result = await api.put<AppActionResultDto>(endpoint, data, config);
          break;
        case "DELETE":
          result = await api.delete<AppActionResultDto>(endpoint, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      if (result.data.status === "error") {
        setError([result.data.message]);
      }
      return result.data;
    } catch (err) {
      if (err instanceof Error) {
        setError([err.message]);
      } else {
        setError(["Call API failed"]);
      }
    } finally {
      setLoading(false);
    }
    return {
      status: "error",
      message: "Call API failed",
      businessCode: 500,
    };
  };

  return { error, loading, callApi };
};

export default useCallApi;
