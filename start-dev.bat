@echo off

start cmd /c npm run autobuild-api
start cmd /c npm run autobuild-front

start cmd /c npm run start-api REM Has to happen before API tests, so that the port is not in use
start cmd /c npm run start-front

start cmd /c npm run autotest-api
REM start cmd /c npm run autotest-front REM Disabled because front tests don't exist yet & we don't want false-positives

start code .
