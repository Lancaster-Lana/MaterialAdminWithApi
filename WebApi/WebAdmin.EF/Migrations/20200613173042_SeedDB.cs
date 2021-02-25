using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.IO;

namespace WebAdmin.EF.Migrations
{
    public partial class SeedDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //string sqlResName = typeof(FillDB).Namespace + ".FillDB.sql";

            var sqlFile = "..\\WebAdmin.EF\\Migrations\\SeedDB.sql";//Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"Migrations\SeedDB.sql");
            var sql = File.ReadAllText(sqlFile);
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
