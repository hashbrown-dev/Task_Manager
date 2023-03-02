import { Component, OnInit, Input, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from "@angular/forms";
import { Observable } from "rxjs/internal/Observable";
import { ActivatedRoute, Router } from "@angular/router";
import { firstValueFrom, map } from "rxjs";

// import {
//   Todo,
//   Todo.Priority,
//   Todo.Status,
// } from "../../../../../../apps/nest-api/src/entity/Todo";
// import { createTodo } from '../../../../../../apps/nest-api/src/entity/createTodo'
import { TodoWebService } from "../../services/todo-web.service";
import { Todo } from "@workspace/todo-domain";
// import {
//   UpdateTaskEntity,
// } from "apps/nest-api/src/entity/updateTodo";
// import { TodoService } from "libs/todo-api/src/lib/todo/todo.service";

@Component({
  selector: 'add-task-dialog',
  templateUrl: './add-task.dialog.html',
  styleUrls: ['./add-task.dialog.scss']
})

export class AddTaskDialog {
  createTodo!: Todo.TodoDto;

  constructor(
    private todoServices: TodoWebService,
    private fb: FormBuilder,
    private ref: MatDialogRef<AddTaskDialog>) {}

  selectedPriority!: string;
  priorities: string[] = [Todo.Priority.LOW, Todo.Priority.MED, Todo.Priority.HIGH];

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: [null],
    due_date: [Date || null],
    status: [null],
  });

  async createNewTodo() {
      this.createTodo.title = this.form.value.title;
      this.createTodo.description = this.form.value.description || '';
      this.createTodo.priority = this.form.value.priority || Todo.Status.PENDING;
      this.createTodo.due_date = this.form.value.due_date;
      this.createTodo.status = this.form.value.status ? Todo.Status.COMPLETED : Todo.Status.PENDING;
      // if(this.form.value.status){
      //   this.createTodo.status = Todo.Status.COMPLETED;
      // }
      // else{
      //   this.createTodo.status = Todo.Status.PENDING;
      // }
      
      await this.todoServices.createTodo(this.createTodo);
      this.ref.close();
      console.log('create task')
  }

}


