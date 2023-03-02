import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, combineLatest, map, switchMap, tap } from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {ThemePalette} from '@angular/material/core';

import { TodoWebService } from '../../services/todo-web.service';
// import { Todo.Status, Todo } from "../../../../../../apps/nest-api/src/entity/Todo";
// import { PaginationDTO } from "../../../../../../apps/nest-api/src/entity/paginationDTO";
import { UpdateTaskDialog } from '../../dialogs';
import { Todo } from '@workspace/todo-domain';

@Component({
  selector: 'workspace-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})

export class ListComponent implements AfterViewInit {

  displayedPendingColumns: string[] = ['id', 'name', 'priority', 'due_date', 'detais'];
  displayedCompletedColumns: string[] = ['name', 'priority', 'due_date', 'detais'];
  dataSource!: MatTableDataSource<Todo.TodoDto[]>;
  refresh$ = new BehaviorSubject(null);
  resultsLengthPD = 0;
  resultsLengthCM = 0;
  pageSizesOptions = [5, 10, 25, 50, 100];
  isLoadingResultsPD = false;
  isLoadingResultsCM = false;

  isTableVisible = false;
  
  paginationParametersPD!: Todo.PaginationDto;
  paginationBehaviorObjectPD$ = new BehaviorSubject<Todo.PaginationDto | null>(null);

  paginationParametersCM!: Todo.PaginationDto;
  paginationBehaviorObjectCM$ = new BehaviorSubject<Todo.PaginationDto | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  constructor(readonly todoServices: TodoWebService, 
    public dialog: MatDialog,
  ) {}

  ngAfterViewInit() {
  //  this.dataSource.paginator = this.paginator;
  }
  
  // todosPending$ = this.paginationBehaviorObjectPD$.pipe(
  //   switchMap(async (paginationParameters) => {
  //     paginationParameters.status = Todo.Status.PENDING;
  //     this.paginationParametersPD = paginationParameters;
  //     console.log(this.paginationParametersPD);
  //     const res = await this.todoServices.queryTodoParams(paginationParameters);
  //     return res;
  //   }),
  //   tap((data) => (this.resultsLengthPD = data[1])),
  //   map((data) => data[0])
  // );

  todosPending$ = combineLatest([this.paginationBehaviorObjectPD$, this.refresh$]).pipe(
    switchMap(async ([paginationParameters, refresh]) => {
      // paginationParameters!.status = Todo.Status.PENDING;
      // this.paginationParametersPD = paginationParameters!;
      // console.log(this.paginationParametersPD);
      const res = await this.todoServices.queryTodoParams(paginationParameters!);
      return res;
    }),
    tap((data) => (this.resultsLengthPD = data[1])),
    map((data) => data[0])
  );


  todosCompleted$ = combineLatest([this.paginationBehaviorObjectCM$, this.refresh$]).pipe(
    switchMap(async ([paginationParameters]) => {
      paginationParameters!.status = Todo.Status.COMPLETED;
      this.paginationParametersCM = paginationParameters!;
      console.log(this.paginationParametersCM);
      const res = await this.todoServices.queryTodoParams(paginationParameters!);
      return res;
    }),
    
    tap((data) => (this.resultsLengthCM = data[1])),
    map((data) => data[0])
  );

  searchTodo(searchTodoInput: any){
    this.isLoadingResultsPD = true;
    this.isLoadingResultsCM = true;

    this.paginationParametersPD.status = Todo.Status.PENDING;
    this.paginationParametersPD.search = searchTodoInput.target.value.trim().toLowerCase();
    console.log(this.paginationParametersPD);
    this.paginationBehaviorObjectPD$.next(this.paginationParametersPD);
    this.isLoadingResultsPD = false;
    // this.paginator.firstPage();

    this.paginationParametersCM.status = Todo.Status.COMPLETED;
    this.paginationParametersCM.search = searchTodoInput.target.value.trim().toLowerCase();
    console.log(this.paginationParametersCM);
    this.paginationBehaviorObjectCM$.next(this.paginationParametersCM);
    this.paginator.firstPage();
    this.isLoadingResultsCM = false;
  }

  onToggleChange(enable: boolean) {
    if (enable) {
      this.isTableVisible = true;
    } else {
      this.isTableVisible = false;
    }
  }

  todoPending$ = this.refresh$.pipe(switchMap(() => {
    this.isLoadingResultsPD = true;
    let pendingTodo = this.todoServices.getPendingTodos(Todo.Status.PENDING);
    this.isLoadingResultsPD = false;
    return pendingTodo;
  }));

  todoCompleted$ = this.refresh$.pipe(switchMap(() => {
    this.isLoadingResultsCM = true;
    let completedTodo = this.todoServices.getCompletedTodos(Todo.Status.COMPLETED);
    this.isLoadingResultsCM = false;
    return completedTodo;
  }));

  // async searchClick(event: Event) {
  //   const searchValue = (event.target as HTMLInputElement).value;
  //   // this.paginationParameters.search = event.target.value;
  //   this.paginationParameters.search = searchValue.trim().toLowerCase();
  //   this.paginationParameters$.next(this.paginationParameters);
  //   this.paginator.firstPage();
  //   console.log(this.paginationParameters);
  //   console.log("search clicked")
  // }


  updateTaskDialog(todo: Todo.TodoDto): void {
    const dialogRef = this.dialog.open(UpdateTaskDialog, {
      width: '350px',
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLoadingResultsPD = true;
      this.isLoadingResultsCM = true;
      this.refresh$.next(null);
      this.isLoadingResultsPD = false;
      this.isLoadingResultsCM = false;
    });
  }

  async markAsDone(id: string) {
    this.isLoadingResultsPD = true;
    this.isLoadingResultsCM = true;
    await this.todoServices.markAsDone(id, { status: Todo.Status.COMPLETED});
    this.refresh$.next(null);
    this.isLoadingResultsPD = false;
    this.isLoadingResultsCM = false;
  }

  async deleteTask(id: string) {
    await this.todoServices.deleteTodo(id);
    this.refresh$.next(null);
  }

  

}
