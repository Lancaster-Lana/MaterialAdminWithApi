using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAdmin.Entities
{
    [Table("UsersInRoles")]
    public class UsersInRoles
    {
        [Key]
        public int UserRolesId { get; set; }
        public int RoleId { get; set; }
        public int UserId { get; set; }
    }
}