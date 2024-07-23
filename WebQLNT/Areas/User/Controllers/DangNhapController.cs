using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using WebQLNT.Models;
using static System.Net.WebRequestMethods;
using System.Web.Services.Description;

namespace WebQLNT.Areas.User.Controllers
{
	public class DangNhapController : Controller
	{
		private QLNTEntities db = new QLNTEntities();
		// GET: User/DangNhap
		public ActionResult Index()
		{
			return View();
		}

		[HttpPost]
		public ActionResult Login(FormCollection form)
		{
			string input_email = form["input_email"];
			string input_password = form["input_password"];
			bool remember = form["remember"] == "true";

			var user = db.TaiKhoan.FirstOrDefault(t => t.Email == input_email.Trim() && t.Password == input_password.Trim());
			if (user != null)
			{
				Session["loginID"] = user.MaTK;
				var NguoiDung = db.NguoiDung.FirstOrDefault(nd => nd.TaiKhoan.MaTK == user.MaTK);
				if (NguoiDung != null)
				{
					Session["userImg"] = NguoiDung.HinhND ?? "user_img.png";
					Session["LoaiND"] = NguoiDung.LoaiND;

					if (remember)
					{
						HttpCookie CookieLoginID = new HttpCookie("loginID", user.MaTK.ToString()) { Expires = DateTime.Now.AddDays(15) };
						Response.Cookies.Add(CookieLoginID);

						HttpCookie CookieUserImg = new HttpCookie("userImg", Session["userImg"].ToString()) { Expires = DateTime.Now.AddDays(15) };
						Response.Cookies.Add(CookieUserImg);

						HttpCookie CookieLoaiND = new HttpCookie("LoaiND", Session["LoaiND"].ToString()) { Expires = DateTime.Now.AddDays(15) };
						Response.Cookies.Add(CookieLoaiND);
					}

					string redirectUrl = NguoiDung.LoaiND == "Admin" ? "/Admin/DSBaiDang/Index" : "/User/DangTro/Index";
					return Json(new { status = "success", redirect = redirectUrl });
				}
			}
			return Json(new { status = "fail" });
		}


		[HttpPost]
		public ActionResult CheckLossPassEmail(string lossPassEmail)
		{
			var user = db.TaiKhoan.FirstOrDefault(t => t.Email == lossPassEmail.Trim());
			if (user != null)
			{
				Session["OTP"] = generateOTP();
				var OTP = Session["OTP"].ToString();
				Session["lossPassEmail"] = lossPassEmail.Trim();
				SendOTP(lossPassEmail, OTP);
				return Json(new { status = "success", otp = OTP});
			}
			else
			{
				return Json(new { status = "fail" });
			}
		}

		public string generateOTP() {
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
		public ActionResult CheckLossPassOTP(FormCollection form)
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
			else {
				string inputOTP = otp1 + otp2 + otp3 + otp4;
				if (inputOTP == Session["OTP"].ToString())
				{
					return Json(new { status = "success" });
				}
				else {
					Session.Remove("OTP");
					return Json(new { status = "fail" });
					//string otp = Session["OTP"].ToString();
					//return Json(new { inputOTP, otp});
				}
			}
		}

		[HttpPost]
		public ActionResult ResendOTP()
		{ 
			string lossPassEmail = Session["lossPassEmail"].ToString();
			Session["OTP"] = generateOTP();
			string OTP = Session["OTP"].ToString();
			SendOTP(lossPassEmail, OTP);
			return Json(new { status = "success" , mail = lossPassEmail, otp = OTP});
		}


		[HttpPost]
		public ActionResult ChangePass(FormCollection form)
		{
			string newPass = form["newPassword"];
			string newConfirmPass = form["confirmNewPassword"];
			string lossPassEmail = Session["lossPassEmail"].ToString();

			if (newPass.Length < 8)
			{
				return Json(new { status = "fail", newPassCheck = "fail" });
			}
			else if (newConfirmPass.Length < 8)
			{
				return Json(new { status = "fail", confirmPassCheck = "fail" });
			}
			else if (newPass != newConfirmPass)
			{
				return Json(new { status = "fail", passEqualCheck = "fail" });
			}
			else {
				var taiKhoan = db.TaiKhoan.SingleOrDefault(tk => tk.Email == lossPassEmail);
				taiKhoan.Password = newPass;
				db.SaveChanges();
				return Json(new { status = "success" });
			}

		}

		public ActionResult Logout()
		{
			Session.Clear();

			if (Request.Cookies != null)
			{
				foreach (string cookie in Request.Cookies.AllKeys)
				{
					HttpCookie httpCookie = new HttpCookie(cookie) { Expires = DateTime.Now.AddDays(-1) };
					Response.Cookies.Add(httpCookie);
				}
			}
			return RedirectToAction("Index");
			//return JavaScript("sessionStorage.removeItem('loginState'); window.location.href = '/User/DangNhap/Index';");
		}
	}
}