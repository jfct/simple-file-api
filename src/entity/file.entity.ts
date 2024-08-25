import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { GenericEntity } from "./base.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity("files")
export class File extends GenericEntity {
    @Column()
    name: string;

    @Column()
    risk: number;

    @ManyToMany(() => User, user => user.files)
    users: User[];

    @ManyToMany(() => Group, group => group.files)
    @JoinTable({
        name: "file_groups",
        joinColumn: {
            name: "file_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "group_id",
            referencedColumnName: "id"
        }
    })
    groups: Group[];
}