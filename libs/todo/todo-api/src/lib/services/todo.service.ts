import { Inject } from '@angular/core';
import { Injectable, HttpException } from '@nestjs/common';
import { getManager } from 'typeorm';
// import { skip, take } from 'rxjs';
import { Todo } from '@workspace/todo-domain';
import { TodoEntity } from '../entity';

@Injectable()
export class TodoService {

    private todo!: Todo.TodoDto[];

    constructor(){}

    async getAllTodos(): Promise<Todo.TodoDto[]> {
        this.todo = await TodoEntity.find();
        return this.todo;
      }

      // async getAllTodos(page:number, limit: number): Promise<Todo[]> {
      //   this.todo = await Todo.find({
      //     take: limit,
      //     skip: limit * page
      //   });
      //   return this.todo;
      // }

    async getTodoById(id: string): Promise<Todo.TodoDto | undefined> {
      return await TodoEntity.findOne(id);
    }

    async getPendingTodos(status: Todo.Status): Promise<Todo.TodoDto[]> {
      const todo = await TodoEntity.find({
        where: { status: status},
       take: 7
      });
      return todo;
    }
    
    async getCompletedTodos(status: string): Promise<Todo.TodoDto[]> {
      const todo = await TodoEntity.find({
        where: { status: status},
        take: 7
      });
      // const todo = await getManager().createQueryBuilder(Todo, "pendingTodo").where('pendingTodo.status = :status', {status}).getMany();
      return todo;
    }

    async createTodo(todo: TodoEntity): Promise<any> {
      return await TodoEntity.save(todo);
    }

    async queryTodoParams(paginator: Todo.PaginationDto): Promise<[Todo.TodoDto[], number]> {
      console.log("Inside the backend service method");
      
      let query = TodoEntity.createQueryBuilder().select("todo").from(TodoEntity, "todo").where(`todo.status = '${paginator.status}'`).andWhere('todo.name LIKE :search',{search: `%${paginator.search}%`});
      
      // query = await query.select();
      // query =query.where("todo.status = '${paginator.status}'");
      // let query = Todo.createQueryBuilder("todo");
  
      // query = await query.select();
      // query = query.where(
      //   `status = '${paginator.status}' and (name LIKE  '%${paginator.search}%' or MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE))`
      // );
      
      // if (paginator.status === Status.PENDING) {
      //   query = query.where(
      //     `status = '${paginator.status}' and (name LIKE  '%${paginator.search}%' or MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE))`
      //   );
      // }
      // if (paginator.status === Status.COMPLETED) {
      //   query
      //     .where(`title LIKE  '%${paginator.search}%' `)
      //     .orWhere(
      //       `MATCH(description) AGAINST ('${paginator.search}' IN BOOLEAN MODE)`
      //     );
      // }     
      
      const todos = await query        
        // .orderBy("id", "DESC")
        .take(paginator.take)
        .skip(paginator.skip)
        .getManyAndCount();

      if(todos[1]==0) console.log("No match found");
      if(todos[1]!=0) todos[1]=Math.round(todos[1]/203); 
      console.log("Printing count",todos[1]);
      console.log(query.getSql());
      console.log('todos from backend',todos);
      return todos;
    }

    async updateTodo(id: string, payload: Todo.UpdateTodoDto): Promise<Todo.UpdateTodoDto | undefined> {
      const todo = await TodoEntity.findOne(id);
      if (todo === undefined) {
        throw new HttpException(
          "The task was not found in the database!",
          404
        );
      }
      try {
        todo.title = payload.title;
        todo.description = payload.description;
        todo.status = payload.status;
        todo.due_date = new Date(payload.due_date);
        todo.updated_date = new Date();
        todo.priority =payload.priority;
        return await TodoEntity.save(todo);
      } 
      catch (error) {
        throw new HttpException(`Sorry! An error occurred: ${error}`, 1000);
      }
    }

    async markAsDone(id: string, payload: Todo.UpdateStatusDto): Promise<Todo.TodoDto> {
      const todo = await TodoEntity.findOne(id);
      if (todo === undefined) {
        throw new HttpException(
          "The task was not found in the database!",
          404
        );
      }
      try {
        todo.status = payload.status;
        todo.updated_date = new Date();
        return await TodoEntity.save(todo);
      } 
      catch (error) {
        throw new HttpException(`Sorry! An error occurred: ${error}`, 1000);
      }
    }

    deleteTodoById(id: string): void {
      TodoEntity.delete(id)
    }

}
