import { IPayloadPagination, IResponse } from "@/utils/types/api";
import axiosWithConfig from "../axiosWithConfig";
import { BookSchema, IBook, IBorrowed } from "./type";
import { checkProperty, valueFormatData } from "@/utils/formatter";

export const getBooks = async () => {
  try {
    const response = await axiosWithConfig.get("/books");

    return response.data as IResponse<IPayloadPagination<IBook[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getDetailBook = async (id_book: string) => {
  try {
    const response = await axiosWithConfig.get(`/books/${id_book}`);

    return response.data as IResponse<IBook>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const addNewBook = async (body: BookSchema) => {
  try {
    const formData = new FormData();

    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.post("/books", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const updateBook = async (body: BookSchema, id_book: number) => {
  try {
    const formData = new FormData();

    let key: keyof typeof body;
    for (key in body) {
      if (checkProperty(body[key])) {
        formData.append(key, valueFormatData(body[key]));
      }
    }

    const response = await axiosWithConfig.put(`/books/${id_book}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteBook = async (id_book: number) => {
  try {
    const response = await axiosWithConfig.delete(`/books/${id_book}`);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const getBorrowedBooks = async () => {
  try {
    const response = await axiosWithConfig.get("/borrows");

    return response.data as IResponse<IPayloadPagination<IBorrowed[]>>;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};

export const deleteBorrow = async (id_borrow: number) => {
  try {
    const response = await axiosWithConfig.delete(`/borrows/${id_borrow}`);

    return response.data as IResponse;
  } catch (error: any) {
    throw Error(error.response.data.message);
  }
};
