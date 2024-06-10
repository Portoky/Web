using Lab11.Data;
using Lab11.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab11.Controllers
{
    public class UpdateController : Controller
    {
        private UserDbContext userDbContext;
        public UpdateController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        [HttpGet]
        [Route("Update/Index/{id}")]
        public IActionResult Index(int id)
        {
            var entity = userDbContext.Users.Where(user=>user.Id.Equals(id)).FirstOrDefault();
            if (entity == null)
            {
                return NotFound(); 
            }
            return View(entity);
        }

        [HttpPost]
        public IActionResult Update(User user)
        {
            var username = HttpContext.Session.GetString("User");
            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Index", "Login");
            }

            if (user == null)
            {
                ViewBag.Message = "Invalid Input!";
                return RedirectToAction("Index", "Main");
            }

            userDbContext.Update(user);
            userDbContext.SaveChanges();
            return RedirectToAction("Index", "Main");
        }
    }
}
