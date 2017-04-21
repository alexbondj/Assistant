call %~dp0\init.bat
SET pkgDir=%~dp0..\..\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Pkg
ren "%PKG_PATH%" "%PKG_PATH%_Old"
mklink /D "%PKG_PATH%" "%pkgDir%"
pause