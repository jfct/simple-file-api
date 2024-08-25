import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file";
import { Group } from "./group";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

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