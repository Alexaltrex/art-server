import {CreateCategoryType, ICategory} from "../types/category.type";
import {categoryDB} from "../db/CategoryDB/CategoryDB";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
import {sliderDB} from "../db/Slider/SliderDB";

export const categoryService = {
    //=============== GET ALL ===============//
    getAll(): ICategory[] {
        return categoryDB.getAll();
    },

    //=============== CREATE CATEGORY ===============//
    async create(createCategory: CreateCategoryType): Promise<void> {
        const id = uuidv4();
        categoryDB.createCategory({id, ...createCategory});

        // создаем папку для слайдера
        const fsPromises = fs.promises;
        const path = `src/static/slider/${id}/`;
        await fsPromises.mkdir(path);

        // создаем новый слайдер в бд
        sliderDB.createSlider({id, ...createCategory});
    },

    //=============== UPDATE CATEGORY ===============//
    updateCategory(id: string, updateCategory: CreateCategoryType): void {
        // преименовываем слайдер
        sliderDB.renameSlider({id, ...updateCategory})
        // обновляем категорию
        categoryDB.updateCategory(id, updateCategory);
    },

    //=============== DELETE CATEGORY ===============//
    async deleteCategory(id: string): Promise<void> {
        // удаляем слайдер (папку с изображениями)
        const fsPromises = fs.promises;
        await fsPromises.rm(`src/static/slider/${id}`, {recursive: true, force: true})

        // удаляем слайдер из бд
        sliderDB.deleteSlider(id);

        // удаляем категорию
        categoryDB.deleteCategory(id);
    },
}
