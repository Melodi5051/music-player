import axios, { AxiosResponse } from "axios";
import { songTypes } from "../types/song";

export const getAllSongs = async (): Promise<songTypes[]> => {
  try {
    const response: AxiosResponse<songTypes[]> = await axios(
      "http://localhost:3000/audioFiles"
    );
    return response.data;
  } catch (error: any) {
    const errorResp: Error =
      error.response?.data || new Error("Ошибка запроса");
    console.error(errorResp);
    return [];
  }
};
