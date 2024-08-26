import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { GenericEntity } from "../entity/generic.entity";
import { NotFoundException } from "../errors/notfound.exception";

// We extend the Generic entity so we know all entities have the Id
// Done for the findById method that was not matching correctly without this
export abstract class BaseService<T extends GenericEntity> {
    protected constructor(protected repository: Repository<T>) { }

    async create(entityLike: Partial<T>): Promise<T> {
        // DeepPartial to ensure compatibility with repository.create
        const entity = this.repository.create(entityLike as DeepPartial<T>);
        return this.repository.save(entity);
    }

    async findById(id: number): Promise<T | null> {
        const where: FindOptionsWhere<T> = { id } as FindOptionsWhere<T>;
        return this.repository.findOne({ where });
    }

    async findAll(): Promise<T[]> {
        return this.repository.find();
    }

    async update(id: number, entityLike: Partial<T>): Promise<T | null> {
        const entity = await this.findById(id);

        if (!entity) {
            throw new NotFoundException("No entity found");
        }

        Object.assign(entity, entityLike);
        return this.repository.save(entity);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected ? result.affected > 0 : false;
    }
}