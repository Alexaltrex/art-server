import {NextFunction, Request, Response} from "express";
import {categoryService} from "../services/category.service";
import {IUpdatePortfolio} from "../types/portfolio.types";
import {portfolioService} from "../services/portfolio.service";
import {CreateCategoryType} from "../types/category.type";
import {ApiError} from "../middlewares/errorHandler";

export const categoryController = {
    //=============== GET ALL ===============//
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = categoryService.getAll();
            res.json(items);
        } catch (e) {
            next(e)
        }
    },
    //=============== CREATE CATEGORY ===============//
    create: async (req: Request<any, any, CreateCategoryType>, res: Response, next: NextFunction) => {
        try {
            const createCategory = req.body;
            await categoryService.create(createCategory);
            res.json("create category success");
        } catch (e) {
            next(e)
        }
    },
    //=============== UPDATE CATEGORY ===============//
    update: async (req: Request<{ id: string }, any, CreateCategoryType>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("id required")
            }
            const updateCategory = req.body;
            await categoryService.updateCategory(id, updateCategory);
            res.json("update category success");
        } catch (e) {
            next(e)
        }
    },

    //=============== DELETE CATEGORY ===============//
    delete: async (req: Request<{id: string}, any, {order: number}>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("payload required")
            }
            await categoryService.deleteCategory(id);
            res.json("delete portfolio success");
        } catch (e) {
            next(e)
        }
    },
}
