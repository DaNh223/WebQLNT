using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{
    public class TrangChuController : Controller
    {
		// GET: User/TrangChu
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
        {
            ViewBag.CurrentView = "TrangChu";
			LoadData();
			return View();
        }

		public void LoadData()
		{
			var dsNhaTro = db.NhaTro.Where(nt => nt.TrangThaiDuyet == "Đã duyệt").OrderByDescending(nt=> nt.MaNT).ToList();
			ViewBag.DSNT = dsNhaTro;
		}
	}
}