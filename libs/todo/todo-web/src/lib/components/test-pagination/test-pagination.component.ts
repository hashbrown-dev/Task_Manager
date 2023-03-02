import { AfterViewInit, Component, ViewChild ,OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoWebService } from '../../services/todo-web.service';
// import { Status, Todo } from '../../../../.././../apps/nest-api/src/entity/Todo';
// import { PaginationDTO } from "../../../../../../apps/nest-api/src/entity/paginationDTO";
import { Observable, BehaviorSubject, map, switchMap, tap } from "rxjs";
import { Todo } from '@workspace/todo-domain';

@Component({
  selector: 'workspace-test-pagination',
  templateUrl: './test-pagination.component.html',
  styleUrls: ['./test-pagination.component.css']
})
export class TestPaginationComponent {

  resultsLength = 0;
  pageSizesOptions = [5, 10, 25, 50, 100];
  displayedColumns = ["name", "description"];
  checked = false;

  paginationParameters!: Todo.PaginationDto;
  paginationBehaviorObject$ = new BehaviorSubject<Todo.PaginationDto | null>(null);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    readonly todoServices: TodoWebService,
  ) {}

  todos$ = this.paginationBehaviorObject$.pipe(
    switchMap(async (paginationParameters) => {
      this.paginationParameters = paginationParameters!;
      console.log(this.paginationParameters);
      const res = await this.todoServices.queryTodoParams(paginationParameters!);
      return res;
    }),
    
    tap((data) => (this.resultsLength = data[1])),
    map((data) => data[0])
  );

  searchTodo(input: any){
    this.paginationParameters.search = input.target.value;
    console.log(this.paginationParameters);
    this.paginationBehaviorObject$.next(this.paginationParameters);
    this.paginator.firstPage();
  }
}
