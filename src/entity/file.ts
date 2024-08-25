import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group";
import { User } from "./user";

@Entity("files")
export class File {
    @PrimaryGeneratedColumn()
    id: number;

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