namespace Terrasoft.Configuration.Assistant
{
	using System.ServiceModel;
	using System.ServiceModel.Web;
	using System.ServiceModel.Activation;
	using System.Web;
	using Terrasoft.Core;
	using System;
	using System.Collections.Generic;
	using CoreSysSettings = Terrasoft.Core.Configuration.SysSettings;

	[ServiceContract]
	[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Required)]
	public class QuartzSchedulerProxyService
	{
		#region Methods: Public

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public IEnumerable<UserSchedulerJobManager.UserJobInfo> GetJobInfo() {
			var userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
			var jManager = new UserSchedulerJobManager(userConnection);
			return jManager.GetJobInfos();
		}

		[OperationContract]
		[WebInvoke(Method = "POST", BodyStyle = WebMessageBodyStyle.Wrapped,
			RequestFormat = WebMessageFormat.Json, ResponseFormat = WebMessageFormat.Json)]
		public void RunJob() {
			var userConnection = (UserConnection)HttpContext.Current.Session["UserConnection"];
			throw new NotImplementedException();
			return;
		}

		#endregion
	}
}
