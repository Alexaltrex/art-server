import {Router} from "express";
import {memberController} from "../controllers/member.controller";
import {accessTokenHandler} from "../middlewares/accessTokenHandler";
import {uploadSingle} from "../middlewares/upload";

export const memberRouter = Router();
memberRouter.get('/', memberController.getAll);
memberRouter.put('/id/:id', [accessTokenHandler, uploadSingle], memberController.updateMember);
memberRouter.post('/id', [accessTokenHandler, uploadSingle], memberController.createMember);
memberRouter.delete('/id/:id', [accessTokenHandler], memberController.deleteMember);
memberRouter.put('/order', [accessTokenHandler], memberController.changeItemsOrder);
