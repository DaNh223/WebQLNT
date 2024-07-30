using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Areas.Admin.Data;
using WebQLNT.Models;

namespace WebQLNT.Areas.Admin.Controllers
{
    public class DSTaiKhoanController : Controller
    {
		// GET: Admin/DSTaiKhoan
		public ActionResult Index()
        {
			QLNTEntities db = new QLNTEntities();

			var userDetail = from nd in db.NguoiDung
							 join nt in db.NhaTro on nd.MaND equals nt.MaND into ntGroup
							 from nt in ntGroup.DefaultIfEmpty()
							 join tk in db.TaiKhoan on nd.MaTK equals tk.MaTK into tkGroup
							 from tk in tkGroup.DefaultIfEmpty()
							 group nt by new
							 {
								 nd.MaND,
								 nd.TenND,
								 Email = tk.Email, // Từ tk có thể là null
								 nd.NgaySinh,
								 nd.DiaChi,
								 nd.SDT,
								 nd.Zalo,
								 nd.Facebook,
								 nd.MaTK,
								 nd.HinhND,
								 nd.LoaiND
							 } into grouped
							 select new NguoiDungViewModel
							 {
								 MaND = grouped.Key.MaND,
								 TenND = grouped.Key.TenND,
								 Email = grouped.Key.Email,
								 NgaySinh = (DateTime)grouped.Key.NgaySinh,
								 Diachi = grouped.Key.DiaChi,
								 SDT = grouped.Key.SDT,
								 Zalo = grouped.Key.Zalo,
								 Facebook = grouped.Key.Facebook,
								 MaTK = (int)grouped.Key.MaTK,
								 HinhND = grouped.Key.HinhND,
								 // Chỉ đếm nếu MaNT không phải là null
								 SoLuongNhaTro = grouped.Count(nt => nt.MaNT != null),
								 LoaiND = grouped.Key.LoaiND
							 };
			var result = userDetail.ToList();
			return View(result);
		}

		[HttpPost]
		public ActionResult CapNhatNguoiDung(NguoiDungViewModel model)
		{
			QLNTEntities db = new QLNTEntities();

			if (ModelState.IsValid)
			{
				var userDetail = (from nd in db.NguoiDung
								  join tk in db.TaiKhoan on nd.MaTK equals tk.MaTK into tkGroup
								  from tk in tkGroup.DefaultIfEmpty()
								  where nd.MaND == model.MaND
								  select new
								  {
									  nd,
									  Email = tk.Email
								  }).FirstOrDefault();

				if (userDetail != null)
				{
					userDetail.nd.TenND = model.TenND;
					userDetail.nd.NgaySinh = model.NgaySinh;
					userDetail.nd.DiaChi = model.Diachi;
					userDetail.nd.SDT = model.SDT;
					userDetail.nd.Zalo = model.Zalo;
					userDetail.nd.Facebook = model.Facebook;

					if (userDetail.nd.MaTK != null)
					{
						var taiKhoan = db.TaiKhoan.SingleOrDefault(tk => tk.MaTK == userDetail.nd.MaTK);
						if (taiKhoan != null)
						{
							taiKhoan.Email = model.Email;
						}
					}

					db.SaveChanges();
					return Json(new { success = true, message = "Cập nhật thông tin thành công." });
				}
				return Json(new { success = false, message = "Người dùng không tồn tại." });
			}
			return Json(new { success = false, message = "Dữ liệu không hợp lệ." });
		}

		//[HttpPost]
		//public ActionResult XoaNguoiDung(int id)
		//{
		//	using (var db = new QLNTEntities())
		//	{
		//		using (var transaction = db.Database.BeginTransaction())
		//		{
		//			try
		//			{
		//				// Lấy người dùng và MaNT từ bảng NguoiDung
		//				var nguoiDung = db.NguoiDung.SingleOrDefault(nd => nd.MaND == id);
		//				if (nguoiDung != null)
		//				{
		//					// Lấy MaNT từ bảng NhaTro sử dụng MaND
		//					var maNT = db.NhaTro.Where(nt => nt.MaND == nguoiDung.MaND).Select(nt => nt.MaNT).FirstOrDefault();

