call %~dp0\init.bat
"%CORE_PATH%\TSBpm\Bin\Debug\Terrasoft.Tools.WorkspaceConsole.exe" --autoExit --operation=InstallPackagesFromWorkingCopy --workingCopyPath=%PKG_PATH% --workspaceName=Default --skipCompile=true --packageName="Assistant"
pause