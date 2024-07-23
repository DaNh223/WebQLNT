using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebQLNT
{
	public class RouteConfig
	{
		public static void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


			routes.MapRoute(
			   name: "Default",
			   url: "{controller}/{action}/{id}",
			   defaults: new { area = "User", controller = "TrangChu", action = "Index", id = UrlParameter.Optional }
		   ).DataTokens["area"] = "User";

			//routes.MapRoute(
			//   name: "Default",
			//   url: "{controller}/{action}/{id}",
			//   defaults: new { area = "Admin", controller = "DSBaiDang", action = "Index", id = UrlParameter.Optional }
			//).DataTokens["area"] = "Admin";


			//// Route mặc định trỏ đến area `User`
			//routes.MapRoute(
			//	name: "Default",
			//	url: "{controller}/{action}/{id}",
			//	defaults: new { area = "User", controller = "TrangChu", action = "Index", id = UrlParameter.Optional }
			//).DataTokens["area"] = "User";

			//// Route mặc định trỏ đến area `Admin`
			//routes.MapRoute(
			//	name: "Admin",
			//	url: "{controller}/{action}/{id}",
			//	defaults: new { area = "Admin", controller = "DSBaiDang", action = "Index", id = UrlParameter.Optional }
			//).DataTokens["area"] = "Admin";

			//routes.MapRoute(
			//	name: "Default",
			//	url: "{controller}/{action}/{id}",
			//	defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
			//);
		}
	}
}
