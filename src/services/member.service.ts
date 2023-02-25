import {memberDB} from "../db/MemberDB/MemberDB";
import {IMember, UpdateMemberType} from "../types/members.type";
import path from "path";
import {v4 as uuidv4} from "uuid";
import fs from "fs";
import {ChangeItemsOrderType} from "../types/portfolio.types";

const url = process.env.NODE_ENV === 'development'
    ? process.env.API_URL_DEV
    : process.env.API_URL_PROD

export const memberService = {
    //=============== GET ALL ===============//
    getAll(): IMember[] {
        return memberDB.getAll();
    },

    //=============== CREATE MEMBER ===============//
    async createMember(
        createData: UpdateMemberType,
        file: Express.Multer.File | undefined
    ) {
        const id = uuidv4();
        const createMemberDB = { ...createData } as UpdateMemberType;
        await this.writeMemberImage(id, "img", file, createMemberDB);
        memberDB.create(id, createMemberDB);
    },

    //=============== UPDATE MEMBER ===============//
    async updateMember(
        id: string,
        updateData: UpdateMemberType,
        file: Express.Multer.File | undefined
    ) {
        const updateMemberDB = { ...updateData } as UpdateMemberType;

        const oldMember = memberDB.getById(id);
        await this.writeMemberImage(id, "img", file, updateMemberDB, oldMember.img);
        memberDB.update(id, updateMemberDB)
    },

    //=============== DELETE MEMBER ===============//
    async deleteMember(id: string) {
        // удаление изображений
        const fsPromises = fs.promises;
        await fsPromises.rm(`src/static/member/${id}/`, {recursive: true, force: true});

        // удаление из базы данных
        memberDB.delete(id);
    },

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder(changeItemsOrderPayload: ChangeItemsOrderType) {
        memberDB.changeItemsOrder(changeItemsOrderPayload);
    },

    //=============== WRITE IMAGE ===============//
    // writeMemberImage(id, "main", imgsMain, updateMemberDB);
    async writeMemberImage(
        id: string,
        type: string,
        file: Express.Multer.File | undefined,
        updateMemberDB: UpdateMemberType,
        oldName?: string
    ) {
        if (file) {
            const imgFile = file;
            const extName = path.extname(imgFile.originalname);
            const slug = uuidv4();

            const fsPromises = fs.promises;

            // удаление старого файла (если задано oldName)
            // oldName = `${url}/member/0/main.jpg`
            if (oldName) {
                const oldBasename = path.basename(oldName); // main.jpg
                await fsPromises.unlink(`src/static/member/${id}/${oldBasename}`)
            }

            // если нет oldName, значит создание нового - надо создать директорию
            if (!oldName) {
                const path = `src/static/member/${id}/`;
                try {
                    await fsPromises.access(path);
                } catch (a: any) {
                    await fsPromises.mkdir(path);
                }
            }

            // сохранение нового файла (с новым именем) на сервер
            await fsPromises.writeFile(
                `src/static/member/${id}/${type}${slug}${extName}`,
                imgFile.buffer,
            );



            // сохранение пути к новому файлу в БД
            // @ts-ignore
            updateMemberDB.img = `${url}/member/${id}/${type}${slug}${extName}`
        }
    },
}
