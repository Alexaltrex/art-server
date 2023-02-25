import {NextFunction, Request, Response} from "express";
import {portfolioService} from "../services/portfolio.service";
import {ChangeItemsOrderType, IUpdatePortfolio} from "../types/portfolio.types";
import {ApiError} from "../middlewares/errorHandler";

export const portfolioController = {
    //=============== GET ALL ===============//
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = portfolioService.getAll();
            res.json(items);
        } catch (e) {
            next(e)
        }
    },

    // //=============== GET BY ID ===============//
    // getById: async (req: Request, res: Response, next: NextFunction) => {
    //     try {
    //         const id = req.params.id;
    //         const item = portfolioService.getById(id);
    //         res.json(item);
    //     } catch (e) {
    //         next(e)
    //     }
    // },

    //=============== UPDATE PORTFOLIO ===============//
    updatePortfolio: async (req: Request<{id: string}, any, IUpdatePortfolio>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("id required")
            }
            const updatePortfolio = req.body;
            const file = req.file as Express.Multer.File | undefined;
            await portfolioService.updatePortfolio(id, updatePortfolio, file);
            res.json("update portfolio success");
        } catch (e) {
            next(e)
        }
    },

    //=============== CREATE PORTFOLIO ===============//
    createPortfolio: async (req: Request<any, any, IUpdatePortfolio>, res: Response, next: NextFunction) => {
        try {
            const createPortfolio = req.body;
            const file = req.file as Express.Multer.File | undefined;
            await portfolioService.createPortfolio(createPortfolio, file);
            res.json("create portfolio success");
        } catch (e) {
            next(e)
        }
    },

    //=============== DELETE PORTFOLIO ===============//
    deletePortfolio: async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("payload required")
            }
            await portfolioService.deletePortfolio(id);
            res.json("delete portfolio success");
        } catch (e) {
            next(e)
        }
    },

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder: async (req: Request<any, any, ChangeItemsOrderType>, res: Response, next: NextFunction) => {
        try {
            const changeItemsOrderPayload = req.body;
            portfolioService.changeItemsOrder(changeItemsOrderPayload);
            res.json("change items order success");
        } catch (e) {
            next(e)
        }
    },


}
