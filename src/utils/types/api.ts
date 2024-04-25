export type IResponse<TPayload = any> = {
  message: string;
  payload: TPayload;
};

export interface IPayloadPagination<TDatas> {
  totalItems: number;
  datas: TDatas;
  totalPages: number;
  currentPage: number;
}
