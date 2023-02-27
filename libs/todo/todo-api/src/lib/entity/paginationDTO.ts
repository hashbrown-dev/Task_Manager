

export class PaginationDTOs {

    search: string;
    skip?: number;
    take?: number;
    status?: TodoModel Status;
    page?: number;

    constructor() {
        this.search="";
        this.take=10,
        this.skip=0,
        this.page=1, 
        this.status=Status.PENDING;  
    }
}