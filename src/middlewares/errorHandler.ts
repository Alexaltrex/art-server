import {NextFunction, Request, Response} from "express";

export class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }

    public static UnauthorizedError() {
        return new ApiError(401, "Authentication error");
    }

    public static BadRequest(message: string) {
        return new ApiError(400, message);
    }

    public static TokenExpiredError() {
        return new ApiError(401, "Token Expired Error");
    }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.message);
    console.log(err.stack);
    console.log(err.name);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            status: 'error',
            data: err,
            message: err.message
        })
    }

    res.status(500).json({
        status: 'error',
        data: err,
        message: 'Internal Server Error'
    });
}
