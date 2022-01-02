import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas';
import { GenerateRecepit } from './Services/app.GenerateRecepit.Service';
import { GenerateRecepitRequestModel } from './Models/app.GenerateRecepitRequestModel';
import { GenerateRecepitViewModel } from './Models/app.GenerateRecepitViewModel';

@Component({
    templateUrl: './Recepit.html'
})
export class GenerateRecepitComponent implements OnInit {
    PaymentID: any;
   _generateRecepit;
    errorMessage: any;
    today :any;
    GenerateRecepitRequestModel: GenerateRecepitRequestModel = new GenerateRecepitRequestModel();
    GenerateRecepitViewModel :GenerateRecepitViewModel =new GenerateRecepitViewModel();

    constructor(private _Route: Router, private _routeParams: ActivatedRoute, private generateRecepit: GenerateRecepit) {
        this._generateRecepit = generateRecepit;
    }
    ngOnInit()
    {
        this.PaymentID = this._routeParams.snapshot.params['PaymentID'];
        this.today = new Date();
        this.GenerateRecepitRequestModel.PaymentID = this.PaymentID;
        this._generateRecepit.GetRecepitDetails(this.GenerateRecepitRequestModel).subscribe(
            recepitdetails => 
            {
                this.GenerateRecepitViewModel = recepitdetails
            },
            error => this.errorMessage = <any>error
        );
    }


    onSubmit() {
      console.log(this._generateRecepit);
 
      //this.generateRecepit().subscribe(
      //  response => {
      //    this.output = response
      //    if (this.output.StatusCode == "409") {
      //      alert('Member Already Exists');
      //    }
      //    else if (this.output.StatusCode == "200") {
      //      alert('Member Added Successfully');
      //      this.Router.navigate(['/Member/All']);
      //    }
      //    else {
      //      alert('Something Went Wrong');
      //    }
      //  });
    }

    public captureScreen() 
    {
        var data = document.getElementById('print');
        html2canvas(data).then(canvas => 
            {
            // Few necessary setting options
            var imgWidth = 210;
            var pageHeight = 297;
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png')
            //let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
            var position = 0;
            //pdf.addImage(contentDataURL, 'PNG', 20, 20, imgWidth, imgHeight)
            //pdf.save('PaymentRecepit.pdf'); // Generated PDF 

        });
    }
}
