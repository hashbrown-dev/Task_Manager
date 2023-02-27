import { Status } from "./todo.dto";

export interface CreateTodoDto {
    title: string;
    description: string;
    priority: number;
    status: Status;
    due_date: Date;
}
