import { Status, PRIORITY } from './Todo';

export class createTodo {
    
  name!: string
  description!: string
  status!: Status
  priority!: PRIORITY
  due_date!: Date

  // constructor() {
  //   this.name = "";
  //   this.description = "";
  //   this.priority = PRIORITY.LOW;
  //   this.due_date = new Date();
  //   this.status = Status.PENDING;
  // }
}
