set Major=7
set Minor=10
set Build=0
del /Q /F .\..\..\TSBpm\Src\Lib\*\AssemblyInfo.cs
call %~dp0\build_core.bat
call %~dp0\upd_conf.bat
call %~dp0\upd_conf_sln.bat
call %~dp0\build_conf.bat

