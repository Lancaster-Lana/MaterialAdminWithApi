import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
//import { DialogData } from './DialogData';

@Component({
  selector: 'edit-user-modal',
  templateUrl: './EditUserModal.component.html'
})
export class EditUserModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditUserModalComponent>//   @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
}
