import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PaginationService } from '../../Shared/PaginationService';
import { MemberRegistrationModel } from '../Models/memberRegistration.model';
import { MemberRegistrationService } from '../Services/memberRegistration.service';

@Component({
  selector: 'app-overview',
  templateUrl: 'memberView.component.html'
})
export class MemberViewComponent implements OnInit {

  dataSource: MemberRegistrationModel[];
  totalCount: number;

  constructor(
    private route: Router,
    private memberregistration: MemberRegistrationService,
    private paginationService: PaginationService) { }

  ngOnInit() {
    this.getAllMembers();
  }

  switchPage(event: PageEvent) {
    this.paginationService.change(event);
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberregistration.getAll<MemberRegistrationModel[]>()
      .subscribe((result: any) => {
        console.log(result.headers);
        this.totalCount = JSON.parse(result.headers.get('X-Pagination')).totalCount;
        // this.totalCount = 4;
        this.dataSource = result.body.value;
      });
  }


  //Delete(MemberId): void {
  //  console.log(MemberId);
  //  if (confirm("Are you sure to delete Member ?")) {
  //    this.memberregistration.DeleteMember(MemberId).subscribe
  //      (
  //        response => {
  //          if (response.StatusCode == "200") {
  //            alert('Deleted Member Successfully');
  //            location.reload();
  //          }
  //          else {
  //            alert('Something Went Wrong');
  //            this._Route.navigate(['/Member/All']);
  //          }
  //        }
  //      )
  //  }
  // }
}
