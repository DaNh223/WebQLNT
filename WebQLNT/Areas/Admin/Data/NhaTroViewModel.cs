using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebQLNT.Areas.Admin.Data
{
	public class NhaTroViewModel
	{
		public int ID { get; set; }
		public string HinhNguoiDung { get; set; }
		public List<string> HinhTro { get; set; }
		public string Nguoidang { get; set; }
		public string Diachi { get; set; }
		public string sdt { get; set; }
		public string Tentro { get; set; }
		public double Dientich { get; set; }
		public double GiachoThue { get; set; }
		public double Giadien { get; set; }
		public double Gianuoc { get; set; }
		public string Mota { get; set; }
		public string Tienich { get; set; }
		public string TrangthaiDuyet { get; set; }
	}
}