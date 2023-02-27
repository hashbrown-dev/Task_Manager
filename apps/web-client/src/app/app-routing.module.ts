import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from 'libs/todo-web/src/lib/components/list/list.component';
import { AddTaskDialogComponent, UpdateTaskDialogComponent } from 'libs/todo-web/src/lib/components/dialogs/dialogs.component';

const routes: Routes = [
    // {path: '', component: ListComponent},
    {path: 'tasks', component: ListComponent},
    {path: 'addTask/:id', component: AddTaskDialogComponent},
    {path: 'updateTask/:id', component: UpdateTaskDialogComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
