import { FindManyOptions, FindOneOptions } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(dto: T | any): Promise<T>;
  findOneById(id: string): Promise<T | null>;
  findOneByCondition(option: FindOneOptions<T>): Promise<T | null>;
  findAll(option: FindManyOptions<T>): Promise<T[]>;
  update(id: string, dto: T | any): Promise<T | null>;
  softDelete(id: string): Promise<boolean>;
  permanentlyDelete(id: string): Promise<boolean>;
}
