export interface IPortfolios {
    [key: string]: IPortfolio
}

export interface IPortfolio {
    id: string
    order: number
    name: string
    year: string
    category: {
        id: string
        name: string
    }
    tag: string
    url: string
    img: string
}

export type UpdatePortfolioDBType = Omit<IPortfolio, "id" | "order">

export interface IUpdatePortfolio {
    name: string
    year: string
    categoryId: string
    tag: string
    url: string
}

export type ChangeItemsOrderType = {
    id: string
    order: number
}[]


