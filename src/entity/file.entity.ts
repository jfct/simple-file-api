import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { Group } from "./group.entity";

@Entity("files")
export class File extends GenericEntity {
    @Column({
        unique: true
    })
    name: string;

    @Column()
    risk: number;

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