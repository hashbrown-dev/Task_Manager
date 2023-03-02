import { AfterViewInit, Component, ViewChild ,OnInit} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TodoWebService } from '../../services/todo-web.service';
// import { Todo.Status, Todo } from '../../../../.././../apps/nest-api/src/entity/Todo'
import { Observable } from 'rxjs';
import { Todo } from '@workspace/todo-domain';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

@Component({
  selector: 'workspace-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'description'];
  dataSource!: MatTableDataSource<Todo.TodoDto>;
  resultsLength?: number;
  pendingList:Todo.TodoDto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(readonly todoServices: TodoWebService) {
    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));
    //console.log(users);
    // let pendingTodoRes = this.todoServices.getPendingTodos1(Todo.Status.PENDING);
  
   // console.log(pendingTodoRes);
   // console.log(this.pendingList);
    // Assign the data to the data source for the table to render
    // if ( this.pendingList.length )this.pendingTodoSource = new MatTableDataSource(this.pendingList);
   
    this.todoServices.getPendingTodos1(Todo.Status.PENDING).subscribe(data =>  {
      data? this.dataSource = new MatTableDataSource(data): console.log("data not present");
      // console.log("consloe for datasource ==", this.dataSource._pageData);
      this.resultsLength = data.length;
      this.dataSource._pageData;
      this.dataSource.paginator = this.paginator;
    });
  }
  ngOnInit(){
    
    // this.todoServices.getPendingTodos1(Todo.Status.PENDING).subscribe(pendingList => {this.dataSource = new MatTableDataSource(pendingList), console.log("  ngoninit pendingList>>>",pendingList
    // )});

    // this.dataSource  ? this.dataSource.paginator = this.paginator : console.log("data not available")
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.getData()
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getData(){
     
      // this.dataSource.paginator = this.paginator
     
   
    // this.dataSource = new MatTableDataSource(data1), 
    this.dataSource ? this.dataSource.paginator = this.paginator : console.log("data not available")
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
  };
}
