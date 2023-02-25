import {IPortfolios} from "../../types/portfolio.types";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD

export const portfolioMock: IPortfolios = {
    "1": {
        id: "1",
        order: 1,
        name: "Airmask 1",
        year: "2022",
        category: {
            id: "0",
            name: "Category 0",
        },
        tag: "Tag 1",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/1/img.png`,
    },
    "2": {
        id: "2",
        order: 2,
        name: "Airmask 2",
        year: "2022",
        category: {
            id: "0",
            name: "Category 0",
        },
        tag: "Tag 2",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/2/img.png`,
    },
    "3": {
        id: "3",
        order: 3,
        name: "Airmask 3",
        year: "2022",
        category: {
            id: "0",
            name: "Category 0",
        },
        tag: "Tag 3",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/3/img.png`,
    },
    "4": {
        id: "4",
        order: 4,
        name: "Airmask 4",
        year: "2022",
        category: {
            id: "0",
            name: "Category 0",
        },
        tag: "Tag 4",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/4/img.png`,
    },
    "5": {
        id: "5",
        order: 5,
        name: "Airmask 5",
        year: "2022",
        category: {
            id: "0",
            name: "Category 0",
        },
        tag: "Tag 5",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/5/img.png`,
    },
    "6": {
        id: "6",
        order: 6,
        name: "Airmask 6",
        year: "2022",
        category: {
            id: "1",
            name: "Category 1",
        },
        tag: "Tag 6",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/6/img.png`,
    },
    "7": {
        id: "7",
        order: 7,
        name: "Airmask 7",
        year: "2022",
        category: {
            id: "1",
            name: "Category 1",
        },
        tag: "Tag 7",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/7/img.png`,
    },
    "8": {
        id: "8",
        order: 8,
        name: "Airmask 8",
        year: "2022",
        category: {
            id: "1",
            name: "Category 1",
        },
        tag: "Tag 8",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/8/img.png`,
    },
    "9": {
        id: "9",
        order: 9,
        name: "Airmask 9",
        year: "2022",
        category: {
            id: "1",
            name: "Category 1",
        },
        tag: "Tag 9",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/9/img.png`,
    },
    "10": {
        id: "10",
        order: 10,
        name: "Airmask 10",
        year: "2022",
        category: {
            id: "1",
            name: "Category 1",
        },
        tag: "Tag 10",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/10/img.png`,
    },
    "11": {
        id: "11",
        order: 11,
        name: "Airmask 11",
        year: "2022",
        category: {
            id: "2",
            name: "Category 2",
        },
        tag: "Tag 11",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/11/img.png`,
    },
    "12": {
        id: "12",
        order: 12,
        name: "Airmask 12",
        year: "2022",
        category: {
            id: "2",
            name: "Category 2",
        },
        tag: "Tag 12",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/12/img.png`,
    },
    "13": {
        id: "13",
        order: 13,
        name: "Airmask 13",
        year: "2022",
        category: {
            id: "2",
            name: "Category 2",
        },
        tag: "Tag 13",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/13/img.png`,
    },
    "14": {
        id: "14",
        order: 14,
        name: "Airmask 14",
        year: "2022",
        category: {
            id: "2",
            name: "Category 2",
        },
        tag: "Tag 14",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/14/img.png`,
    },
    "15": {
        id: "15",
        order: 15,
        name: "Airmask 15",
        year: "2022",
        category: {
            id: "2",
            name: "Category 2",
        },
        tag: "Tag 15",
        url: "https://www.behance.net/gallery/147201249/Jigen-Hypebeast-Crypto-Nft-Metaverse",
        img: `${url}/portfolio/15/img.png`,
    },
}