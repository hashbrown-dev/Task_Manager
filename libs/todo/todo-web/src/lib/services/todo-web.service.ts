import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable, pipe } from 'rxjs';
import { Body } from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Todo } from '@workspace/todo-domain'
// import { Todo.Status, Todo } from '../../../../../apps/nest-api/src/entity/Todo';
// import { createTodo } from '../../../../../apps/nest-api/src/entity/createTodo';
// import { UpdateStatusEntity, UpdateTaskEntity } from '../../../../../apps/nest-api/src/entity/updateTodo';
// import { PaginationDTO } from 'apps/nest-api/src/entity/paginationDTO';

@Injectable({
  providedIn: 'root'
})

export class TodoWebService {

  constructor(private http: HttpClient) { }

  private BaseURL = "http://localhost:3333/api";

  public getAllTodos(): Observable<Todo.TodoDto[]> {
    const todos = this.http.get<Todo.TodoDto[]>(this.BaseURL + "/todo", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return todos;
  }

  public getPendingTodos(pending: Todo.Status): Observable<Todo.TodoDto[]> {
    const todos = this.http.get<Todo.TodoDto[]>(this.BaseURL + `/todo/getPending/${pending}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return todos;
  }

  public getCompletedTodos(completed: Todo.Status): Observable<Todo.TodoDto[]> {
    const todos = this.http.get<Todo.TodoDto[]>(this.BaseURL + `/todo/getCompleted/${completed}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    }); 
    return todos;
  }

  public getTodoByID(id: number): Observable<Todo.TodoDto> {
    const todo = this.http.get<Todo.TodoDto>(this.BaseURL + `/todo/getTodoById/${id}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return todo;
  }

  createTodo(payload: Todo.CreateTodoDto): Observable<Todo.TodoDto> {
    const todo = this.http.post<Todo.TodoDto>(this.BaseURL + `/todo/createTodo`, payload);
    todo.subscribe();
    return todo;
  }

  async updateTodo(id: number, payload: Todo.UpdateTodoDto): Promise<void> {
    // if (payload.Todo.Status != "Completed") {
    //   payload.updated_date = new Date(0);
    // }
    const todo = this.http.put<Todo.TodoDto>(this.BaseURL + `/todo/updateTodo/${id}`, payload);
    await firstValueFrom(todo);
  }

  async markAsDone(id: number, payload: Todo.UpdateStatusDto) {
    return await firstValueFrom(this.http.put(this.BaseURL + `/todo/markAsDone/${id}`, payload));
  }

  async deleteTodo(id: number) {
    return await firstValueFrom(this.http.delete(this.BaseURL + `/todo/removeTodo/${id}`));
  }

  async queryTodoParams(queryParams: Todo.TodoDto): Promise<[Todo.TodoDto[], number]> {
    console.log("Query P in web-services", queryParams);
    const todos = await firstValueFrom(
      this.http.post<[Todo.TodoDto[], number]>(this.BaseURL + `/todo/queryTodoParams`, queryParams, 
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }) 
      );
    return todos;
  }

  public getPendingTodos1(pending: Todo.Status): Observable<Todo.TodoDto[]> {
    const todos = this.http.get<Todo.TodoDto[]>(this.BaseURL + `/todo/getPending/${pending}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  // }).pipe(map((res: any) => <Todo.Todo[]><unknown>res.Json()));
    // console.log("Printing Todo from get Pending service");
    // console.log(todos);
    return todos;
  }

}
