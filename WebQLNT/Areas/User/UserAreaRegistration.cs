using System.Web.Mvc;

namespace WebQLNT.Areas.User
{
    public class UserAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "User";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
			context.MapRoute(
			  "User_default",
			  "User/{controller}/{action}/{id}",
			  new { controller = "TrangChu", action = "Index", id = UrlParameter.Optional }
		  );


			//context.MapRoute(
			//	"User_default",
			//	"User/{controller}/{action}/{id}",
			//	new { controller = "TrangChu", action = "Index", id = UrlParameter.Optional }
			//);

			//// Route mặc định cho area `User`
			//context.MapRoute(
			//	"User_main",
			//	"{controller}/{action}/{id}",
			//	new { area = "User", controller = "TrangChu", action = "Index", id = UrlParameter.Optional }
			//).DataTokens["area"] = "User";
		}
    }
}