using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebQLNT.Areas.User.Controllers
{
    public class GioiThieuController : Controller
    {
        // GET: User/GioiThieu
        public ActionResult Index()
        {
			ViewBag.CurrentView = "GioiThieu";

			return View();
        }
    }
}