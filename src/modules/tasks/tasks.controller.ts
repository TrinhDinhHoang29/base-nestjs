import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) {}

  @Get()
  getAllTask() {
    return this.taskServices.getAll();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskServices.createTasks(createTaskDto);
  }
}
