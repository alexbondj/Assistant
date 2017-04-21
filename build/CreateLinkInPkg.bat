call %~dp0\init.bat
SET pkgDir=%~dp0..\..\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Pkg
mklink /D "%pkgDir%\Assistant" "%PKG_PATH%\Assistant"
pause