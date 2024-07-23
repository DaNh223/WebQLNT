using System.Web.Mvc;

namespace WebQLNT.Areas.Admin
{
    public class AdminAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Admin";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {

			context.MapRoute(
			   "Admin_default",
			   "Admin/{controller}/{action}/{id}",
			   new { controller = "DSBaiDang", action = "Index", id = UrlParameter.Optional }
		   );

			//         context.MapRoute(
			//             "Admin_default",
			//             "Admin/{controller}/{action}/{id}",
			//             new {controller = "DSBaiDang", action = "Index", id = UrlParameter.Optional }
			//         );

			//// Route mặc định cho area `Admin`
			//context.MapRoute(
			//	"Admin_main",
			//	"{controller}/{action}/{id}",
			//	new { area = "Admin", controller = "DSBaiDang", action = "Index", id = UrlParameter.Optional }
			//).DataTokens["area"] = "Admin";
		}
    }
}