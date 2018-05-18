using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contactz.Data.Models;

namespace Contactz.Data
{
    public class DataStore : IDataStore
    {
        private Models.ContactzEntities _contactzEntities;
        public DataStore()
        {
            _contactzEntities = new Models.ContactzEntities();
        }
        public IEnumerable<Contact> GetAll()
        {
            return _contactzEntities.Contacts.AsEnumerable();
        }
        public Models.Contact Get(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                return null;
            return _contactzEntities?.Contacts?.Where(p => p.Name.ToLower() == name.ToLower())?.FirstOrDefault();
        }
        public IQueryable<Models.Contact> Search(string filter)
        {
            if (string.IsNullOrWhiteSpace(filter))
                return null;
            return _contactzEntities?.Contacts?.Where(p => p.Name.ToLower().Contains(filter.ToLower()));
        }
        public IQueryable<Models.Contact> History(string filter)
        {
            throw new NotImplementedException();
        }

        public Contact Create(Contact contact)
        {
            if (contact == null || string.IsNullOrWhiteSpace(contact?.Name))
                throw new Exception("Invalid Contact");
            _contactzEntities.Contacts.Add(contact);
            _contactzEntities.SaveChanges();
            return contact;
        }

        public Contact Update(Contact contact)
        {
            if (contact == null || string.IsNullOrWhiteSpace(contact?.Name))
                throw new Exception("Invalid Contact");
            var updatedContact = _contactzEntities?.Contacts?.Where(p => p.ID == contact.ID)?.FirstOrDefault();
            if (updatedContact == null)
                throw new Exception("Invalid Contact");
            updatedContact.Name = contact.Name;
            updatedContact.Surname = contact.Surname;
            updatedContact.Email = contact.Email;
            _contactzEntities.SaveChanges();
            return contact;
        }

        public bool Delete(Contact contact)
        {
            if (contact == null || string.IsNullOrWhiteSpace(contact?.Name))
                return false;
            var delContact = _contactzEntities.Contacts.Where(r => r.ID == contact.ID)?.FirstOrDefault();
            if (contact != null)
            {
                _contactzEntities.Contacts.Remove(delContact);
                return true;
            }
            return false;
        }
    }
}