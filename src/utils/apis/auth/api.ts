import axiosWithConfig from "@/utils/apis/axiosWithConfig";
import { IResponse } from "@/utils/types/api";
import { LoginSchema, RegisterSchema } from "./type";

interface LoginPayload {
  token: string;
}

export const userLogin = async (body: LoginSchema) => {
  try {
    const response = await axiosWithConfig.post("/login", body);

    return response.data as IResponse<LoginPayload>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const userRegister = async (body: RegisterSchema) => {
  try {
    const response = await axiosWithConfig.post("/register", body);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
