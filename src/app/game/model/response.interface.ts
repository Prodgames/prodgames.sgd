export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  resource: T | string;
}
