using Lab11.Data;
using Lab11.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lab11.Controllers
{
    public class LoginController : Controller
    {
        private UserDbContext userDbContext;
        public LoginController(UserDbContext userDbContext) { 
            this.userDbContext = userDbContext;
        }
        
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginUser loginUser)
        {
            var user = userDbContext.Users.Where(u => u.Username.Equals(loginUser.Username) && u.Password.Equals(loginUser.Password)).FirstOrDefault();
            if(user == null)
            {
                ViewBag.Message = "Invalid Credentials!";
                return View("Index");
            }
            HttpContext.Session.SetString("User", loginUser.Username);

            return RedirectToAction("Index", "Main");
        }
    }
}
