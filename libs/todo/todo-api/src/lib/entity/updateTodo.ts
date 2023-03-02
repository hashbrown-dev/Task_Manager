import { Todo } from "@workspace/todo-domain";


export class UpdateStatusEntity {
  status!: Todo.Status;
}

export class UpdateTaskEntity {
  name: string;
  description: string;
  priority: Todo.Priority;
  due_date: Date;
  status!: Todo.Status;

  constructor() {
    this.name = "";
    this.description = "";
    this.priority = Todo.Priority.LOW;
    this.due_date = new Date();
    this.status = Todo.Status.PENDING;
  }
}