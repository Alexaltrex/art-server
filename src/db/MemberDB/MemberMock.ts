import {IMembers} from "../../types/members.type";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD

export const memberMock: IMembers = {
    "1": {
        id: "1",
        order: 1,
        name: "Anatoliy Demyanchuk 1",
        position: "Art Director 1",
        img: `${url}/member/1/img.jpg`,
    },
    "2": {
        id: "2",
        order: 2,
        name: "Anatoliy Demyanchuk 2",
        position: "Art Director 2",
        img: `${url}/member/2/img.jpg`,
    },
    "3": {
        id: "3",
        order: 3,
        name: "Anatoliy Demyanchuk 3",
        position: "Art Director 3",
        img: `${url}/member/3/img.jpg`,
    },
    "4": {
        id: "4",
        order: 4,
        name: "Anatoliy Demyanchuk 4",
        position: "Art Director 4",
        img: `${url}/member/4/img.jpg`,
    },
    "5": {
        id: "5",
        order: 5,
        name: "Anatoliy Demyanchuk 5",
        position: "Art Director 5",
        img: `${url}/member/5/img.jpg`,
    },
    "6": {
        id: "6",
        order: 6,
        name: "Anatoliy Demyanchuk 6",
        position: "Art Director 6",
        img: `${url}/member/6/img.jpg`,
    },
}
