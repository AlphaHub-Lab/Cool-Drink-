# No Filter / Antigravity MCP installer
# Windows PowerShell
# This script installs prerequisites only when missing, then verifies the MCP packages.

$ErrorActionPreference = "Stop"

Write-Host "=== No Filter Antigravity MCP Setup ===" -ForegroundColor Cyan

function Test-Cmd($name) {
    return $null -ne (Get-Command $name -ErrorAction SilentlyContinue)
}

if (-not (Test-Cmd "node")) {
    Write-Host "Node.js is required. Install current Node.js LTS from https://nodejs.org/ and rerun this script." -ForegroundColor Yellow
    exit 1
}
if (-not (Test-Cmd "npx")) {
    Write-Host "npx is missing. Reinstall Node.js LTS and rerun." -ForegroundColor Yellow
    exit 1
}

$nodeVersion = node -v
Write-Host "Node: $nodeVersion"

if (-not (Test-Cmd "uvx")) {
    Write-Host "uv/uvx is missing. Installing uv with winget..." -ForegroundColor Yellow
    if (Test-Cmd "winget") {
        winget install --id=astral-sh.uv -e --accept-source-agreements --accept-package-agreements
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    }
}
if (-not (Test-Cmd "uvx")) {
    Write-Host "uvx is still unavailable. Install uv from https://docs.astral.sh/uv/ and rerun." -ForegroundColor Yellow
    exit 1
}

$checks = @(
    @{ Name="Chrome DevTools MCP"; Cmd=@("npx","-y","chrome-devtools-mcp@latest","--no-usage-statistics","--help") },
    @{ Name="Playwright MCP"; Cmd=@("npx","-y","@playwright/mcp@latest","--help") },
    @{ Name="Filesystem MCP"; Cmd=@("npx","-y","@modelcontextprotocol/server-filesystem","--help") },
    @{ Name="Git MCP"; Cmd=@("uvx","mcp-server-git","--help") },
    @{ Name="Fetch MCP"; Cmd=@("uvx","mcp-server-fetch","--help") },
    @{ Name="Memory MCP"; Cmd=@("npx","-y","@modelcontextprotocol/server-memory","--help") },
    @{ Name="Sequential Thinking MCP"; Cmd=@("npx","-y","@modelcontextprotocol/server-sequential-thinking","--help") }
)

foreach ($c in $checks) {
    Write-Host "`nChecking $($c.Name)..." -ForegroundColor Green
    & $c.Cmd[0] $c.Cmd[1..($c.Cmd.Count-1)] | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "$($c.Name) check returned exit code $LASTEXITCODE. The package may still be usable; inspect Antigravity MCP logs." -ForegroundColor DarkYellow
    } else {
        Write-Host "$($c.Name): OK" -ForegroundColor Green
    }
}

Write-Host "`nCopy mcp_config.json to your project at .agents/mcp_config.json." -ForegroundColor Cyan
Write-Host "Then reload/restart Antigravity and inspect MCP Servers for the seven local servers." -ForegroundColor Cyan
