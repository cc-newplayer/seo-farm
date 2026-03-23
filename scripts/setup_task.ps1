New-Item -ItemType Directory -Force "C:\Users\PC666\cc web test\scripts\logs" | Out-Null

$action  = New-ScheduledTaskAction -Execute "C:\Users\PC666\cc web test\scripts\run_update.bat"
$trigger = New-ScheduledTaskTrigger -Daily -At "08:00"
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable

Register-ScheduledTask -TaskName "AIFrontier_DailyUpdate" -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Host "OK"
Get-ScheduledTask -TaskName "AIFrontier_DailyUpdate" | Select-Object TaskName, State
