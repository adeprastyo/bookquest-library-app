import { IPayloadPagination, IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { IBorrowAdmin } from "./type";

export const getBorrows = async () => {
  try {
    const response = await axiosWithConfig.get("/borrows");

    return response.data as IResponse<IPayloadPagination<IBorrowAdmin[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
