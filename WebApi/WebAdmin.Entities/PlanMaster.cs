using System;
using System.ComponentModel.DataAnnotations;

namespace WebAdmin.Entities
{
    public class PlanMaster
    {
        [Key]
        public int PlanID { get; set; }
        public string PlanName { get; set; }
        public decimal? PlanAmount { get; set; }
        public decimal? ServicetaxAmount { get; set; }
        public string ServiceTax { get; set; }
        public DateTime? CreateDate { get; set; }
        public int? CreateUserID { get; set; }
        public DateTime? ModifyDate { get; set; }
        public int? ModifyUserID { get; set; }
        public bool RecStatus { get; set; }
        public int? SchemeID { get; set; }
        public int PeriodID { get; set; }
        public decimal? TotalAmount { get; set; }
        public string ServicetaxNo { get; set; }
    }
}