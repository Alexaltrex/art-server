import {Router} from "express";
import {authController} from "../controllers/auth.controller";

export const authRouter = Router();
authRouter.get('/hash/:password', authController.getHashPassword);
authRouter.post('/login', authController.login);
