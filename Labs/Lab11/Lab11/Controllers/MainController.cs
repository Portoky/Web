using Lab11.Data;
using Lab11.Models;
using Microsoft.AspNetCore.Mvc;

namespace Lab11.Controllers
{
    public class MainController : Controller
    {
        UserDbContext UserDbContext { get; set; }
        public MainController(UserDbContext userDbContext) 
        {
            this.UserDbContext = userDbContext;
        }

        public string getUserTableBasedOnFilters(string nameFilter, string selectedRole)
        {
            if (nameFilter == null)
                nameFilter = "";
            if (selectedRole == null)
                selectedRole = "";
            var filteredUserList = new List<User>();
            if (String.IsNullOrEmpty(selectedRole))
            {
                filteredUserList = UserDbContext.Users.Where(user => user.Username.Contains(nameFilter)).ToList();
            }
            else
            {
                filteredUserList = UserDbContext.Users.Where(user => user.Username.Contains(nameFilter) && user.Role.Equals(selectedRole)).ToList();
            }
            string result = 
                "<table id=userTable border='1'>" +
                "<tr id=0 >" +
                "<th>Id</th>" +
                "<th>Name</th>" +
                "<th>UserName</th>" +
                "<th>role</th>" +
                "<th>email</th>" +
                "<th>age</th>" +
                "<th>webpage</th>" +
                "</tr>";
            int rowId = 1;
            foreach (User user in filteredUserList)
            {
                result += "<tr id=" + rowId.ToString() + ">"
                         + "<td>" + user.Id.ToString() + "</td>"
                         + "<td>" + user.Name + "</td>"
                         + "<td>" + user.Username + "</td>"
                         + "<td>" + user.Role + "</td>"
                         + "<td>" + user.Email + "</td>"
                         + "<td>" + user.Age.ToString() + "</td>"
                         + "<td>" + user.Webpage + "</td>"
                         + "</tr>";
            }

            result += "</table>";

            return result;
            
        }

        [HttpGet]   
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("User") == null)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }

        public string Test()
        {
            return "It's working";
        }

    }
}
