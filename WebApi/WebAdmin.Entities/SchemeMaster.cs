using System;
using System.ComponentModel.DataAnnotations;

namespace WebAdmin.Entities
{
    public class SchemeMaster
    {
        [Key]
        public int SchemeID { get; set; }
        public string SchemeName { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool Status { get; set; }      
    }
}