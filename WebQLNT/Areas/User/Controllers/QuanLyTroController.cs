using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Areas.User.ViewModel;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.Controllers
{
    public class QuanLyTroController : Controller
    {
		// GET: User/QuanLyTro
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
		{
			ViewBag.CurrentView = "QuanLyTro";
			LoadData();
			return View();
        }
		public void LoadData()
		{
			int maTK = int.Parse(Session["loginID"].ToString());
			var maND = db.NguoiDung
				  .Where(nd => nd.TaiKhoan.MaTK == maTK)
				  .Select(nd => nd.MaND)
				  .FirstOrDefault();
			var dsNhaTro = db.NhaTro.Where(nt => nt.MaND == maND).ToList();
			ViewBag.DSNT = dsNhaTro;
		}

		public ActionResult LoadEditData(string maNT)
		{
			int maNTInt = int.Parse(maNT);
			Session["maNT"] = maNTInt;
			var nhatro = db.NhaTro
			   .Where(nt => nt.MaNT == maNTInt)
			   .Select(nt => new ThongTinTroViewModel
			   {
				   MaNT = nt.MaNT,
				   TenTro = nt.TenTro,
				   DiaChi = nt.DiaChi,
				   DienTich = nt.DienTich ?? 0,
				   TrangThai = nt.TrangThai,
				   GiaPhong = nt.GiaPhong ?? 0,
				   GiaDien = nt.GiaDien ?? 0,
				   GiaNuoc = nt.GiaNuoc ?? 0,
				   TienIch = nt.TienIch,
				   MoTa = nt.MoTa,
				   Lng = nt.Lng,
				   Lat = nt.Lat,
				   Tinh = nt.Tinh,
				   Quan = nt.Quan,
				   Phuong = nt.Phuong,
				   DanhSachHinhAnh = nt.HinhAnh.Select(ha => ha.URL).ToList()
			   })
			   .FirstOrDefault();

			if (nhatro != null)
			{
				//ViewBag.TTNT = nhatro;
				return Json(new {status = "success", TTNT = nhatro}, JsonRequestBehavior.AllowGet);
			}
			else
			{
				return Json(new { success = "fail", message = "Không tìm thấy nhà trọ" }, JsonRequestBehavior.AllowGet);
			}
		}

		public ActionResult Edit(FormCollection form)
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

				//var diachiFull = diachi + ", " + phuong + ", " + quan + ", " + tinh;

				int maTK = int.Parse(Session["loginID"].ToString());
				var maND = db.NguoiDung
					  .Where(nd => nd.TaiKhoan.MaTK == maTK)
					  .Select(nd => nd.MaND)
					  .FirstOrDefault();

				int maNT = int.Parse(Session["maNT"].ToString());
				var nhaTro = db.NhaTro.Find(maNT);

				if (nhaTro == null)
				{
					return Json(new { status = "fail", message = "Không tìm thấy nhà trọ" });
				}

				nhaTro.DiaChi = diachi;
				nhaTro.TenTro = ten_tro;
				nhaTro.DienTich = int.Parse(dien_tich);
				nhaTro.TrangThai = trang_thai;
				nhaTro.GiaPhong = int.Parse(gia_phong);
				nhaTro.GiaDien = int.Parse(gia_dien);
				nhaTro.GiaNuoc = int.Parse(gia_nuoc);
				nhaTro.TienIch = tien_ich;
				nhaTro.MoTa = mo_ta;
				nhaTro.TrangThaiDuyet = "Chờ duyệt";
				nhaTro.MaND = maND;
				nhaTro.Lng = lng;
				nhaTro.Lat = lat;
				nhaTro.Phuong = phuong;
				nhaTro.Quan = quan;
				nhaTro.Tinh = tinh;

				db.Entry(nhaTro).State = System.Data.Entity.EntityState.Modified;

				var deletedFiles = Request.Form.GetValues("deletedFiles[]");
				if (deletedFiles != null)
				{
					foreach (var imageName in deletedFiles)
					{
						var image = db.HinhAnh.FirstOrDefault(ha => ha.URL == imageName && ha.MaNT == nhaTro.MaNT);
						if (image != null)
						{
							var imagePath = Server.MapPath("~/uploads/" + image.URL);
							if (System.IO.File.Exists(imagePath))
							{
								System.IO.File.Delete(imagePath);
							}
							db.HinhAnh.Remove(image);
						}
					}
				}

				db.SaveChanges();
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
						var file = imgFiles[i];
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
				return Json(new { status = "success", message = "Sửa thông tin thành công" });
			}
			catch (Exception ex)
			{
				return Json(new { status = "fail", message = $"Lỗi khi sửa: {ex}" });
			}
		}


		public ActionResult Delete(string maNT) {
			try
			{
				int maNTInt = int.Parse(maNT);
				var nhaTro = db.NhaTro.Find(maNTInt);

				if (nhaTro == null)
				{
					return Json(new { status = "fail", message = "Không tìm thấy nhà trọ để xóa" });
				}
				// Xóa các hình ảnh liên quan
				var hinhAnhList = db.HinhAnh.Where(ha => ha.MaNT == maNTInt).ToList();
				foreach (var hinhAnh in hinhAnhList)
				{
					var imagePath = Server.MapPath("~/uploads/" + hinhAnh.URL);
					if (System.IO.File.Exists(imagePath))
					{
						System.IO.File.Delete(imagePath);
					}
					db.HinhAnh.Remove(hinhAnh);
				}

				// Xóa nhà trọ
				db.NhaTro.Remove(nhaTro);
				db.SaveChanges();
				

				return Json(new { status = "success", message = "Xóa nhà trọ thành công" });
			}
			catch (Exception ex)
			{
				return Json(new { status = "fail", message = $"Lỗi khi xóa nhà trọ: {ex.Message}" });
			}
		}
	}
}