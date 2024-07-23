using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebQLNT.Models;

namespace WebQLNT.Areas.User.ViewModel
{
	public class ThongTinTroViewModel
	{
		public int MaNT { get; set; }
		public string TenTro { get; set; }
		public string DiaChi { get; set; }
		public double DienTich { get; set; }
		public string TrangThai { get; set; }
		public decimal GiaPhong { get; set; }
		public decimal GiaDien { get; set; }
		public decimal GiaNuoc { get; set; }
		public string TienIch { get; set; }
		public string MoTa { get; set; }
		public string Lng { get; set; }
		public string Lat { get; set; }
		public string Tinh { get; set; }
		public string Quan { get; set; }
		public string Phuong { get; set; }

		public List<string> DanhSachHinhAnh { get; set; } // Example: just URLs
	}
}