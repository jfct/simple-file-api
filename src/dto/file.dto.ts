import { File } from "../entity/file.entity";


export interface CreateFileDto extends Omit<File, 'id'> { };

export interface ResponseFileDto extends Omit<File, 'id' | 'users' | 'groups'> {
    groups: number[],
    users: number[]
}

export interface ResponseTopShared {
    name: string,
    risk: number
    users: string[]
}