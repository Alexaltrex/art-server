import {Router} from "express";
import {portfolioController} from "../controllers/portfolio.controller";
import {accessTokenHandler} from "../middlewares/accessTokenHandler";
import {uploadSingle} from "../middlewares/upload";

export const portfolioRouter = Router();
portfolioRouter.get('/', portfolioController.getAll);
portfolioRouter.post('/id', [accessTokenHandler, uploadSingle], portfolioController.createPortfolio);
portfolioRouter.put('/id/:id', [accessTokenHandler, uploadSingle], portfolioController.updatePortfolio);
portfolioRouter.delete('/id/:id', [accessTokenHandler], portfolioController.deletePortfolio);
portfolioRouter.put('/order', [accessTokenHandler], portfolioController.changeItemsOrder)
