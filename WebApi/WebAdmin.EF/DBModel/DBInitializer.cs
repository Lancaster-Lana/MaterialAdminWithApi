namespace WebAdmin.EF
{
    public static class DBInitializer
    {
        public static void Initialize(DatabaseContext context)
        {
            bool created = context.Database.EnsureCreated();
            //Seed data to database
            //SeederDataDB.Seed(context);

            //Console.WriteLine("Seeding done");
        }
    }
}
