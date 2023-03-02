import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { Todo } from "@workspace/todo-domain";
import { UpdateStatusDto, UpdateTodoDto } from "libs/todo/todo-domain/src/lib/model";
import { TodoEntity } from "../entity";

// import { Status, Todo } from "../../../../../apps/nest-api/src/entity/Todo";
// import { UpdateStatusEntity, UpdateTaskEntity } from "../../../../../apps/nest-api/src/entity/updateTodo";
import { TodoService } from "../services/todo.service";

@Controller('todo')
export class TodoController {

    constructor(private todoServices: TodoService){}

    @Get()
    findAll(): Promise<Todo.TodoDto[]> {
      return this.todoServices.getAllTodos();
    }

    @Get("getTodoById/:id")
    findTodo(@Param("id") id: string): Promise<Todo.TodoDto> {
      return this.todoServices.getTodoById(id);
    }

    @Get("getPending/:pending")
    getPendingTodos(@Param("pending") pending: Todo.Status): Promise<Todo.TodoDto[]> {
      return this.todoServices.getPendingTodos(pending);
    }

    @Get("getCompleted/:completed")
    getCompletedTodos(@Param("completed") completed: string): Promise<Todo.TodoDto[]> {
      return this.todoServices.getCompletedTodos(completed);
    }

    @Post("createTodo/")
    createTodo(@Body() newTodo: TodoEntity): Promise<Todo.TodoDto> {
      return this.todoServices.createTodo(newTodo);
    }

    @Post("queryTodoParams")
    async queryTodoParams(@Body() paginator: Todo.PaginationDto): Promise<[Todo.TodoDto[], number]> {
      console.log("Reached in fulltext search controller");
      const todo = await this.todoServices.queryTodoParams(paginator);
      return todo;
    }

    @Put("markAsDone/:id")
    markAsDone(@Param("id") id: string, @Body() payload: UpdateStatusDto): void {
      const todo = this.todoServices.markAsDone(id, payload);
    }
    
    @Put("updateTodo/:id")
    async updateTodo(@Param("id") id: string, @Body() payload: UpdateTodoDto): Promise<void> {
      const todo = await this.todoServices.updateTodo(id, payload);
    }

    @Delete("removeTodo/:id")
    deleteTodo(@Param("id") id: string): void {
      const deleteTodo = this.todoServices.deleteTodoById(id);
    }

    // @Get("getPending/:pending")
    // getPendingTodos(@Param("pending") pending: string): Promise<Todo[]> {
    //   const todos = this.todoServices.getPendingTodos(pending);
    //   return todos;
    // }

}
