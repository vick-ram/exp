export type ApiResponse<T> = {
  data?: T;
  message: string;
  status: number;
};

export const successResponse = <T>(
  data: T,
  message: string,
  status: number = 200
): ApiResponse<T> => {
  return {
    data,
    message,
    status,
  };
};

export const errorResponse = <T>(
  message: string,
  status: number = 500
): ApiResponse<T> => {
  return {
    message,
    status,
  };
};
