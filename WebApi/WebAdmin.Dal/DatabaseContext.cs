using Microsoft.EntityFrameworkCore;
using WebAdmin.Entities;

namespace WebAdmin.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }

        public DbSet<SchemeMaster> SchemeMaster { get; set; }
        public DbSet<PeriodTB> PeriodTb { get; set; }
        public DbSet<PlanMaster> PlanMaster { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<MemberRegistration> MemberRegistration { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UsersInRoles> UsersInRoles { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }
    }
}
