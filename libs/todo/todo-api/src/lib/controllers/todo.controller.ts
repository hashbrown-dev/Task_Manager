import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

import { Status, Todo } from "../../../../../apps/nest-api/src/entity/Todo";
import { UpdateStatusEntity, UpdateTaskEntity } from "../../../../../apps/nest-api/src/entity/updateTodo";
import { TodoService } from "../services/todo.service";

@Controller('todo')
export class TodoController {

    constructor(private todoServices: TodoService){}

    @Get()
    findAll(): Promise<Todo[]> {
      const todos = this.todoServices.getAllTodos();
      return todos;
    }

    @Get("getTodoById/:id")
    findTodo(@Param("id") id: number): Promise<Todo> {
      const todo = this.todoServices.getTodoById(id);
      return todo;
    }

    @Get("getPending/:pending")
    getPendingTodos(@Param("pending") pending: string): Promise<Todo[]> {
      const todos = this.todoServices.getPendingTodos(pending);
      return todos;
    }

    @Get("getCompleted/:completed")
    getCompletedTodos(@Param("completed") completed: string): Promise<Todo[]> {
      const todos = this.todoServices.getCompletedTodos(completed);
      return todos;
    }

    @Post("createTodo/")
    createTodo(@Body() newTodo: Todo): Promise<Todo> {
      console.log("Inside create controller");
      const todo = this.todoServices.createTodo(newTodo);
      return todo;
    }

    @Post("queryTodoParams")
    async queryTodoParams(@Body() paginator: PaginationDTO): Promise<[Todo[], number]> {
      console.log("Reached in fulltext search controller");
      const todo = await this.todoServices.queryTodoParams(paginator);
      return todo;
    }

    @Put("markAsDone/:id")
    markAsDone(@Param("id") id: number, @Body() payload: UpdateStatusEntity): void {
      const todo = this.todoServices.markAsDone(id, payload);
    }
    
    @Put("updateTodo/:id")
    async updateTodo(@Param("id") id: number, @Body() payload: UpdateTaskEntity): Promise<void> {
      const todo = await this.todoServices.updateTodo(id, payload);
    }

    @Delete("removeTodo/:id")
    deleteTodo(@Param("id") id: number): void {
      const deleteTodo = this.todoServices.deleteTodoById(id);
    }

    // @Get("getPending/:pending")
    // getPendingTodos(@Param("pending") pending: string): Promise<Todo[]> {
    //   const todos = this.todoServices.getPendingTodos(pending);
    //   return todos;
    // }

}
