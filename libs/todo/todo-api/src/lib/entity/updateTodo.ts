import { Status, PRIORITY } from './Todo';

export class UpdateStatusEntity {
  status!: Status;
}

export class UpdateTaskEntity {
  name: string;
  description: string;
  priority: PRIORITY;
  due_date: Date;
  status!: Status;

  constructor() {
    this.name = "";
    this.description = "";
    this.priority = PRIORITY.LOW;
    this.due_date = new Date();
    this.status = Status.PENDING;
  }
}