import {SliderMock} from "./SliderMock";
import {ICreateSlide, ICreateSlideDB, ISlider, ISliders, ISlides} from "../../types/slider.type";
import {ICategory} from "../../types/category.type";
import {ChangeItemsOrderType} from "../../types/portfolio.types";

class SliderDB {
    private _sliders: ISliders = SliderMock

    //=============== GET ALL ===============//
    public getAll(): ISlider[] {
        return Object.values(this._sliders)
    }

    //=============== GET SLIDER BY ID ===============//
    public getSliderById(id: string): ISlider {
        return this._sliders[id]
    }

    //=============== CREATE SLIDER ===============//
    // создается при создании категории
    public createSlider(category: ICategory): void {
        this._sliders[category.id] = {
            id: category.id,
            category: category.name,
            slides: {} as ISlides
        }
    }

    //=============== RENAME SLIDER ===============// (вызывается из сервиса категорий)
    public renameSlider(category: ICategory): void {
        this._sliders[category.id].category = category.name
    }

    //=============== DELETE SLIDER ===============// (вызывается из сервиса категорий)
    public deleteSlider(categoryId: string): void {
        delete this._sliders[categoryId]
    }

    //=============== ADD SLIDE TO SLIDER ===============//
    public addSlideToSlider(createSlide: ICreateSlideDB, categoryId: string): void {
        const slideId = createSlide.id;
        this._sliders[categoryId].slides[slideId] = {
            ...createSlide,
            order: this.getMaxOrderInSlider(categoryId) + 1
        }
    }

    //=============== DELETE SLIDE FROM SLIDER ===============//
    public deleteSlideFromSlider(sliderId: string, slideId: string): void {
        delete this._sliders[sliderId].slides[slideId]
    }

    //=============== CHANGE SLIDES ORDER ===============//
    changeSlidesOrder(categoryId: string, changeSlidesOrderPayload: ChangeItemsOrderType) {
        changeSlidesOrderPayload.forEach(({id, order}) => {
            this._sliders[categoryId].slides[id].order = order;
        })
    }

    //=============== GET MAX ORDER IN SLIDER ===============//
    private getMaxOrderInSlider(sliderId: string): number {
        // @ts-ignore
        Array.prototype.max = function () {
            return Math.max.apply(null, this);
        };
        // @ts-ignore
        return Object.values(this._sliders[sliderId].slides).map(slide => slide.order).max();
    }
}

export const sliderDB = new SliderDB();
