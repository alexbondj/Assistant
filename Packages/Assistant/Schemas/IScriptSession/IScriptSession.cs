namespace Terrasoft.Configuration.Assistant
{

	//todo
	public interface IScriptSession {

		T GetVariable<T>(string name);

		void SetVariable<T>(string name, T value);
		
		bool Execute(string script);

	}

}