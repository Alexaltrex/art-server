import {IMember, IMembers, UpdateMemberType} from "../../types/members.type";
import {memberMock} from "./MemberMock";
import {ChangeItemsOrderType} from "../../types/portfolio.types";

class MemberDB {
    private _members: IMembers = memberMock

    //=============== GET ALL ===============//
    public getAll(): IMember[] {
        return Object.values(this._members)
    }

    //=============== GET BY ID ===============//
    public getById(id: string): IMember {
        return this._members[id]
    }

    //=============== CREATE MEMBER ===============//
    public create(id: string, createData: UpdateMemberType) {
        this._members[id] = {
            id,
            ...createData,
            order: this.getMaxOrder() + 1
        }
    }

    //=============== DELETE MEMBER ===============//
    public delete(id: string) {
        delete this._members[id]
    }

    //=============== UPDATE MEMBER ===============//
    public update(id: string, updateData: UpdateMemberType) {
        this._members[id] = {
            ...this._members[id],
            ...updateData,
        }
    }

    //=============== CHANGE ITEMS ORDER ===============//
    changeItemsOrder(changeItemsOrderPayload: ChangeItemsOrderType) {
        changeItemsOrderPayload.forEach(({id, order}) => {
            this._members[id].order = order
        })
    }

    //=============== GET MAX ORDER ===============//
    private getMaxOrder(): number {
        // @ts-ignore
        Array.prototype.max = function () {
            return Math.max.apply(null, this);
        };
        // @ts-ignore
        return Object.values(this._members).map(({order}) => order).max()
    }

}

export const memberDB = new MemberDB();
