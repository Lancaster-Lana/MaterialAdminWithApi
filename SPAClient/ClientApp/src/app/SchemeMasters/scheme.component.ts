import { Component } from '@angular/core';

import { SchemeService } from './Services/scheme.service';
import { Router } from '@angular/router';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { SchemeMasterModel } from './Models/scheme.model';

@Component({
  templateUrl: './schemeMaster.html'
})
export class SchemeComponent {
  title = "Scheme Master";
  SchemeForms: SchemeMasterModel = new SchemeMasterModel();
  private responsedata: any;
  output: any;
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  constructor(private Router: Router, public snackBar: MatSnackBar, private SchemeService: SchemeService) {}

  onSubmit() {
    this.SchemeService.SaveScheme(this.SchemeForms).subscribe(
      response => {
        this.output = response;
        if (this.output.StatusCode == "409") {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;
          this.snackBar.open("Scheme Name Already Exists", this.action ? this.actionButtonLabel : undefined, config);

        }
        else if (this.output.StatusCode == "200") {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;
          this.snackBar.open("Saved Scheme Successfully", this.action ? this.actionButtonLabel : undefined, config);
          this.Router.navigate(['/Scheme/All']);
        }
        else {
          let config = new MatSnackBarConfig();
          config.duration = this.setAutoHide ? this.autoHide : 0;
          config.verticalPosition = this.verticalPosition;
          this.snackBar.open("Something Went Wrong", this.action ? this.actionButtonLabel : undefined, config);
        }
      }
    );
  }
}
