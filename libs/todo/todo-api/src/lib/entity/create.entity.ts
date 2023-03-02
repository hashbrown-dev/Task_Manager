import { Todo } from "@workspace/todo-domain"

export class createTodo {
    
  name!: string
  description!: string
  status!: Todo.Status
  priority!: Todo.Priority
  due_date!: Date

  // constructor() {
  //   this.name = "";
  //   this.description = "";
  //   this.priority = PRIORITY.LOW;
  //   this.due_date = new Date();
  //   this.status = Status.PENDING;
  // }
}
