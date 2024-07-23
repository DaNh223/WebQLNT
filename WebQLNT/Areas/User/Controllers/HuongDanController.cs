using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebQLNT.Areas.User.Controllers
{
    public class HuongDanController : Controller
    {
        // GET: User/HuongDan
        public ActionResult Index()
        {
			ViewBag.CurrentView = "HuongDan";
			return View();
        }
    }
}