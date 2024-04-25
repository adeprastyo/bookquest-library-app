import { IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IProfile } from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const getProfile = async () => {
  try {
    const response = await axiosWithConfig.get("/users");

    return response.data as IResponse<IProfile>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateProfile = async (body: any) => {
  try {
    const formData = new FormData();
    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put("/users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteProfile = async () => {
  try {
    const response = await axiosWithConfig.delete("/users");

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
