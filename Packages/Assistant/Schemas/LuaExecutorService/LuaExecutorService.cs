namespace Terrasoft.Configuration
{
	using System;
	using System.Collections.Generic;
	using System.Runtime.Serialization;
	using System.ServiceModel;
	using System.ServiceModel.Activation;
	using System.ServiceModel.Web;
	using Terrasoft.Configuration.Lua;
	using Terrasoft.Web.Common;

	#region Class: LuaExecutorService

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class LuaExecutorService : BaseService
	{
		[DataContract]
		public class LuaExecutorServiceResponse : ConfigurationServiceResponse
		{
			#region Properties: Public

			/// <summary>
			/// Script result value.
			/// </summary>
			[DataMember(Name = "Value")]
			public object Value { get; set; }

			#endregion
		}

		/// <summary>
		/// Executes Lua script with <paramref name="code"/>.
		/// </summary>
		/// <param name="code">Code.</param>
		/// <returns>Service response.</returns>
		[OperationContract]
		[WebInvoke(Method = "POST", 
			BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		public LuaExecutorServiceResponse Execute(string code) {
			var response = new LuaExecutorServiceResponse();
			IScriptSession session = new LuaScript();
			session.Set("userConnection", UserConnection);
			try {
				var returnedValue = session.Execute<object>(code);
				response.Value = returnedValue;
			} catch (Exception e) {
				response.Exception = e;
			}
			return response;
		}

		/// <summary>
		/// Executes Lua script by its name.
		/// </summary>
		/// <param name="name">Script name.</param>
		/// <returns>Service response.</returns>
		[OperationContract]
		[WebInvoke(Method = "POST",
			BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json,
			ResponseFormat = WebMessageFormat.Json)]
		public LuaExecutorServiceResponse ExecuteByName(string name) {
			var response = new LuaExecutorServiceResponse();
			var assistantScript = new AssistantScript(UserConnection);
			if (!assistantScript.FetchFromDB(new Dictionary<string, string> { { "Name", name } })) {
				var errorMsg = string.Format("Unable to find script with name {0}", name);
				var e = new Exception(errorMsg);
				response.SetErrorInfo(e);
			} else {
				IScriptSession session = new LuaScript();
				session.Set("userConnection", UserConnection);
				try {
					var returnedValue = session.Execute<object>(assistantScript.Code);
					response.Value = returnedValue;
				} catch (Exception e) {
					response.Exception = e;
				}
			}
			return response;
		}
	}

	#endregion

}
