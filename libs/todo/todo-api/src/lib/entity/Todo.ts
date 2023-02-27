import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn} from "typeorm"; 

@Entity()
export class Todo extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id!: number;

    @Column()
    name!: string;

    @Column({
        type: 'varchar',
        length: 500
    })
    description!: string;
    
    @Column({
        type: 'enum',
        enum: PRIORITY,
        default: PRIORITY.LOW
    })
    priority!: PRIORITY;

    @Column({
        type: 'enum',
        enum: Status,
        default: Status.PENDING,
    })
    status!: Status;

    @CreateDateColumn()
    created_date!: Date;

    @Column()
    due_date!: Date;

    @UpdateDateColumn()
    updated_date!: Date;

}