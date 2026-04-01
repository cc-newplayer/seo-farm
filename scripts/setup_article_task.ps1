New-Item -ItemType Directory -Force "C:\Users\admin\Desktop\cc web test exp\scripts\logs" | Out-Null

$action   = New-ScheduledTaskAction -Execute "C:\Users\admin\Desktop\cc web test exp\scripts\generate_article.bat"
$trigger  = New-ScheduledTaskTrigger -Daily -At "13:00"
$settings = New-ScheduledTaskSettingsSet -StartWhenAvailable

Register-ScheduledTask -TaskName "AIFrontier_ArticleGenerate" -Action $action -Trigger $trigger -Settings $settings -Force | Out-Null

Write-Host "OK"
Get-ScheduledTask -TaskName "AIFrontier_ArticleGenerate" | Select-Object TaskName, State
