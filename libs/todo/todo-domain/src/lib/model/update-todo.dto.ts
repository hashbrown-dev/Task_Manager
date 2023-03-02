import { Status, Priority } from "./todo.dto";

export interface UpdateTodoDto {
    title?: string;
    description?: string;
    priority?: Priority;
    status?: Status;
    due_date: Date | null;
}
