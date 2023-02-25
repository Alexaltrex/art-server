export interface IMembers {
    [key: string]: IMember
}

export interface IMember {
    id: string
    order: number
    name: string
    position: string
    img: string
}

export type UpdateMemberType = Omit<IMember, "id" | "order">
