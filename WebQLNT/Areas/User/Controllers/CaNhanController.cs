using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{
    public class CaNhanController : Controller
    {
		// GET: User/CaNhan
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
        {
			ViewBag.CurrentView = "CaNhan";
			LoadData();
			return View();
        }


        public void LoadData() {
			int maTK = int.Parse(Session["loginID"].ToString());
			var NguoiDung = db.NguoiDung
							  .Where(nd => nd.TaiKhoan.MaTK == maTK)
							  .FirstOrDefault();
			ViewBag.NguoiDung = NguoiDung;
		}

		[HttpPost]
		public ActionResult UpdateProfile(FormCollection form, HttpPostedFileBase imageInput)
		{
			if (ModelState.IsValid)
			{
				int maTK = int.Parse(Session["loginID"].ToString());
				var NguoiDung = db.NguoiDung
								  .Where(nd => nd.TaiKhoan.MaTK == maTK)
								  .FirstOrDefault();

				NguoiDung.TenND = form["hoten"];
				NguoiDung.NgaySinh = DateTime.Parse(form["namsinh"]);
				NguoiDung.SDT = form["sdt"];
				NguoiDung.DiaChi = form["diachi"];
				NguoiDung.Zalo = form["zalo"];
				NguoiDung.Facebook = form["facebook"];

				if (imageInput != null && imageInput.ContentLength > 0)
				{
					var fileName = Path.GetFileName(imageInput.FileName);
					var extension = Path.GetExtension(fileName);
					var newFileName = $"userImg_{NguoiDung.MaND}{extension}";
					var path = Path.Combine(Server.MapPath("~/uploads"), newFileName);
					imageInput.SaveAs(path);
					NguoiDung.HinhND = newFileName;
					Session["userImg"] = newFileName;
				}

				db.Entry(NguoiDung).State = EntityState.Modified;
				db.SaveChanges();


				return Json(new { status = "success", message = "Cập nhật thông tin thành công", img = Session["userImg"].ToString() });
				//return Json(new { status = "success", message = "Cập nhật thông tin thành công", img = "user_img.png"});
			}

			return Json(new { status = "fail", message = "Lỗi khi cập nhật thông tin" });
		}

	}
}