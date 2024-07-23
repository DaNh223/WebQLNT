using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebQLNT.Models;
using static System.Net.WebRequestMethods;
using System.Web.Helpers;

namespace WebQLNT.Areas.User.Controllers
{
    public class DangKyController : Controller
    {
		// GET: User/DangKy
		private QLNTEntities db = new QLNTEntities();

		public ActionResult Index()
        {
            return View();
        }

		[HttpPost]
		public ActionResult CheckInputRegister(FormCollection form)
		{
			string userName = form["userName"];
			string dateOfBirth = form["dateOfBirth"];
			string phoneNumber = form["phoneNumber"];
			string address = form["address"];
			string email = form["email"];
			string password = form["password"];
			string confirm_password = form["confirm_password"];

			// Convert dateOfBirth from string to DateTime
			DateTime parsedDateOfBirth;
			if (!DateTime.TryParse(dateOfBirth, out parsedDateOfBirth))
			{
				return Json(new { status = "fail", dateOfBirthCheck = "fail" });
			}

			var user = db.TaiKhoan.FirstOrDefault(t => t.Email == email.Trim());
			if (user != null)
			{
				return Json(new { status = "fail", emailCheck = "fail" });
			}
			else if (phoneNumber.Length < 10)
			{
				return Json(new { status = "fail", phoneCheck = "fail" });
			}
			else if (password.Length < 8)
			{
				return Json(new { status = "fail", passwordCheck = "fail" });
			}
			else if (confirm_password.Length < 8)
			{
				return Json(new { status = "fail", confirmPassCheck = "fail" });
			}
			else if (password != confirm_password)
			{
				return Json(new { status = "fail", passEqualCheck = "fail" });
			}
			else
			{
				Session["OTP"] = generateOTP();
				var OTP = Session["OTP"].ToString();

				Session["registerUserName"] = userName.Trim();
				Session["registerDateOfBirth"] = parsedDateOfBirth.ToString("dd-MM-yyyy").Trim();
				Session["registerPhoneNumber"] = phoneNumber.Trim();
				Session["registerAddress"] = address.Trim();
				Session["registerEmail"] = email.Trim();
				Session["registerPassword"] = password.Trim();

				SendOTP(email, OTP);
				return Json(new { status = "success" });
			}
		}

		public string generateOTP()
		{
			Random random = new Random();

			int otp = random.Next(0, 10000);

			string otpString = otp.ToString("D4");
			return otpString;
		}

		public void SendOTP(string email, string OTP)
		{
			string fromMail = "hetyty123@gmail.com";
			string fromPassword = "iktbcxmgequbnrvc";

			MailMessage msg = new MailMessage();
			msg.From = new MailAddress(fromMail);
			msg.Subject = "Mã OTP xác nhận";
			msg.To.Add(new MailAddress(email));
			msg.Body = $"<html><body><p><span style=\"font-size: 18pt;\"><strong>Mã OTP xác nhận:&nbsp;</strong></span></p>\r\n<p><span style=\"font-size: 14pt; color: rgb(35, 111, 161);\">{OTP}</span></p></body></html>";
			msg.IsBodyHtml = true;

			try
			{
				using (var smtpClient = new SmtpClient("smtp.gmail.com"))
				{
					smtpClient.Port = 587;
					smtpClient.Credentials = new NetworkCredential(fromMail, fromPassword);
					smtpClient.EnableSsl = true;
					smtpClient.Send(msg);
				}
			}
			catch (Exception ex)
			{
				// Log hoặc xử lý lỗi
				Console.WriteLine("Lỗi khi gửi email: " + ex.Message);
			}
		}

		[HttpPost]
		public ActionResult CheckOTP(FormCollection form)
		{
			string otp1 = form["otp1"];
			string otp2 = form["otp2"];
			string otp3 = form["otp3"];
			string otp4 = form["otp4"];
			if (string.IsNullOrEmpty(otp1.Trim()))
			{
				return Json(new { status = "fail", otp1Check = "fail" });
			}
			else if (string.IsNullOrEmpty(otp2.Trim()))
			{
				return Json(new { status = "fail", otp2Check = "fail" });
			}
			else if (string.IsNullOrEmpty(otp3.Trim()))
			{
				return Json(new { status = "fail", otp3Check = "fail" });
			}
			else if (string.IsNullOrEmpty(otp4.Trim()))
			{
				return Json(new { status = "fail", otp4Check = "fail" });
			}
			else
			{
				string inputOTP = otp1 + otp2 + otp3 + otp4;
				if (inputOTP == Session["OTP"].ToString())
				{
					string username = Session["registerUserName"].ToString();
					string dateOfBirth = Session["registerDateOfBirth"].ToString();
					string phoneNumber = Session["registerPhoneNumber"].ToString();
					string address = Session["registerAddress"].ToString();
					string email = Session["registerEmail"].ToString();
					string password = Session["registerPassword"].ToString();

					var taiKhoan = new TaiKhoan
					{
						Email = email,
						Password = password
					};

					db.TaiKhoan.Add(taiKhoan);
					db.SaveChanges();

					var nguoiDung = new NguoiDung
					{
						TenND = username,
						NgaySinh = DateTime.Parse(dateOfBirth),
						SDT = phoneNumber,
						DiaChi = address,
						MaTK = taiKhoan.MaTK,
						LoaiND = "CT"
					};
					db.NguoiDung.Add(nguoiDung);
					db.SaveChanges();

					return Json(new { status = "success" });
				}
				else
				{
					Session.Remove("OTP");
					return Json(new { status = "fail" , otp = inputOTP});
				}
			}
		}

		[HttpPost]
		public ActionResult ResendOTP()
		{
			string email = Session["registerEmail"].ToString();
			Session["OTP"] = generateOTP();
			string OTP = Session["OTP"].ToString();
			SendOTP(email, OTP);
			return Json(new { status = "success", mail = email, otp = OTP });
		}
	}
}