namespace Terrasoft.Configuration
{
	using System;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.Web;
	using Terrasoft.Configuration.Lua;
	using Terrasoft.Core;

	#region Class: LuaExecutorService

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class LuaExecutorService
	{

		private UserConnection _userConnection;

		private UserConnection UserConnection {
			get {
				if (_userConnection != null) {
					return _userConnection;
				}
				if (HttpContext.Current.Session != null) {
					_userConnection = HttpContext.Current.Session["UserConnection"] as UserConnection;
				}
				return _userConnection;
			}
		}

		/// <summary>
		/// Executes Lua script with <paramref name="code"/>.
		/// </summary>
		/// <param name="code">Code.</param>
		/// <returns>Service response.</returns>
		public ConfigurationServiceResponse Execute(string code) {
			var response = new ConfigurationServiceResponse();
			var script = new LuaScript();
			script.Set("userConnection", UserConnection);
			try {
				script.Execute(code);
			} catch (Exception e) {
				response.Exception = e;
			}
			return response;
		}
	}

	#endregion

}
