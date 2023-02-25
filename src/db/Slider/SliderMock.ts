import {ISliders} from "../../types/slider.type";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD

export const SliderMock: ISliders = {
    "0": {
        id: "0",
        category: "Category 0",
        slides: {
            "00": {
                id: "00",
                order: 1,
                src: `${url}/slider/0/00.jpg`,
            },
            "01": {
                id: "01",
                order: 2,
                src: `${url}/slider/0/01.jpg`,
            },
            "02": {
                id: "02",
                order: 3,
                src: `${url}/slider/0/02.jpg`,
            },
            "03": {
                id: "03",
                order: 4,
                src: `${url}/slider/0/03.jpg`,
            },
        },
    },
    "1": {
        id: "1",
        category: "Category 1",
        slides: {
            "00": {
                id: "00",
                order: 1,
                src: `${url}/slider/1/00.jpg`,
            },
            "01": {
                id: "01",
                order: 2,
                src: `${url}/slider/1/01.jpg`,
            },
            "02": {
                id: "02",
                order: 3,
                src: `${url}/slider/1/02.jpg`,
            },
            "03": {
                id: "03",
                order: 4,
                src: `${url}/slider/1/03.jpg`,
            },
        },
    },
    "2": {
        id: "2",
        category: "Category 2",
        slides: {
            "00": {
                id: "00",
                order: 1,
                src: `${url}/slider/2/00.jpg`,
            },
            "01": {
                id: "01",
                order: 2,
                src: `${url}/slider/2/01.jpg`,
            },
            "02": {
                id: "02",
                order: 3,
                src: `${url}/slider/2/02.jpg`,
            },
            "03": {
                id: "03",
                order: 4,
                src: `${url}/slider/2/03.jpg`,
            },
        },
    },
}
