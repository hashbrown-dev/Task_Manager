import { Status } from "./todo.dto";

export interface UpdateTodoDto {
    title: string;
    description: string;
    priority: number;
    status: Status;
}
