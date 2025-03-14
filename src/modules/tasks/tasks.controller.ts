import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) {}

  @Get()
  async getAllTask() {
    return await this.taskServices.getAll();
  }
  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskServices.createTasks(createTaskDto);
  }
}
