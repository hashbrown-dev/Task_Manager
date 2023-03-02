export enum Status {
    PENDING = "Pending",
    COMPLETED = "Completed"
}

export enum Priority {
    LOW = "Low",
    MED = "Medium",
    HIGH = "High"
}

export interface TodoDto {
    id: string;
    title: string;
    description?: string;
    priority: Priority;
    status: Status;
    created_date: Date;
    due_date?: Date;
    updated_date?: Date;
}
