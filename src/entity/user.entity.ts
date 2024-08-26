import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { GenericEntity } from "./generic.entity";
import { Group } from "./group.entity";

@Entity("users")
export class User extends GenericEntity {
    @Column({ unique: true })
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
}