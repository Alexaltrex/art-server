import {Router} from "express";
import {accessTokenHandler} from "../middlewares/accessTokenHandler";
import {mailController} from "../controllers/mail.controller";

export const mailRouter = Router();
mailRouter.post("/", [accessTokenHandler], mailController.sendEmail);
