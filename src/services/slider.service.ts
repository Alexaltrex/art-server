import {sliderDB} from "../db/Slider/SliderDB";
import {ICreateSlide, ISlider} from "../types/slider.type";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";
import {ChangeItemsOrderType} from "../types/portfolio.types";
import {portfolioDB} from "../db/PortfolioDB/PortfolioDB";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD;

export const sliderService = {
    //=============== GET ALL ===============//
    getAll(): ISlider[] {
        return sliderDB.getAll();
    },

    //=============== GET SLIDER BY ID ===============//
    getSliderById(id: string): ISlider {
        return sliderDB.getSliderById(id);
    },

    //=============== ADD SLIDE TO SLIDER ===============//
    async addSlideToSlider(createSlide: ICreateSlide, categoryId: string): Promise<void> {
        const slideId = uuidv4(); // id слайда === имя файла

        // сохранение нового файла слайда (с новым именем) на сервер
        const fileName = await this.writePortfolioImage(categoryId, slideId, createSlide.src);

        // сохранение нового слайда в бд
        sliderDB.addSlideToSlider({
            id: slideId,
            src: `${url}/slider/${categoryId}/${fileName}`
        }, categoryId);
    },

    //=============== DELETE SLIDE FROM SLIDER ===============//
    async deleteSlideFromSlider(sliderId: string, slideId: string): Promise<void> {
        // удаление изображения
        const fsPromises = fs.promises;
        const deletedSlide = sliderDB.getSliderById(sliderId).slides[slideId]; // `${url}/slider/1/03.jpg`;
        const src = deletedSlide.src;
        const baseName = path.basename(src);

        await fsPromises.rm(`src/static/slider/${sliderId}/${baseName}`);

        // удаление из базы данных
        sliderDB.deleteSlideFromSlider(sliderId, slideId);
    },

    //=============== CHANGE SLIDES ORDER ===============//
    changeSlidesOrder(sliderId: string, changeItemsOrderPayload: ChangeItemsOrderType) {
        sliderDB.changeSlidesOrder(sliderId, changeItemsOrderPayload);
    },


    //=============== WRITE SLIDE IMAGE ===============//
    async writePortfolioImage(
        categoryId: string,
        slideId: string, // id слайда === имя файла
        file: Express.Multer.File
    ): Promise<string> {
       // const path = `src/static/slider/${id}/`; создана при создании категории
        const extName = path.extname(file.originalname); // расширение

        // сохранение нового файла (с новым именем) на сервер
        const fsPromises = fs.promises;
        await fsPromises.writeFile(
            `src/static/slider/${categoryId}/${slideId}${extName}`,
            file.buffer,
        );
        return `${slideId}${extName}`
    }
}
