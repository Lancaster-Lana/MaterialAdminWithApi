using System.ComponentModel.DataAnnotations;

namespace WebAdmin.ViewModels
{
    public class LoginRequestViewModel
    {
        [Required(ErrorMessage = "Enter UserName")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Enter Password")]
        public string Password { get; set; }
        public string Token { get; set; }
        public int Usertype { get; set; }
    }
}
