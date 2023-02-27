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

import {
  Todo,
  PRIORITY,
  Status,
} from "../../../../../../apps/nest-api/src/entity/Todo";
import { createTodo } from '../../../../../../apps/nest-api/src/entity/createTodo'
import { TodoWebService } from "../../services/todo-web.service";
import {
  UpdateTaskEntity,
} from "apps/nest-api/src/entity/updateTodo";
import { TodoService } from "libs/todo-api/src/lib/todo/todo.service";

@Component({
  selector: 'update-task-dialog',
  templateUrl: './update-task.dialog.html',
  styleUrls: ['./update-task.dialog.scss']
})
export class UpdateTaskDialog implements OnInit {
  task: Todo;
  updatedTodo?: UpdateTaskEntity;
  form: FormGroup;

  taskStatus = Status.COMPLETED;
  priorities: string[] = [PRIORITY.LOW, PRIORITY.MED, PRIORITY.HIGH];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Todo,
    private todoServices: TodoWebService,
    fb: FormBuilder,
    private ref: MatDialogRef<UpdateTaskDialogComponent>) {
    this.task = data;
    this.form = fb.group({
      name: [this.task.name, Validators.required],
      description: [this.task.description],
      priority: [this.task.priority, Validators.required],
      dueDate: [new Date(this.task.due_date), Validators.required],
      status: [this.task.status==Status.COMPLETED, Validators.required],
    });
  }

  async markAsDone() {
      const res = await this.todoServices
        .getTodoByID(this.task.id)
        .pipe(
          map((todo) => {
            const oldStatus = todo.status;
            let newStatus;
            if (oldStatus == Status.PENDING) newStatus = Status.COMPLETED;
            else newStatus = Status.PENDING;
            this.todoServices.markAsDone(this.task.id, { status: newStatus })
          })
        )
        .subscribe();
    }

  async submit() {
    console.log(this.form.value);
    this.updatedTodo = new UpdateTaskEntity();
    this.updatedTodo.name = this.form.value.name;
    this.updatedTodo.description = this.form.value.description;
    this.updatedTodo.priority = this.form.value.priority;
    this.updatedTodo.due_date = this.form.value.dueDate;
    if(this.form.value.status){
      this.updatedTodo.status = Status.COMPLETED;
    }
    else{
      this.updatedTodo.status = Status.PENDING;
    }
    
    await this.todoServices.updateTodo(this.task.id, this.updatedTodo);
    this.ref.close();
  }
}
