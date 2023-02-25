export interface ICategories {
    [key: string]: ICategory
}

export interface ICategory {
    id: string
    name: string
}

export type CreateCategoryType = Omit<ICategory, "id">
