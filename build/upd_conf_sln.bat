call %~dp0\init.bat
"%CORE_PATH%\TSBpm\Bin\Debug\Terrasoft.Tools.WorkspaceConsole.exe" --autoExit --operation=UpdateWorkspaceSolution --workspaceName=Default --webApplicationPath="%CORE_PATH%\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp"
pause