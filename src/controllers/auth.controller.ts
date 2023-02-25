import {NextFunction, Request, Response} from "express";
import {ILoginData} from "../types/auth.types";
import {ApiError} from "../middlewares/errorHandler";
import bcrypt from "bcryptjs";
import {authService} from "../services/auth.service";

export const authController = {
    //========= GET HASH PASSWORD (TEST) =========//
    getHashPassword: async (req: Request<{password: string}>, res: Response, next: NextFunction) => {
        try {
            const password = req.params.password;

            if (!password) {
                throw ApiError.BadRequest("Password is required")
            }

            const hashPassword = await bcrypt.hash(password, 8);

            res.status(200).json({
                data: hashPassword,
                message: `Hash password generated successfully`
            });

        } catch (e) {
            next(e)
        }
    },
    //========= LOGIN =========//
    login: async (req: Request<any, any, ILoginData>, res: Response, next: NextFunction) => {
        try {
            const loginData = req.body;

            if (!loginData) {
                throw ApiError.UnauthorizedError();
            }

            const {accessToken} = await authService.login(loginData);

            res.json({
                data: { accessToken },
                message: 'User successfully login'
            });

        } catch (e) {
            next(e)
        }
    }
}
