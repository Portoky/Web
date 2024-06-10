using Lab11.Data;
using Microsoft.AspNetCore.Mvc;

namespace Lab11.Controllers
{
    public class DeleteController : Controller
    {
        UserDbContext userDbContext;
        public DeleteController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            var user = userDbContext.Users.SingleOrDefault(user=> user.Id == id);
            if(user != null)
            {
                userDbContext.Remove(user);
                userDbContext.SaveChanges();
            }

            return RedirectToAction("Index", "Main");
        }
    }
}
