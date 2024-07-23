using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Areas.Admin.Data;
using WebQLNT.Models;

namespace WebQLNT.Areas.Admin.Controllers
{
    public class DSBaiDangController : Controller
    {
		// GET: Admin/DSBaiDang
		public ActionResult Index()
        {
			QLNTEntities db = new QLNTEntities();

			var nhatro = from nt in db.NhaTro
						 join nd in db.NguoiDung on nt.MaND equals nd.MaND
						 join ha in db.HinhAnh on nt.MaNT equals ha.MaNT into hinhGroup
						 select new NhaTroViewModel
						 {
							 ID = nt.MaNT,
							 HinhTro = hinhGroup.Select(h => h.URL).ToList(), // URL hình ảnh của nhà trọ
							 HinhNguoiDung = nd.HinhND, // URL hình ảnh của người dùng
							 Nguoidang = nd.TenND,
							 Diachi = nt.DiaChi +", "+ nt.Phuong + ", " + nt.Quan +", " + nt.Tinh,
							 sdt = nd.SDT,
							 Tentro = nt.TenTro,
							 Dientich = (double)nt.DienTich,
							 GiachoThue = (double)nt.GiaPhong,
							 Giadien = (double)nt.GiaDien,
							 Gianuoc = (double)nt.GiaNuoc,
							 Mota = nt.MoTa,
							 Tienich = nt.TienIch,
							 TrangthaiDuyet = nt.TrangThaiDuyet
						 };

			var result = nhatro.ToList();

			return View(result);
		}

		[HttpPost]
		public ActionResult DuyetBai(int id)
		{
			QLNTEntities db = new QLNTEntities();
			var nhatro = db.NhaTro.SingleOrDefault(nt => nt.MaNT == id);
			if (nhatro != null)
			{
				nhatro.TrangThaiDuyet = "Đã duyệt";
				db.SaveChanges();
				return Json(new { success = true, message = "Đã duyệt bài thành công." });
			}
			return Json(new { success = false, message = "Bài đăng không tồn tại." });
		}

		[HttpPost]
		public ActionResult XoaBai(int id)
		{
			QLNTEntities db = new QLNTEntities();

			// Tìm các hình ảnh liên quan đến nhà trọ
			var hinhanhs = db.HinhAnh.Where(ha => ha.MaNT == id).ToList();

			// Xóa các hình ảnh liên quan trước
			db.HinhAnh.RemoveRange(hinhanhs);
			// Tìm nhà trọ
			var nhatro = db.NhaTro.SingleOrDefault(nt => nt.MaNT == id);

			if (nhatro != null)
			{
				// Xóa nhà trọ
				db.NhaTro.Remove(nhatro);

				// Lưu thay đổi
				db.SaveChanges();

				return Json(new { success = true, message = "Đã xóa bài đăng thành công." });
			}

			return Json(new { success = false, message = "Bài đăng không tồn tại." });
		}
	}
}