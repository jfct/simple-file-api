import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file";
import { User } from "./user";

@Entity("groups")
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @ManyToMany(() => File, file => file.groups)
    files: File[];
}