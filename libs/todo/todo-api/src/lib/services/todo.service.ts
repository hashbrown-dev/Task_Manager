import { Inject } from '@angular/core';
import { Injectable, HttpException } from '@nestjs/common';
import { getManager } from 'typeorm';

import { Todo, Status } from "../../../../../apps/nest-api/src/entity/Todo";
import { createTodo } from 'apps/nest-api/src/entity/createTodo';
import { UpdateStatusEntity, UpdateTaskEntity } from "../../../../../apps/nest-api/src/entity/updateTodo";
import { PaginationDTO } from 'apps/nest-api/src/entity/paginationDTO';
import { skip, take } from 'rxjs';

@Injectable()
export class TodoService {

    private todo!: Todo[];

    constructor(){}

    async getAllTodos(): Promise<Todo[]> {
        this.todo = await Todo.find();
        return this.todo;
      }

      // async getAllTodos(page:number, limit: number): Promise<Todo[]> {
      //   this.todo = await Todo.find({
      //     take: limit,
      //     skip: limit * page
      //   });
      //   return this.todo;
      // }

    async getTodoById(id: number): Promise<Todo | undefined> {
      return await Todo.findOne(id);
    }

    async getPendingTodos(status: string): Promise<Todo[]> {
      const todo = await Todo.find({
        where: { status: status},
       take: 7
      });
      return todo;
    }
    
    async getCompletedTodos(status: string): Promise<Todo[]> {
      const todo = await Todo.find({
        where: { status: status},
        take: 7
      });
      // const todo = await getManager().createQueryBuilder(Todo, "pendingTodo").where('pendingTodo.status = :status', {status}).getMany();
      return todo;
    }

    async createTodo(todo: Todo): Promise<Todo> {
      return await Todo.save(todo);
    }

    async queryTodoParams(paginator: PaginationDTO): Promise<[Todo[], number]> {
      console.log("Inside the backend service method");
      
      let query = Todo.createQueryBuilder().select("todo").from(Todo, "todo").where(`todo.status = '${paginator.status}'`).andWhere('todo.name LIKE :search',{search: `%${paginator.search}%`});
      
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

    async updateTodo(id: number, payload: UpdateTaskEntity): Promise<Todo | undefined> {
      const todo = await Todo.findOne(id);
      if (todo === undefined) {
        throw new HttpException(
          "The task was not found in the database!",
          404
        );
      }
      try {
        todo.name = payload.name;
        todo.description = payload.description;
        todo.status = payload.status;
        todo.due_date = new Date(payload.due_date);
        todo.updated_date = new Date();
        todo.priority =payload.priority;
        const updatedTodo: Todo = await Todo.save(todo);
        return updatedTodo;
      } 
      catch (error) {
        throw new HttpException(`Sorry! An error occurred: ${error}`, 1000);
      }
    }

    async markAsDone(id: number, payload: UpdateStatusEntity): Promise<Todo> {
      const todo = await Todo.findOne(id);
      if (todo === undefined) {
        throw new HttpException(
          "The task was not found in the database!",
          404
        );
      }
      try {
        todo.status = payload.status;
        todo.updated_date = new Date();
        const updatedTodo: Todo = await Todo.save(todo);
        return updatedTodo;
      } 
      catch (error) {
        throw new HttpException(`Sorry! An error occurred: ${error}`, 1000);
      }
    }

    deleteTodoById(id: number): void {
      Todo.delete(id)
    }

}
