Add-Type -AssemblyName System.Drawing

$assetDir = Join-Path (Split-Path -Parent $PSScriptRoot) 'assets'

function New-RoundedRectanglePath([single]$x, [single]$y, [single]$width, [single]$height, [single]$radius) {
  $path = [System.Drawing.Drawing2D.GraphicsPath]::new()
  $diameter = $radius * 2
  $path.AddArc($x, $y, $diameter, $diameter, 180, 90)
  $path.AddArc($x + $width - $diameter, $y, $diameter, $diameter, 270, 90)
  $path.AddArc($x + $width - $diameter, $y + $height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($x, $y + $height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()
  return $path
}

function New-TaskFlowImage([string]$outputPath, [bool]$transparent) {
  $bitmap = [System.Drawing.Bitmap]::new(1024, 1024)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

  $teal = [System.Drawing.ColorTranslator]::FromHtml('#087E75')
  $white = [System.Drawing.ColorTranslator]::FromHtml('#FFFFFF')
  $line = [System.Drawing.ColorTranslator]::FromHtml('#A9D8D1')
  $orange = [System.Drawing.ColorTranslator]::FromHtml('#F18B4C')
  $graphics.Clear($(if ($transparent) { [System.Drawing.Color]::Transparent } else { $teal }))

  $cardBrush = [System.Drawing.SolidBrush]::new($white)
  $linePen = [System.Drawing.Pen]::new($line, 35)
  $linePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $linePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen = [System.Drawing.Pen]::new($orange, 58)
  $checkPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $checkPen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
  $cardPath = New-RoundedRectanglePath 225 175 575 675 72

  $graphics.FillPath($cardBrush, $cardPath)
  $graphics.DrawLine($linePen, 340, 342, 650, 342)
  $graphics.DrawLine($linePen, 340, 465, 590, 465)
  $graphics.DrawLines($checkPen, [System.Drawing.Point[]]@(
    [System.Drawing.Point]::new(345, 650),
    [System.Drawing.Point]::new(455, 750),
    [System.Drawing.Point]::new(665, 555)
  ))

  $bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $cardPath.Dispose()
  $checkPen.Dispose()
  $linePen.Dispose()
  $cardBrush.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

New-TaskFlowImage (Join-Path $assetDir 'taskflow-icon.png') $false
New-TaskFlowImage (Join-Path $assetDir 'taskflow-foreground.png') $true
