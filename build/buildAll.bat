del /Q /F logs\update\*.*
set StyleCopEnabled=false
set CODE_ANALYSIS=false
set packages = 
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" TSBpm\Src\Lib\TSLib.sln /m /t:Terrasoft_WebApp\Terrasoft_WebApp_Loader;Terrasoft_WebApp\Terrasoft_WebApp;Terrasoft_Tools_WorkspaceConsole\Terrasoft_Tools_WorkspaceConsole /p:Configuration="Debug" /p:Platform="Any CPU" /p:BuildProjectReferences=true
TSBpm\Bin\Debug\Terrasoft.Tools.WorkspaceConsole.exe --autoExit --operation=InstallPackagesFromWorkingCopy --workingCopyPath=%cd%\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Pkg --workspaceName=Default --skipCompile=true --packageName="Assistant"
TSBpm\Bin\Debug\Terrasoft.Tools.WorkspaceConsole.exe --autoExit --operation=UpdateWorkspaceSolution --workspaceName=Default --webApplicationPath="%cd%\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp" >  logs\update\solution_update.log
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Terrasoft.Configuration.sln /p:Configuration="Debug" /p:Platform="Any CPU" /p:BuildProjectReferences=true