﻿using System;
using WebAdmin.ViewModels;

namespace WebAdmin.Interfaces
{
    public interface IRenewal
    {
        RenewalViewModel GetMemberNo(string memberNo, int userid);
        bool CheckRenewalPaymentExists(DateTime newdate, long memberId);
    }
}