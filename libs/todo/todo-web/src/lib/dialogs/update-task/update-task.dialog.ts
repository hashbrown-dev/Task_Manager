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
//   PRIORITY,
//   Status,
// } from "../../../../../../apps/nest-api/src/entity/Todo";
// import { createTodo } from '../../../../../../apps/nest-api/src/entity/createTodo'
import { TodoWebService } from "../../services/todo-web.service";
// import {
//   UpdateTaskEntity,
// } from "apps/nest-api/src/entity/updateTodo";
// import { TodoService } from "libs/todo-api/src/lib/todo/todo.service";
import { Todo } from "@workspace/todo-domain";

@Component({
  selector: 'update-task-dialog',
  templateUrl: './update-task.dialog.html',
  styleUrls: ['./update-task.dialog.scss']
})
export class UpdateTaskDialog{
  task: Todo.TodoDto;
  updatedTodo!: Todo.UpdateTodoDto;

  taskStatus = Todo.Status.COMPLETED;
  priorities: string[] = [Todo.Priority.LOW, Todo.Priority.MED, Todo.Priority.HIGH];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: Todo.TodoDto,
    private todoServices: TodoWebService,
    private fb: FormBuilder,
    private ref: MatDialogRef<UpdateTaskDialog>) {
    this.task = data;
  }

  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: [''],
    due_date: [Date || null],
    status: [''],
  });

  async markAsDone() {
      const res = await this.todoServices
        .getTodoByID(this.task.id)
        .pipe(
          map((todo) => {
            const oldStatus = todo.status;
            let newStatus;
            if (oldStatus == Todo.Status.PENDING) newStatus = Todo.Status.COMPLETED;
            else newStatus = Todo.Status.PENDING;
            this.todoServices.markAsDone(this.task.id, { status: newStatus })
          })
        )
        .subscribe();
    }

  async submit() {
    console.log(this.form.value);
    if(this.updatedTodo?.title!=this.form.value.title) this.updatedTodo.title = this.form.value.name;
    if(this.updatedTodo?.description!=this.form.value.description) this.updatedTodo.description = this.form.value.description;
    if(this.updatedTodo?.priority!=this.form.value.priority) this.updatedTodo.priority = this.form.value.priority;
    if(this.updatedTodo?.due_date!=this.form.value.due_date) this.updatedTodo.due_date = this.form.value.due_date;
    if(this.form.value.status){
      this.updatedTodo.status = Todo.Status.COMPLETED;
    }
    else{
      this.updatedTodo.status = Todo.Status.PENDING;
    }
    
    await this.todoServices.updateTodo(this.task.id, this.updatedTodo);
    this.ref.close();
  }
}
