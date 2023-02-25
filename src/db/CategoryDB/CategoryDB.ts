import {CreateCategoryType, ICategories, ICategory} from "../../types/category.type";
import {categoryMock} from "./CategoryMock";
import {v4 as uuidv4} from "uuid";

class CategoryDB {
    private _categories: ICategories = categoryMock

    //=============== GET ALL ===============//
    public getAll(): ICategory[] {
        return Object.values(this._categories)
    }

    //=============== GET BY ID ===============//
    public getById(id: string): ICategory {
        return this._categories[id]
    }

    //=============== CREATE ===============//
    public createCategory(createCategory: ICategory): void {

        this._categories[createCategory.id] = { ...createCategory }
    }

    //=============== DELETE ===============//
    public deleteCategory(id: string) {
        delete this._categories[id]
    }

    //=============== UPDATE ===============//
    public updateCategory(id: string, updateCategory: CreateCategoryType) {
        this._categories[id] = {
            ...this._categories[id],
            ...updateCategory,
        }
    }
}
export const categoryDB = new CategoryDB();
