import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TasksService } from 'src/modules/tasks/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskServices: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  getAllTask() {
    return this.taskServices.getAll();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskServices.createTasks(createTaskDto);
  }
}
