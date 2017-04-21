call %~dp0\init.bat
"C:\Program Files (x86)\MSBuild\14.0\Bin\MSBuild.exe" "%CORE_PATH%\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Terrasoft.Configuration.sln" /p:Configuration="Debug" /p:Platform="Any CPU" /p:BuildProjectReferences=true
pause