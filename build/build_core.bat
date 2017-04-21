call %~dp0\init.bat
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" ..\..\TSBpm\Src\Lib\TSLib.sln /m /t:Terrasoft_WebApp\Terrasoft_WebApp_Loader;Terrasoft_WebApp\Terrasoft_WebApp;Terrasoft_Tools_WorkspaceConsole\Terrasoft_Tools_WorkspaceConsole /p:Configuration="Debug" /p:Platform="Any CPU" /p:BuildProjectReferences=true
