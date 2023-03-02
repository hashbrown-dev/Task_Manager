import { Todo } from "@workspace/todo-domain";


export class PaginationEntity {

    search: string;
    skip?: number;
    take?: number;
    status?: Todo.Status;
    page?: number;

    constructor() {
        this.search="";
        this.take=10,
        this.skip=0,
        this.page=1, 
        this.status=Todo.Status.PENDING;  
    }
}