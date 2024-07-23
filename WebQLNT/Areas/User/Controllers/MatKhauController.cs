using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{
    public class MatKhauController : Controller
    {
		// GET: User/MatKhau
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
        {
			ViewBag.CurrentView = "MatKhau";
			return View();
        }
        
        public ActionResult ChangePass(FormCollection form)
        {
            string curPass = form["curPass"];
            string newPass = form["newPass"];
            string confirmPass = form["confirmPass"];

			int maTK = int.Parse(Session["loginID"].ToString());
            var user = db.TaiKhoan.Where(tk => tk.MaTK == maTK && tk.Password == curPass).FirstOrDefault();

            if (user != null)
            {
                user.Password = newPass;
                db.SaveChanges();
                return Json(new { status = "success", message = user.Password});
            }
            else {
				return Json(new { status = "fail", message = "Không tìm thấy tài khoản" });
			}
        }
    }
}