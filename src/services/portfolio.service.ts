import {
    ChangeItemsOrderType,
    IPortfolio, IUpdatePortfolio, UpdatePortfolioDBType,
} from "../types/portfolio.types";
import * as fs from "fs";
import path from "path";
import {v4 as uuidv4} from 'uuid';
import {portfolioDB} from "../db/PortfolioDB/PortfolioDB";
import {categoryDB} from "../db/CategoryDB/CategoryDB";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD

export const portfolioService = {

    //=============== GET ALL ===============//
    getAll(): IPortfolio[] {
        return portfolioDB.getAll();
    },

    // //=============== GET BY ID ===============//
    // getById(id: string): IPortfolio {
    //     return portfolioDB.getById(id)
    // },
    //
    // //=============== GET LIST ===============//
    // getList(): IPortfolioItem[] {
    //     return portfolioDB.getList()
    // },
    //
    // //=============== UPDATE ENABLE ===============//
    // updateEnable(id: string, enable: boolean): void {
    //     portfolioDB.updateEnable(id, enable);
    // },

    //=============== WRITE IMAGE ===============//
    // writePortfolioImage(id, "main", imgsMain, createPortfolioDB);
    async writePortfolioImage(
        id: string,
        type: string,
        file: Express.Multer.File | undefined,
        updatePortfolioDB: UpdatePortfolioDBType,
        oldName?: string
    ) {
        if (file) {
            const imgFile = file;
            const extName = path.extname(imgFile.originalname);
            const slug = uuidv4();

            const fsPromises = fs.promises;

            // удаление старого файла (если задано)
            // oldName = `${url}/portfolio/0/main.jpg`
            if (oldName) {
                const oldBasename = path.basename(oldName); // main.jpg
                await fsPromises.unlink(`src/static/portfolio/${id}/${oldBasename}`)
            }

            // если нет oldName, значит создание нового - надо создать директорию
            if (!oldName) {
                const path = `src/static/portfolio/${id}/`;
                try {
                    await fsPromises.access(path);
                } catch (a: any) {
                    await fsPromises.mkdir(path);
                }
            }

            // сохранение нового файла (с новым именем) на сервер
            await fsPromises.writeFile(
                `src/static/portfolio/${id}/${type}${slug}${extName}`,
                imgFile.buffer,
            );

            // сохранение пути к новому файлу в БД
            // @ts-ignore
            updatePortfolioDB.img = `${url}/portfolio/${id}/${type}${slug}${extName}`
        }
    },

    //=============== UPDATE PORTFOLIO ===============//
    async updatePortfolio(
        id: string,
        updatePortfolio: IUpdatePortfolio,
        file: Express.Multer.File | undefined
    ) {
        const { categoryId, ...rest } = updatePortfolio;
        const updatePortfolioDB = {
            ...rest,
            category: categoryDB.getById(categoryId),
        } as UpdatePortfolioDBType;

        const oldPortfolio = portfolioDB.getById(id);
        await this.writePortfolioImage(id, "img", file, updatePortfolioDB, oldPortfolio.img);
        portfolioDB.updatePortfolio(id, updatePortfolioDB)
    },

    //=============== CREATE PORTFOLIO ===============//
    async createPortfolio(
        createPortfolio: IUpdatePortfolio,
        file: Express.Multer.File | undefined
    ) {
        const { categoryId, ...rest } = createPortfolio;
        const id = uuidv4();
        const createPortfolioDB = {
            ...rest,
            category: categoryDB.getById(categoryId),
        } as UpdatePortfolioDBType;
        await this.writePortfolioImage(id, "img", file, createPortfolioDB);
        portfolioDB.createPortfolio(id, createPortfolioDB);
    },

    //=============== DELETE PORTFOLIO ===============//
    async deletePortfolio(id: string) {
        // удаление изображений
        const fsPromises = fs.promises;
        await fsPromises.rm(`src/static/portfolio/${id}/`, {recursive: true, force: true});

        // удаление из базы данных
        portfolioDB.deletePortfolio(id);
    },

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder(changeItemsOrderPayload: ChangeItemsOrderType) {
        portfolioDB.changeItemsOrder(changeItemsOrderPayload);
    }

}
