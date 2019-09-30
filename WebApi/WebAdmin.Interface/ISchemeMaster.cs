using System.Collections.Generic;
using WebAdmin.Entities;

namespace WebAdmin.Interfaces
{
    public interface ISchemeMaster
    {
        bool AddSchemeMaster(SchemeMaster schemeMaster);
        List<SchemeMaster> GetSchemeMasterList();
        SchemeMaster GetSchemeMasterbyId(int schemeId);
        bool CheckSchemeNameExists(string schemeName);
        bool UpdateSchemeMaster(SchemeMaster schemeMaster);
        bool DeleteScheme(int schemeId);

        List<SchemeMaster> GetActiveSchemeMasterList();
    }
}