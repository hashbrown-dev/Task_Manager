import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { AddTaskDialog } from '../../dialogs';

@Component({
  selector: 'workspace-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {

  constructor(public dialog: MatDialog){}

  @Output() refreshRequested = new EventEmitter();


  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
     this.refreshRequested.emit();
    });
  }
}
