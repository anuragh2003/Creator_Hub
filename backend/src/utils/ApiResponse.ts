import type { Response } from "express";

export interface ApiResponseBody<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message = "Success",
    statusCode = 200,
    meta?: Record<string, unknown>
  ): Response {
    const body: ApiResponseBody<T> = {
      success: true,
      message,
      data,
      ...(meta ? { meta } : {}),
    };
    return res.status(statusCode).json(body);
  }

  static created<T>(res: Response, data: T, message = "Created successfully"): Response {
    return ApiResponse.success(res, data, message, 201);
  }

  static paginated<T>(
    res: Response,
    data: T[],
    total: number,
    page: number,
    limit: number,
    message = "Success"
  ): Response {
    return ApiResponse.success(res, data, message, 200, {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }
}
