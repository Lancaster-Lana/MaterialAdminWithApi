﻿using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using WebAdmin.Interfaces;
using WebAdmin.ViewModels;

namespace WebAdmin.EF
{
    public class RenewalConcrete : IRenewal
    {

        private readonly IConfiguration _configuration;
        private readonly DatabaseContext _context;

        public RenewalConcrete(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public RenewalViewModel GetMemberNo(string memberNo , int userid)
        {
            var membernoList = (from member in _context.MemberRegistration
                                join payment in _context.PaymentDetails on member.MemberId equals payment.MemberID
                                where member.MemberNo == memberNo && member.CreatedBy == userid
                                select new RenewalViewModel
                                {
                                    MemberNo = member.MemberNo,
                                    MemberName = member.MemberFName + ' ' + member.MemberMName + ' ' + member.MemberLName,
                                    PlanID = payment.PlanID,
                                    MemberId = member.MemberId,
                                    SchemeID = payment.WorkouttypeID,
                                    NextRenwalDate = payment.NextRenwalDate,
                                    Amount = payment.PaymentAmount,
                                    PaymentID = payment.PaymentID
                                }).OrderByDescending(x => x.PaymentID).FirstOrDefault();
            return membernoList;
        }

        public bool CheckRenewalPaymentExists(DateTime newdate , long memberId)
        {
            var data = (from payment in _context.PaymentDetails 
                where payment.MemberID == memberId && newdate.Date >= payment.PaymentFromdt.Date && newdate.Date <= payment.PaymentTodt.Date
                select payment).Any();

            return data;
        }
    }
}
