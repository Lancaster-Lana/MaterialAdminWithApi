﻿using System.Collections.Generic;
using WebAdmin.ViewModels;

namespace WebAdmin.Interfaces
{
    public interface IReports
    {
        List<MemberDetailsReportViewModel> Generate_AllMemberDetailsReport();
        List<YearwiseReportViewModel> Get_YearwisePayment_details(string year);
        List<MonthWiseReportViewModel> Get_MonthwisePayment_details(string monthId);
        List<RenewalReportViewModel> Get_RenewalReport(RenewalReportRequestModel renewalReport);
    }
}