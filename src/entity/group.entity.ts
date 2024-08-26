import { Column, Entity, ManyToMany } from "typeorm";
import { File } from "./file.entity";
import { GenericEntity } from "./generic.entity";
import { User } from "./user.entity";

@Entity("groups")
export class Group extends GenericEntity {
    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @ManyToMany(() => File, file => file.groups)
    files: File[];
}