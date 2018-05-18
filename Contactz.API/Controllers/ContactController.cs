using Contactz.Data;
using Contactz.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Contactz.API.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")] // tune to your needs
    [RoutePrefix("")]
    [Route("Contact")]
    public class ContactController : ApiController
    {
        public IDataStore _datastore;
        public ContactController(IDataStore dataStore)
        {
            _datastore = dataStore;
        }
        [Route("Contact/Index")]
        [HttpGet]
        public IEnumerable<Contact> Index()
        {
            return _datastore.GetAll();
        }
        [Route("Contact/Get")]
        [HttpGet]
        public IHttpActionResult Get(string name)
        {
            var contact = _datastore.Get(name);
            if (contact == null)
                return NotFound();
            return Ok(contact);
        }
        [Route("Contact/Search")]
        [HttpGet]
        public IHttpActionResult Search(string filter)
        {
            var contacts = _datastore.Search(filter);
            if (contacts == null)
                return NotFound();
            return Ok(contacts);
        }
        [Route("Contact/Post")]
        [HttpPost]
        public IHttpActionResult Post(Contact contact)
        {
            _datastore.Create(contact);
            return Ok(contact);
        }
        [Route("Contact/Put")]
        [HttpPut]
        public IHttpActionResult Put(Contact contact)
        {
            _datastore.Update(contact);
            return Ok(contact);
        }
        [Route("Contact/Delete")]
        [HttpPost]
        public IHttpActionResult Delete(Contact contact)
        {
            //var result = _datastore.Delete(contact);
            return Ok(contact);
        }
    }
}
