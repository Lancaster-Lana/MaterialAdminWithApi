namespace WebAdmin.ViewModels
{
    public class LoginResponse
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public bool Status { get; set; }
        public int RoleId { get; set; }
    }
}
