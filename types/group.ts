import { GroupMember } from "./groupmember";

export type Group = {
    groupName: string,
    groupCode: string,
    description: string,
    monthlyContribution: number,
    dueDate: string,
    totalAmount: number,
    id: string,
    groupmember: GroupMember[]
}