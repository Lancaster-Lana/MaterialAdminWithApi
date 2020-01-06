import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { UserModel } from './Models/userModel';
import { UserService } from './Services/userService';

const editUserUrl: string = '/Admin/EditUser/';

@Component({
    templateUrl: './allUserRegistration.component.html'
})
export class AllUserRegistrationComponent implements OnInit
{
  AllUserList: UserModel[];
  errorMessage: any;

  @ViewChild(MatSort, { read: ElementRef, static: false })
  sort: MatSort;

  @ViewChild(MatPaginator, { read: ElementRef, static: false })
  paginator: MatPaginator;

  displayedColumns: string[] = ['Id', 'UserName', 'FullName', 'EmailId', 'Contactno', 'Status', 'EditAction', 'DeleteAction'];
  dataSource: any;

  constructor(
    private location: Location,
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog)
  {
  }

  /*
  openDialog()
  {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '250px',
      data: { name: "Edit user" }
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.user = result;
    });
  }*/

  ngOnInit() {
    this.userService.GetAllUsers()
      .subscribe(allUsers => {
        this.AllUserList = allUsers;
        this.dataSource = new MatTableDataSource(this.AllUserList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => this.errorMessage = <any>error
    );
  }

  EditUser(id) {
    this.router.navigate([editUserUrl, id]);
  }

  Delete(Id)
  {
    if (confirm("Are you sure to delete User ?")) {
      this.userService.DeleteUser(Id)
        .subscribe (response => {
            if (response.StatusCode == "200") {
              alert('Deleted User Successfully');
              location.reload();
            }
            else {
              alert('Something Went Wrong');
              this.router.navigate(['/AllSchemeMaster']);
            }
          }
        )
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
