import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  DeleteResult,
  DeepPartial,
} from 'typeorm';
import { BaseEntity } from 'src/base/base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepositoryAbstract<T extends BaseEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async create(dto: DeepPartial<T>): Promise<T> {
    return await this.repository.save(dto);
  }

  async findOneById(id: string): Promise<T | null> {
    return await this.repository.findOneBy({ id } as any);
  }

  async findOneByCondition(option: FindOneOptions<T>): Promise<T | null> {
    return await this.repository.findOne(option);
  }

  async findAll(option?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(option);
  }

  async update(id: string, dto: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, dto);
    return await this.findOneById(id);
  }

  async softDelete(id: string): Promise<boolean> {
    const object = new Object({ deleted: false }) as QueryDeepPartialEntity<T>;
    const result = await this.repository.update(id, object);
    return !!result.affected;
  }

  async permanentlyDelete(id: string): Promise<boolean> {
    const result: DeleteResult = await this.repository.delete(id);
    return !!result.affected;
  }
}
