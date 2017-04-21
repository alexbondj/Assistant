SET pakagePath=%cd%\..\Packages\Assistant
SET pkgDir=%cd%\..\..\TSBpm\Src\Lib\Terrasoft.WebApp.Loader\Terrasoft.WebApp\Terrasoft.Configuration\Pkg
mklink /D "%pkgDir%\Assistant" "%pakagePath%"