$files = Get-ChildItem ".\*.html"
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    
    # Extract title
    $title = ""
    if ($content -match "(?is)<title>(.*?)</title>") {
        $title = $Matches[1]
    }
    
    # Extract description
    $desc = ""
    if ($content -match "(?is)<meta name=`"description`" content=`"(.*?)`"") {
        $desc = $Matches[1]
    }
    
    $filename = $f.Name
    
    $ogTags = "`n<meta property=`"og:type`" content=`"website`">`n"
    $ogTags += "<meta property=`"og:site_name`" content=`"LUXE`">`n"
    $ogTags += "<meta property=`"og:url`" content=`"$filename`">`n"
    $ogTags += "<meta property=`"og:title`" content=`"$title`">`n"
    $ogTags += "<meta property=`"og:description`" content=`"$desc`">`n"
    $ogTags += "<meta property=`"og:image`" content=`"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80`">"

    if (-not $content.Contains("property=`"og:type`"")) {
        $content = $content -replace "(?i)</head>", "$ogTags`n</head>"
        [System.IO.File]::WriteAllText($f.FullName, $content)
    }
}
