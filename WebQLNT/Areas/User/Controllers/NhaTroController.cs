using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Areas.User.ViewModel;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{
	public class NhaTroController : Controller
	{
		// GET: User/NhaTro
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
		{
			ViewBag.CurrentView = "NhaTro";
			LoadData();
			return View();
		}

		public void LoadData()
		{
			var dsNhaTro = db.NhaTro.Where(nt => nt.TrangThaiDuyet == "Đã duyệt").OrderByDescending(nt=> nt.MaNT).ToList();
			ViewBag.DSNT = dsNhaTro;
		}

		public ActionResult ChiTiet(string id)
		{
			int maNT = int.Parse(id);
			var nt = db.NhaTro.FirstOrDefault(n => n.MaNT == maNT);

			if (nt != null)
			{
				ViewBag.CTNT = nt;
				ViewBag.CurrentView = "ChiTiet";
			}

			return View();
		}

		[HttpPost]
		public ActionResult Search(string ten, string phuong, string gia)
		{
			var dsNhaTro = db.NhaTro.Where(nt => nt.TrangThaiDuyet == "Đã duyệt").AsQueryable();

			if (!string.IsNullOrEmpty(ten))
			{
				dsNhaTro = dsNhaTro.Where(nt => nt.TenTro.Contains(ten));
			}

			if (!string.IsNullOrEmpty(phuong) && phuong != "Phường/Xã")
			{
				dsNhaTro = dsNhaTro.Where(nt => nt.Phuong == phuong);
			}

			int giaInt;
			if (int.TryParse(gia, out giaInt))
			{
				switch (giaInt)
				{
					case 1:
						dsNhaTro = dsNhaTro.Where(nt => nt.GiaPhong < 1000000);
						break;
					case 2:
						dsNhaTro = dsNhaTro.Where(nt => nt.GiaPhong >= 1000000 && nt.GiaPhong < 2000000);
						break;
					case 3:
						dsNhaTro = dsNhaTro.Where(nt => nt.GiaPhong >= 2000000);
						break;
				}
			}

			var dsNhaTroDTO = dsNhaTro.Select(nt => new ThongTinTroViewModel
			{
				MaNT = nt.MaNT,
				TenTro = nt.TenTro,
				DiaChi = nt.DiaChi,
				Phuong = nt.Phuong,
				Quan = nt.Quan,
				Tinh = nt.Tinh,
				DienTich = nt.DienTich ?? 0,
				GiaPhong = nt.GiaPhong ?? 0,
				DanhSachHinhAnh = nt.HinhAnh.Select(ha => ha.URL).ToList(),
			}).OrderByDescending(nt=> nt.MaNT).ToList();

			return Json(new { status = "success", dsNhaTroDTO }, JsonRequestBehavior.AllowGet);
		}

	}
}