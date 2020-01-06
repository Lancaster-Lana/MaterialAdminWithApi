import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    template: ''
})
export class AdminLogoutComponent implements OnInit
{
    constructor(private route: Router)
    {

    }
    ngOnInit() {
        localStorage.removeItem('AdminUser');
        this.route.navigate(['Login']);
    }
}
