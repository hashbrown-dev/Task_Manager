import { Module } from '@nestjs/common';
import { TodoService } from './services/todo.service';
import { TodoController } from './controllers/todo.controller';

@Module({
  imports: [],
  providers: [TodoService],
  controllers: [TodoController]
})

export class TodoModule {
  
}
