import {portfolioMock} from "./PortfolioMock";
import {
    ChangeItemsOrderType,
    IPortfolio,
    IPortfolios,
    UpdatePortfolioDBType
} from "../../types/portfolio.types";

class PortfolioDB {
    private _items: IPortfolios = portfolioMock

    //=============== GET ALL ===============//
    public getAll(): IPortfolio[] {
        return Object.values(this._items)
    }

    //=============== GET BY ID ===============//
    public getById(id: string): IPortfolio {
        return this._items[id]
    }

    //=============== CREATE PORTFOLIO ===============//
    public createPortfolio(id: string, createPortfolio: UpdatePortfolioDBType) {
        this._items[id] = {
            id,
            ...createPortfolio,
            order: this.getMaxOrder() + 1
        }
    }

    //=============== DELETE PORTFOLIO ===============//
    public deletePortfolio(id: string) {
        delete this._items[id]
    }

    //=============== UPDATE PORTFOLIO ===============//
    public updatePortfolio(id: string, updatePortfolioData: UpdatePortfolioDBType) {
        this._items[id] = {
            ...this._items[id],
            ...updatePortfolioData,
        }
    }

    //=============== GET MAX ORDER ===============//
    private getMaxOrder(): number {
        // @ts-ignore
        Array.prototype.max = function() {
            return Math.max.apply(null, this);
        };
        // @ts-ignore
        return Object.values(this._items).map(({order}) => order).max()
    }

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder(changeItemsOrderPayload: ChangeItemsOrderType) {
        changeItemsOrderPayload.forEach(({id, order}) => {
            this._items[id].order = order
        })
    }
}

export const portfolioDB = new PortfolioDB();