		//					// Xóa các bản ghi trong bảng HinhAnh có MaNT tương ứng
		//					var hinhAnhs = db.HinhAnh.Where(ha => ha.MaNT == maNT).ToList();
		//					db.HinhAnh.RemoveRange(hinhAnhs);

		//					// Xóa các bản ghi trong bảng NhaTro có MaND tương ứng
		//					var nhaTros = db.NhaTro.Where(nt => nt.MaND == id).ToList();
		//					db.NhaTro.RemoveRange(nhaTros);

		//					// Xóa bản ghi trong bảng TaiKhoan nếu cần
		//					var taiKhoan = db.TaiKhoan.SingleOrDefault(tk => tk.MaTK == nguoiDung.MaTK);
		//					if (taiKhoan != null)
		//					{
		//						db.TaiKhoan.Remove(taiKhoan);
		//					}

		//					// Xóa người dùng
		//					db.NguoiDung.Remove(nguoiDung);

		//					// Lưu thay đổi
		//					db.SaveChanges();

		//					// Commit transaction
		//					transaction.Commit();
		//					return Json(new { success = true, message = "Đã xóa người dùng thành công" });
		//				}
		//				else
		//				{
		//					return Json(new { success = false, message = "Người dùng không tồn tại" });
		//				}
		//			}
		//			catch (Exception ex)
		//			{
		//				// Rollback transaction nếu có lỗi xảy ra
		//				transaction.Rollback();

		//				// Log lỗi chi tiết
		//				System.Diagnostics.Debug.WriteLine(ex.Message);
		//				return Json(new { success = false, message = "Đã có lỗi xảy ra trong quá trình xóa người dùng", err = ex });
		//			}
		//		}
		//	}
		//}


		[HttpPost]
		public ActionResult XoaNguoiDung(int id)
		{
			using (var db = new QLNTEntities())
			{
				using (var transaction = db.Database.BeginTransaction())
				{
					try
					{
						// Lấy người dùng từ bảng NguoiDung
						var nguoiDung = db.NguoiDung.SingleOrDefault(nd => nd.MaND == id);
						if (nguoiDung != null)
						{
							// Lấy tất cả MaNT từ bảng NhaTro sử dụng MaND
							var maNTs = db.NhaTro.Where(nt => nt.MaND == nguoiDung.MaND).Select(nt => nt.MaNT).ToList();

							// Xóa tất cả các bản ghi trong bảng HinhAnh có MaNT tương ứng
							//var hinhAnhs = db.HinhAnh.Where(ha => maNTs.Contains(ha.MaNT)).ToList();
							// Xóa tất cả các bản ghi trong bảng HinhAnh có MaNT tương ứng
							var hinhAnhs = db.HinhAnh.Where(ha => maNTs.Contains((int)ha.MaNT)).ToList();
							db.HinhAnh.RemoveRange(hinhAnhs);

							// Xóa tất cả các bản ghi trong bảng NhaTro có MaND tương ứng
							var nhaTros = db.NhaTro.Where(nt => nt.MaND == nguoiDung.MaND).ToList();
							db.NhaTro.RemoveRange(nhaTros);

							// Xóa bản ghi trong bảng TaiKhoan nếu cần
							var taiKhoan = db.TaiKhoan.SingleOrDefault(tk => tk.MaTK == nguoiDung.MaTK);
							if (taiKhoan != null)
							{
								db.TaiKhoan.Remove(taiKhoan);
							}

							// Xóa người dùng
							db.NguoiDung.Remove(nguoiDung);

							// Lưu thay đổi
							db.SaveChanges();

							// Commit transaction
							transaction.Commit();
							return Json(new { success = true, message = "Đã xóa người dùng và các nhà trọ liên quan thành công" });
						}
						else
						{
							return Json(new { success = false, message = "Người dùng không tồn tại" });
						}
					}
					catch (Exception ex)
					{
						// Rollback transaction nếu có lỗi xảy ra
						transaction.Rollback();

						// Log lỗi chi tiết
						System.Diagnostics.Debug.WriteLine(ex.Message);
						return Json(new { success = false, message = "Đã có lỗi xảy ra trong quá trình xóa người dùng và các nhà trọ liên quan", err = ex });
					}
				}
			}
		}
	}
}