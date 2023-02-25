import {NextFunction, Request, Response} from "express";
import {memberService} from "../services/member.service";
import {ApiError} from "../middlewares/errorHandler";
import {UpdateMemberType} from "../types/members.type";
import {ChangeItemsOrderType} from "../types/portfolio.types";
import {portfolioService} from "../services/portfolio.service";

export const memberController = {
    //=============== GET ALL ===============//
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const items = memberService.getAll();
            res.json(items);
        } catch (e) {
            next(e)
        }
    },
    //=============== UPDATE MEMBER ===============//
    updateMember: async (req: Request<{id: string}, any, UpdateMemberType>, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("id required")
            }
            const updateMember = req.body;
            const file = req.file as Express.Multer.File | undefined;
            await memberService.updateMember(id, updateMember, file);
            res.json("update member success");
        } catch (e) {
            next(e)
        }
    },
    //=============== CREATE MEMBER ===============//
    createMember: async (req: Request<any, any, UpdateMemberType>, res: Response, next: NextFunction) => {
        try {
            const createMember = req.body;
            const file = req.file as Express.Multer.File | undefined;
            await memberService.createMember(createMember, file);
            res.json("create member success");
        } catch (e) {
            next(e)
        }
    },
    //=============== DELETE MEMBER ===============//
    deleteMember: async (req: Request<{id: string}>, res: Response, next: NextFunction) => {
        try {

            const id = req.params.id;
            if (!id) {
                throw ApiError.BadRequest("payload required")
            }
            await memberService.deleteMember(id);
            res.json("delete member success");
        } catch (e) {
            next(e)
        }
    },

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder: async (req: Request<any, any, ChangeItemsOrderType>, res: Response, next: NextFunction) => {
        try {
            const changeItemsOrderPayload = req.body;
            memberService.changeItemsOrder(changeItemsOrderPayload);
            res.json("change items order success");
        } catch (e) {
            next(e)
        }
    },

}
