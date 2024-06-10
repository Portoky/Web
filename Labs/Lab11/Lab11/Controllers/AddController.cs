using Lab11.Data;
using Lab11.Models;
using Microsoft.AspNetCore.Mvc;

namespace Lab11.Controllers
{
    public class AddController : Controller
    {
        UserDbContext userDbContext { get; set; }

        public AddController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var username = HttpContext.Session.GetString("User");
            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Index", "Login");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Add(User user)
        {
            var username = HttpContext.Session.GetString("User");
            if (string.IsNullOrEmpty(username))
            {
                return RedirectToAction("Index", "Login");
            }

            if (user == null)
            {
                ViewBag.Message = "Invalid Input!";
                return View();
            }
            userDbContext.Add(user);
            userDbContext.SaveChanges();
            return RedirectToAction("Index", "Main");
        }
        
    }
}
