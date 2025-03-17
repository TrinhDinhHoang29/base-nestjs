import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { TasksControllerV1 } from './controllers/v1/tasks.controller';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TasksService],
  controllers: [TasksControllerV1],
})
export class TasksModule {}
