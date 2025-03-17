import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TasksService } from 'src/modules/tasks/services/tasks.service';

@Controller({
  path: 'tasks',
  version: '1',
})
export class TasksControllerV1 {
  constructor(private readonly taskServices: TasksService) {}

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('access-token')
  @Get()
  getAllTask() {
    return this.taskServices.getAll();
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskServices.createTasks(createTaskDto);
  }
}
