using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAdmin.Entities
{
    [Table("PeriodTB")]
    public class PeriodTB
    {
        [Key]
        public int PeriodID { get; set; }
        public string Text { get; set; }
        public string Value { get; set; }
    }
}