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
  selector: 'add-task-dialog',
  templateUrl: './add-task.dialog.html',
  styleUrls: ['./add-task.dialog.scss']
})

export class AddTaskDialog implements OnInit {
  addForm: FormGroup;
  createTodo!: Todo;

  constructor(
    private todoServices: TodoWebService,
    fb: FormBuilder,
    private ref: MatDialogRef<UpdateTaskDialogComponent>) {
    this.addForm = fb.group({
      name: [null, Validators.required],
      description: [null],
      priority: [PRIORITY.LOW, Validators.required],
      dueDate: [new Date(), Validators.required],
      status: [false, Validators.required],
    });
  }

  selectedPriority!: string;
  taskStatus = Status.COMPLETED;
  priorities: string[] = [PRIORITY.LOW, PRIORITY.MED, PRIORITY.HIGH];

  async createNewTodo() {
      console.log(this.addForm.value);
      this.createTodo = new Todo();
      this.createTodo.name = this.addForm.value.name;
      this.createTodo.description = this.addForm.value.description;
      this.createTodo.priority = this.addForm.value.priority;
      this.createTodo.due_date = this.addForm.value.dueDate;
      if(this.addForm.value.status){
        this.createTodo.status = Status.COMPLETED;
      }
      else{
        this.createTodo.status = Status.PENDING;
      }
      
      await this.todoServices.createTodo(this.createTodo);
      this.ref.close();
  }

}


