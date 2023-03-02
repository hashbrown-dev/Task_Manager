import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { CdkTableModule } from "@angular/cdk/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatStepperModule } from "@angular/material/stepper";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

import { ListComponent } from "./components/list/list.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

// import { AppRoutingModule } from "../../../../apps/web-client/src/app/app-routing.module";
import { PaginationComponent } from "./components/pagination/pagination.component";
import { TestPaginationComponent } from "./components/test-pagination/test-pagination.component";
import { AddTaskDialog } from "./dialogs/add-task/add-task.dialog";
import { UpdateTaskDialog } from "./dialogs/update-task/update-task.dialog";
import { TodoWebService } from "./services";

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatInputModule,
    CdkTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  declarations: [
    ListComponent,
    ToolbarComponent,
    PaginationComponent,
    TestPaginationComponent,
    AddTaskDialog,
    UpdateTaskDialog,
  ],
  exports: [
    ListComponent,
    ToolbarComponent,
    PaginationComponent,
    TestPaginationComponent,
  ],
  providers: [TodoWebService],
})

export class TodoWebModule {}
