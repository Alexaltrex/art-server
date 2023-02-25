import {NextFunction, Request, Response} from "express";
import {sliderService} from "../services/slider.service";
import {ISlider} from "../types/slider.type";
import {ApiError} from "../middlewares/errorHandler";
import {ChangeItemsOrderType} from "../types/portfolio.types";
import {portfolioService} from "../services/portfolio.service";

export const sliderController = {
    //=============== GET ALL ===============//
    getAll: async (req: Request, res: Response<ISlider[]>, next: NextFunction) => {
        try {
            const items = sliderService.getAll();
            res.json(items);
        } catch (e) {
            next(e)
        }
    },
    //=============== GET SLIDER BY ID ===============//
    getSliderById: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("id required")
            }
            const slider = sliderService.getSliderById(id);
            res.json(slider)
        } catch (e) {
            next(e)
        }
    },
    //=============== ADD SLIDE TO SLIDER ===============//
    addSlideToSlider: async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
        try {
            const categoryId = req.params.id;
            const file = req.file as Express.Multer.File;
            if (!categoryId) {
                throw ApiError.BadRequest("id required")
            }
            await sliderService.addSlideToSlider({src: file}, categoryId);
            res.json("add slide to slider success");
        } catch (e) {
            next(e)
        }
    },
    //=============== DELETE SLIDE FROM SLIDER ===============//
    deleteSlideFromSlider: async (req: Request<{ id: string, slideId: string }>, res: Response, next: NextFunction) => {
        try {
            if (!req.params.id || !req.params.slideId) {
                throw ApiError.BadRequest("id required")
            }
            const slideId = req.params.slideId;
            const sliderId = req.params.id;
            await sliderService.deleteSlideFromSlider(sliderId, slideId);
            res.json("delete slide from slider success");
        } catch (e) {
            next(e)
        }
    },
    //=============== CHANGE SLIDES ORDER ===============//
    changeSlidesOrder: async (req: Request<{sliderId: string}, any, ChangeItemsOrderType>, res: Response, next: NextFunction) => {
        try {
            const changeItemsOrderPayload = req.body;
            const sliderId = req.params.sliderId;
            if (!sliderId) {
                throw ApiError.BadRequest("id required")
            }
            sliderService.changeSlidesOrder(sliderId, changeItemsOrderPayload);
            res.json("change slides order success");
        } catch (e) {
            next(e)
        }
    },
}
