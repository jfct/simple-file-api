import { Column, Entity, ManyToMany } from "typeorm";
import { GenericEntity } from "./base.entity";
import { File } from "./file.entity";
import { User } from "./user.entity";

@Entity("groups")
export class Group extends GenericEntity {
    @Column()
    name: string;

    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @ManyToMany(() => File, file => file.groups)
    files: File[];
}