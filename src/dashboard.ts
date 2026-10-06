export const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PaaS Status Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        :root {
            --bg-color: #050505;
            --card-bg: rgba(20, 20, 20, 0.6);
            --card-border: rgba(255, 255, 255, 0.08);
            --text-primary: #ffffff;
            --text-secondary: #a1a1aa;
            --accent: #38bdf8;
            --accent-glow: rgba(56, 189, 248, 0.15);
            --success: #4ade80;
            --font-main: 'Outfit', sans-serif;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: var(--font-main);
            min-height: 100vh;
            overflow-x: hidden;
            position: relative;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E");
        }

        .background-glow {
            position: absolute;
            top: -20%;
            left: 50%;
            transform: translateX(-50%);
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, var(--accent-glow) 0%, rgba(5,5,5,0) 70%);
            z-index: -1;
            pointer-events: none;
        }

        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 2rem;
        }

        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--card-border);
            margin-bottom: 4rem;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.02em;
            color: var(--text-primary);
        }

        .logo i {
            color: var(--accent);
        }

        nav a {
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.9rem;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        nav a:hover, nav a.active {
            color: var(--text-primary);
        }

        .btn-lang {
            background: transparent;
            border: 1px solid var(--card-border);
            color: var(--text-secondary);
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            font-family: var(--font-main);
            font-size: 0.85rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            transition: all 0.2s ease;
        }

        .btn-lang:hover {
            color: var(--text-primary);
            border-color: rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.05);
        }

        .hero {
            text-align: center;
            margin-bottom: 4rem;
            animation: fadeUp 0.8s ease-out;
        }

        .hero h1 {
            font-size: 3.5rem;
            font-weight: 600;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero p {
            color: var(--text-secondary);
            font-size: 1.1rem;
            max-width: 500px;
            margin: 0 auto;
            line-height: 1.6;
        }

        .status-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
            animation: fadeUp 1s ease-out backwards;
            animation-delay: 0.2s;
        }

        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            padding: 1.5rem;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            border-color: rgba(255, 255, 255, 0.15);
        }

        .card-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .card-header i {
            color: var(--text-secondary);
            width: 20px;
            height: 20px;
        }

        .card-header h3 {
            font-size: 1rem;
            font-weight: 500;
            color: var(--text-secondary);
        }

        .status-card .card-body {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-grow: 1;
        }

        .status-indicator {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--text-secondary);
            transition: all 0.3s ease;
        }

        .status-indicator.online {
            background: var(--success);
            box-shadow: 0 0 16px rgba(74, 222, 128, 0.5);
        }

        .status-text {
            font-size: 1.35rem;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;
            padding-top: 1rem;
            border-top: 1px solid var(--card-border);
            font-size: 0.85rem;
        }

        .meta-label {
            color: var(--text-secondary);
        }

        .meta-value {
            color: var(--text-primary);
            font-weight: 500;
        }

        .endpoint-card .card-body {
            background: rgba(0, 0, 0, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 10px;
            padding: 1.25rem;
            margin-bottom: 1.5rem;
            flex-grow: 1;
            overflow-x: auto;
        }

        .json-code {
            font-family: 'Courier New', Courier, monospace;
            font-size: 0.95rem;
            line-height: 1.5;
            color: var(--text-secondary);
        }

        .btn-primary {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--card-border);
            color: var(--text-primary);
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-family: var(--font-main);
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            transition: all 0.2s ease;
        }

        .btn-primary:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: rgba(255, 255, 255, 0.25);
        }

        .btn-primary:active {
            transform: scale(0.98);
        }

        .btn-primary i {
            width: 16px;
            height: 16px;
        }

        .spinning {
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            100% { transform: rotate(360deg); }
        }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
            .status-grid {
                grid-template-columns: 1fr;
            }
            
            .hero h1 {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="background-glow"></div>
    <div class="container">
        <header>
            <div class="logo">
                <i data-lucide="cloud-lightning"></i>
                <span>EdgeNova</span>
            </div>
            <nav style="display: flex; align-items: center; gap: 2rem;">
                <div style="display: flex; gap: 2rem;">
                    <a href="#" class="active" id="nav-1">Overview</a>
                    <a href="#" id="nav-2">Endpoints</a>
                    <a href="#" id="nav-3">Settings</a>
                </div>
                <button class="btn-lang" onclick="toggleLanguage()" id="lang-btn">
                    <i data-lucide="globe"></i> ID
                </button>
            </nav>
        </header>

        <main>
            <div class="hero">
                <h1 id="hero-title">Serverless Edge Engine</h1>
                <p id="hero-desc">Lightning-fast Express.js deployment on Cloudflare Workers.</p>
            </div>

            <div class="status-grid">
                <div class="card status-card">
                    <div class="card-header">
                        <i data-lucide="activity"></i>
                        <h3 id="card1-title">System Status</h3>
                    </div>
                    <div class="card-body">
                        <div class="status-indicator online"></div>
                        <span class="status-text" id="status-text">Checking...</span>
                    </div>
                    <div class="card-footer">
                        <span class="meta-label" id="card1-env">Environment</span>
                        <span class="meta-value">Cloudflare Workers</span>
                    </div>
                </div>

                <div class="card endpoint-card">
                    <div class="card-header">
                        <i data-lucide="network"></i>
                        <h3 id="card2-title">API Response (/api/status)</h3>
                    </div>
                    <div class="card-body">
                        <pre id="api-response-block"><code class="json-code">// Fetching...</code></pre>
                    </div>
                    <button class="btn-primary" onclick="fetchStatus()" id="btn-refresh">
                        <i data-lucide="refresh-cw" id="refresh-icon"></i> <span>Refresh Data</span>
                    </button>
                </div>
            </div>
        </main>
    </div>

    <script>
        const translations = {
            en: {
                nav1: "Overview",
                nav2: "Endpoints",
                nav3: "Settings",
                heroTitle: "Serverless Edge Engine",
                heroDesc: "Lightning-fast Express.js deployment on Cloudflare Workers.",
                card1Title: "System Status",
                card1Env: "Environment",
                card2Title: "API Response (/api/status)",
                btnRefresh: "Refresh Data",
                statusLoading: "Checking...",
                statusOk: "All Systems Operational",
                statusError: "Connection Failed",
                jsonError: "Error fetching data"
            },
            id: {
                nav1: "Ringkasan",
                nav2: "Endpoints",
                nav3: "Pengaturan",
                heroTitle: "Mesin Edge Serverless",
                heroDesc: "Deployment Express.js secepat kilat di atas arsitektur Cloudflare Workers.",
                card1Title: "Status Sistem",
                card1Env: "Lingkungan",
                card2Title: "Respons API (/api/status)",
                btnRefresh: "Perbarui Data",
                statusLoading: "Memeriksa...",
                statusOk: "Semua Sistem Beroperasi",
                statusError: "Koneksi Gagal",
                jsonError: "Gagal mengambil data dari server"
            }
        };

        let currentLang = 'en';
        let currentStatus = 'loading';

        function toggleLanguage() {
            currentLang = currentLang === 'en' ? 'id' : 'en';
            const displayCode = currentLang === 'en' ? 'ID' : 'EN';
            document.getElementById('lang-btn').innerHTML = \`<i data-lucide="globe"></i> \${displayCode}\`;
            lucide.createIcons();
            updateUI();
        }

        function updateUI() {
            const t = translations[currentLang];
            
            document.getElementById('nav-1').textContent = t.nav1;
            document.getElementById('nav-2').textContent = t.nav2;
            document.getElementById('nav-3').textContent = t.nav3;
            
            document.getElementById('hero-title').textContent = t.heroTitle;
            document.getElementById('hero-desc').textContent = t.heroDesc;
            
            document.getElementById('card1-title').textContent = t.card1Title;
            document.getElementById('card1-env').textContent = t.card1Env;
            
            document.getElementById('card2-title').textContent = t.card2Title;
            
            const btnRefresh = document.getElementById('btn-refresh');
            const iconSpinning = btnRefresh.querySelector('#refresh-icon').classList.contains('spinning');
            btnRefresh.innerHTML = \`<i data-lucide="refresh-cw" id="refresh-icon" class="\${iconSpinning ? 'spinning' : ''}"></i> <span>\${t.btnRefresh}</span>\`;
            lucide.createIcons();

            const statusText = document.getElementById('status-text');
            if (currentStatus === 'loading') statusText.textContent = t.statusLoading;
            else if (currentStatus === 'ok') statusText.textContent = t.statusOk;
            else if (currentStatus === 'error') statusText.textContent = t.statusError;
        }

        lucide.createIcons();

        async function fetchStatus() {
            const icon = document.getElementById('refresh-icon');
            icon.classList.add('spinning');
            const statusText = document.getElementById('status-text');
            const responseBlock = document.getElementById('api-response-block');
            const t = translations[currentLang];

            currentStatus = 'loading';
            statusText.textContent = t.statusLoading;
            statusText.style.color = "var(--text-primary)";
            
            try {
                // Fetch actual data from the Express backend on Cloudflare Workers
                const res = await fetch('/api/status');
                if (!res.ok) throw new Error('API failed');
                
                const data = await res.json();

                currentStatus = 'ok';
                statusText.textContent = t.statusOk;
                statusText.style.color = "#4ade80";
                
                const jsonString = JSON.stringify(data, null, 2)
                    .replace(/"(.*?)":/g, '<span style="color:#60a5fa;">"$1"</span>:')
                    .replace(/"(.*?)"(,?)$/gm, '<span style="color:#a78bfa;">"$1"</span>$2');

                responseBlock.innerHTML = \`<code class="json-code">\${jsonString}</code>\`;
            } catch (err) {
                currentStatus = 'error';
                statusText.textContent = t.statusError;
                statusText.style.color = "#f87171";
                responseBlock.innerHTML = \`<code class="json-code" style="color: #f87171;">\${t.jsonError}</code>\`;
            } finally {
                icon.classList.remove('spinning');
            }
        }

        setTimeout(fetchStatus, 500);
    </script>
</body>
</html>
`;
