using Contactz.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contactz.Data
{
    public interface IDataStore
    {
        IEnumerable<Contact> GetAll();
        Models.Contact Get(string name);
        IQueryable<Models.Contact> Search(string filter);
        IQueryable<Models.Contact> History(string filter);
        Models.Contact Create(Contact contact);
        Models.Contact Update(Contact contact);
        bool Delete(Contact contact);
    }
}