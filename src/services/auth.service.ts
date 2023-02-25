import {ILoginData, ILoginReturnData} from "../types/auth.types";
import bcrypt from "bcryptjs";
import {hashPassword} from "../db/AdminDB";
import {ApiError} from "../middlewares/errorHandler";
import {generateAccessTokens} from "../helpers/token";

export const authService = {
    async login(loginData: ILoginData): Promise<ILoginReturnData> {
        const passwordIsMatch = await bcrypt.compare(loginData.password, hashPassword);
        if (!passwordIsMatch) {
            throw ApiError.UnauthorizedError();
        }
        const accessToken = await generateAccessTokens();
        return {accessToken}
    },
}
