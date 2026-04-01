New-Item -ItemType Directory -Force "C:\Users\admin\Desktop\cc web test exp\scripts\logs" | Out-Null

$action  = New-ScheduledTaskAction -Execute "C:\Users\admin\Desktop\cc web test exp\scripts\run_update.bat"
$trigger = New-ScheduledTaskTrigger -Daily -At "15:00"
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable

Register-ScheduledTask -TaskName "AIFrontier_DailyUpdate" -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Host "OK"
Get-ScheduledTask -TaskName "AIFrontier_DailyUpdate" | Select-Object TaskName, State
