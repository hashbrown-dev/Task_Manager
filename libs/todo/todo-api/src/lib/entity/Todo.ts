import { Todo } from "@workspace/todo-domain";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity()
export class TodoEntity extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id!: string;

    @Column()
    title!: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    description?: string;
    
    @Column({
        type: 'enum',
        enum: Todo.Priority,
        // default: Todo.Priority.LOW
    })
    priority!: Todo.Priority;

    @Column({
        type: 'enum',
        enum: Todo.Status,
        // default: Todo.Status.PENDING,
    })
    status!: Todo.Status;

    @CreateDateColumn()
    created_date!: Date;

    @Column({
        // type: 'date',
        nullable: true
    })
    due_date: Date | null;

    @UpdateDateColumn({
        // type: 'date',
        nullable: true
    })
    updated_date: Date | null;

}