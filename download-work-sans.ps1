$headers = @{'User-Agent' = 'Mozilla/5.0'}
$dir = "src\fonts\work-sans"

Write-Host "Downloading Work Sans fonts..."

# Normal weights
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32KxfXNig.woff2" -OutFile "$dir\WorkSans-Light.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K0nXNig.woff2" -OutFile "$dir\WorkSans-Regular.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K3vXNig.woff2" -OutFile "$dir\WorkSans-Medium.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGY_z_wNahGAdqQ43RhVcIgYT2Xz5u32K67QNig.woff2" -OutFile "$dir\WorkSans-Bold.woff2" -Headers $headers

# Italic weights - using latin version
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGYqz_wNahGAdqQ43Rh_eZDkv_1w4A.woff2" -OutFile "$dir\WorkSans-LightItalic.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGYqz_wNahGAdqQ43Rh_eZDkv_1w4A.woff2" -OutFile "$dir\WorkSans-Italic.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGYqz_wNahGAdqQ43Rh_eZDkv_1w4A.woff2" -OutFile "$dir\WorkSans-MediumItalic.woff2" -Headers $headers
Invoke-WebRequest -Uri "https://fonts.gstatic.com/s/worksans/v24/QGYqz_wNahGAdqQ43Rh_eZDkv_1w4A.woff2" -OutFile "$dir\WorkSans-BoldItalic.woff2" -Headers $headers

# Create woff copies
$files = Get-ChildItem "$dir\*.woff2"
foreach ($f in $files) {
    $woffName = $f.Name -replace '\.woff2$', '.woff'
    Copy-Item $f.FullName "$dir\$woffName"
}

Write-Host "Done!"

