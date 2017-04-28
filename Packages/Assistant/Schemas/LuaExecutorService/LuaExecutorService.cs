namespace Terrasoft.Configuration
{
	using System;
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
			var script = new LuaScript();
			script.Set("userConnection", UserConnection);
			try {
				var returnedValue = script.Execute<object>(code);
				response.Value = returnedValue;
			} catch (Exception e) {
				response.Exception = e;
			}
			return response;
		}
	}

	#endregion

}
