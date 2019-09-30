using System.Linq;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using WebAdmin.Interfaces;
using WebAdmin.Entities;

namespace WebAdmin.DAL
{
    public class SchemeMasterConcrete : ISchemeMaster
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public SchemeMasterConcrete(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public List<SchemeMaster> GetSchemeMasterList()
        {
            var result = (from scheme in _context.SchemeMaster
                          select scheme).ToList();
            return result;
        }

        public SchemeMaster GetSchemeMasterbyId(int schemeId)
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.SchemeID == schemeId
                          select scheme).FirstOrDefault();

            return result;
        }

        public bool CheckSchemeNameExists(string schemeName)
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.SchemeName == schemeName
                          select scheme).Count();
            return result > 0;
        }

        public bool AddSchemeMaster(SchemeMaster schemeMaster)
        {
            //var connectionString = _configuration.GetConnectionString("DatabaseConnection");

            _context.SchemeMaster.Add(schemeMaster);
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool UpdateSchemeMaster(SchemeMaster schemeMaster)
        {
            _context.Entry(schemeMaster).Property(x => x.Status).IsModified = true;
            var result = _context.SaveChanges();
            return result > 0;
        }

        public bool DeleteScheme(int schemeId)
        {
            var schememaster = (from scheme in _context.SchemeMaster
                                where scheme.SchemeID == schemeId
                                select scheme).FirstOrDefault();
            if (schememaster != null)
            {
                _context.SchemeMaster.Remove(schememaster);
                var result = _context.SaveChanges();
                return result > 0;
            }
            return false;
        }

        public List<SchemeMaster> GetActiveSchemeMasterList()
        {
            var result = (from scheme in _context.SchemeMaster
                          where scheme.Status == true
                          select scheme).ToList();
            return result;
        }
    }
}