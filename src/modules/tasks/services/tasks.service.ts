import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryAbstract } from 'src/base/base.abstract.repository';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService extends BaseRepositoryAbstract<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {
    super(taskRepository);
  }
  createTasks(createTaskDto: CreateTaskDto): TaskEntity {
    const newTaskEntity = new TaskEntity(createTaskDto);
    const result = this.taskRepository.create(newTaskEntity);
    return result;
  }
  async getAll(): Promise<TaskEntity[]> {
    return await this.findAll({
      where: {
        deleted: false,
      },
    });
  }
}
