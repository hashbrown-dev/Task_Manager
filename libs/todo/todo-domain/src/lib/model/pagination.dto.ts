import { Status } from "./todo.dto";

export interface PaginationDto{
search: string;
    skip?: number;
    take?: number;
    status?: Status;
    page?: number;
}