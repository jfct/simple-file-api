import { Group } from "../entity/group.entity";

export interface ResponseGroupDto extends Omit<Group, 'id' | 'files'> { }
