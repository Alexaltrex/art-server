import {Router} from "express";
import {categoryController} from "../controllers/category.controller";
import {accessTokenHandler} from "../middlewares/accessTokenHandler";

export const categoryRouter = Router();
categoryRouter.get('/', categoryController.getAll);
categoryRouter.post('/', [accessTokenHandler], categoryController.create);
categoryRouter.put('/:id', [accessTokenHandler], categoryController.update);
categoryRouter.delete('/:id', [accessTokenHandler], categoryController.delete)
