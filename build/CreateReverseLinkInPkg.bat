call %~dp0\init.bat
SET CURRENT_PKG_DIR=%~dp0..\..\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Pkg
ren "%CURRENT_PKG_DIR%" Pkg_Old
mklink /D "%CURRENT_PKG_DIR%" "%PKG_PATH%"
pause