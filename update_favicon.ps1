$tag = "<link rel=""icon"" type=""image/svg+xml"" href=""data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' fill='%231A1714'/><text y='.9em' font-size='75' x='12' fill='%23C9A96E' font-family='serif'>L</text></svg>"">"

$files = Get-ChildItem ".\*.html"
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if (-not $content.Contains("<link rel=""icon""")) {
        $content = $content -replace "(?i)</head>", "  $tag`n</head>"
        [System.IO.File]::WriteAllText($f.FullName, $content)
    }
}
