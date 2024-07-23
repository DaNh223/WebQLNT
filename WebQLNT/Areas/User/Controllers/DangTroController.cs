using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{

	public class DangTroController : Controller
    {
		// GET: User/DangTro
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
		{
			ViewBag.CurrentView = "DangTro";
			
			return View();


		}

		public ActionResult Upload(FormCollection form)
		{
			try
			{
				// Lấy dữ liệu từ form
				var diachi = form["diachi"];
				var tinh = form["tinh"];
				var quan = form["quan"];
				var phuong = form["phuong"];
				var ten_tro = form["ten_tro"];
				var dien_tich = form["dien_tich"];
				var trang_thai = form["trang_thai"];
				var gia_phong = form["gia_phong"];
				var gia_dien = form["gia_dien"];
				var gia_nuoc = form["gia_nuoc"];
				var tien_ich = form["tien_ich"];
				var mo_ta = form["mo_ta"];
				var lng = form["lng"];
				var lat = form["lat"];

				//if (phuong == null)
				//{
				//	return Json(new { success = "fail", checkPhuong = "fail" });
				//}
				//else if (trang_thai == "Vui lòng chọn")
				//{
				//	return Json(new { success = "fail", checkTrangThai = "fail" });
				//}
				//else if (Request.Files.Count <= 0)
				//{
				//	return Json(new { success = "fail", checkHinh = "fail" });
				//}
				//else {
					//var diachiFull = diachi + ", " + phuong + ", " + quan + ", " + tinh;

					int maTK = int.Parse(Session["loginID"].ToString());
					var maND = db.NguoiDung
						  .Where(nd => nd.TaiKhoan.MaTK == maTK)
						  .Select(nd => nd.MaND)
						  .FirstOrDefault();

					var nhaTro = new NhaTro
					{
						DiaChi = diachi,
						TenTro = ten_tro,
						DienTich = int.Parse(dien_tich),
						TrangThai = trang_thai,
						GiaPhong = int.Parse(gia_phong),
						GiaDien = int.Parse(gia_dien),
						GiaNuoc = int.Parse(gia_nuoc),
						TienIch = tien_ich,
						MoTa = mo_ta,
						TrangThaiDuyet = "Chờ duyệt",
						MaND = maND,
						Lng = lng,
						Lat = lat,
						Tinh = tinh,
						Quan = quan,
						Phuong = phuong
					};

					db.NhaTro.Add(nhaTro);
					db.SaveChanges();

					// Xử lý tải lên hình ảnh
					var imgFiles = Request.Files;

					if (imgFiles.Count > 0)
					{
						var uploadFolder = "~/uploads/";
						var uploadFolderPath = Server.MapPath(uploadFolder);

						if (!Directory.Exists(uploadFolderPath))
						{
							Directory.CreateDirectory(uploadFolderPath);
						}

						var maxNumber = db.HinhAnh.Count() > 0 ? db.HinhAnh.Max(i => i.MaHA) : 0;
						var currentNumber = maxNumber;

						for (int i = 0; i < imgFiles.Count; i++)
						{
							var file = imgFiles[i] as HttpPostedFileBase;
							if (file != null && file.ContentLength > 0)
							{
								currentNumber++;
								var fileExtension = Path.GetExtension(file.FileName);
								var uniqueFileName = "image" + currentNumber + fileExtension;

								var physicalPath = Path.Combine(uploadFolderPath, uniqueFileName);
								file.SaveAs(physicalPath);

								// Lưu thông tin hình ảnh vào cơ sở dữ liệu
								var image = new HinhAnh
								{
									URL = uniqueFileName,
									MaNT = nhaTro.MaNT // Thay đổi tùy theo logic của bạn để liên kết hình ảnh với bài đăng
								};
								db.HinhAnh.Add(image);
							}
						}
						db.SaveChanges();
					}
					return Json(new { status = "success", message = "Đăng tin thành công!"});
				}
			//}
			catch (Exception ex)
			{
				return Json(new { status = "fail", message = $"Lỗi khi đăng tin: {ex}" });
			}
		}

	}
}