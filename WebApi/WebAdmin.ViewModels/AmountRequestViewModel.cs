using System.ComponentModel.DataAnnotations;

namespace WebAdmin.ViewModels
{
    public class AmountRequestViewModel
    {
        [Required(ErrorMessage = "Plan is Required")]
        public int PlanId { get; set; }
        [Required(ErrorMessage = "Scheme is Required")]
        public int SchemeId { get; set; }
    }
}