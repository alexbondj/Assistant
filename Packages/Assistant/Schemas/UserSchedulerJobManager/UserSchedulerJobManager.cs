

namespace Terrasoft.Configuration.Assistant
{
	using System;
	using System.Collections.Generic;
	using Terrasoft.Common;
	using Terrasoft.Core;

	#region Class: UserSchedulerJobManager

	public class UserSchedulerJobManager
	{

		#region Class: UserJobInfo
		[Serializable]
		public class UserJobInfo
		{
			public string GropName;
			public string Name;
			public string Description;
			public string TriggerTypeName;
			public string TriggerStage;
			public DateTime NextFireTime;
			public DateTime PrevFireTime;

		}

		#endregion

		#region Constructors: Public

		public UserSchedulerJobManager(UserConnection userConnection) {
			UserConnection = userConnection;
		}

		#endregion

		#region Properties: Protected

		protected UserConnection UserConnection { get; private set; }

		private QuartzSchedulerInfoProxy _infoProxy;
		protected QuartzSchedulerInfoProxy InfoProxy {
			get { return _infoProxy ?? (_infoProxy = new QuartzSchedulerInfoProxy()); }
			private set { _infoProxy = value; }
		}

		#endregion

		#region Methods: Private

		private IEnumerable<UserJobInfo> ToUserJobList(JobInfo[] jobsInfo) {
			var userJiList = new List<UserJobInfo>();
			jobsInfo.ForEach(jobInfo => userJiList.Add(CreateUserJobInfo(jobInfo)));
			return userJiList;
		}

		private UserJobInfo CreateUserJobInfo(JobInfo jobInfo) {
			var userJi = new UserJobInfo {
				Name = jobInfo.Name,
				GropName = jobInfo.GropName,
				Description = jobInfo.Description,
				TriggerTypeName = jobInfo.TriggerTypeName,
				TriggerStage = jobInfo.TriggerStage,
				NextFireTime = ToUserTime(jobInfo.NextFireTime),
				PrevFireTime = ToUserTime(jobInfo.PrevFireTime)
			};
			return userJi;
		}

		private DateTime ToUserTime(DateTimeOffset? dateTimeOffset) {
			return dateTimeOffset.HasValue
				? dateTimeOffset.Value.GetDateTime(UserConnection.CurrentUser.TimeZone)
				: DateTime.MinValue;
		}

		#endregion

		#region Methods: Protected

		protected string[] GetKeys() {
			var keys = new List<string>();
			keys.Add("Terrasoft.Configuration.NotificationsJob");
			return keys.ToArray();
		}

		#endregion

		#region Methods: Public

		public IEnumerable<UserJobInfo> GetJobInfos() {
			var jobsList = InfoProxy.GetJobsInfoByList(GetKeys());
			return ToUserJobList(jobsList);
		}

		#endregion

	}

	#endregion

}


