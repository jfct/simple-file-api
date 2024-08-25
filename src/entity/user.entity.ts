import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { File } from "./file.entity";
import { GenericEntity } from "./generic.entity";
import { Group } from "./group.entity";

@Entity("users")
export class User extends GenericEntity {
    @Column()
    name: string;

    @ManyToMany(() => Group, group => group.users)
    @JoinTable({
        name: "group_users",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "group_id",
            referencedColumnName: "id"
        }
    })
    groups: Group[];

    @ManyToMany(() => File, file => file.users)
    @JoinTable({
        name: "file_users",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "file_id",
            referencedColumnName: "id"
        }
    })
    files: File[];
}