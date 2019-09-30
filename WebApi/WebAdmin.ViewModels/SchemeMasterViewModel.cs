using System.ComponentModel.DataAnnotations;

namespace WebAdmin.ViewModels
{
    public class SchemeMasterViewModel
    {
        [Required(ErrorMessage = "SchemeName is Required")]
        public string SchemeName { get; set; }

        public bool Status { get; set; }
    }
    public class SchemeMasterEditViewModel
    {
        [Required(ErrorMessage = "SchemeID is Required")]
        public int SchemeID { get; set; }

        [Required(ErrorMessage = "SchemeName is Required")]
        public string SchemeName { get; set; }

        public bool Status { get; set; }
    }
}
