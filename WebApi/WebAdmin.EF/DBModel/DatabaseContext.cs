using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using WebAdmin.Entities;

namespace WebAdmin.EF
{
    public static class CONSTS
    {
        public static string DefaultConnectionString = "Server=.;Database=AdminWebApiDB;Trusted_Connection=True;MultipleActiveResultSets=true";//"DataConnection";
    }

    //public class DBFactory : IDesignTimeDbContextFactory<DatabaseContext>
    //{
    //    public DatabaseContext CreateDbContext(string[] args)
    //    {
    //        //ConfigurationManager.ConnectionStrings[CONSTS.DefaultConnectionStringName].ConnectionString;

    //        var optionsBuilder = new DbContextOptionsBuilder<DatabaseContext>(); 
    //        optionsBuilder.UseSqlServer(CONSTS.DefaultConnectionString);

    //        return new DatabaseContext(optionsBuilder.Options);
    //    }
    //}

    public class DatabaseContext : DbContext
    {

        public DatabaseContext() : this(CONSTS.DefaultConnectionString)
        {
        }

        public DatabaseContext(string connectionString) : this(GetOptions(connectionString))
        {
            //    this.Configuration.LazyLoadingEnabled = true;
            //    this.Configuration.ProxyCreationEnabled = false;
        }

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }


        private static DbContextOptions<DatabaseContext> GetOptions(string connectionString)
        {
            var options = SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder<DatabaseContext>(), connectionString).Options;
            return (DbContextOptions<DatabaseContext>)options;
        }

        public DbSet<Role> Role { get; set; }
        public DbSet<MemberRegistration> MemberRegistration { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<UsersInRoles> UsersInRoles { get; set; }
        public DbSet<SchemeMaster> SchemeMaster { get; set; }
        public DbSet<PeriodTB> PeriodTb { get; set; }
        public DbSet<PlanMaster> PlanMaster { get; set; }
        public DbSet<PaymentDetails> PaymentDetails { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users>().ToTable(nameof(Users));

            base.OnModelCreating(modelBuilder);
        }
    }
}
