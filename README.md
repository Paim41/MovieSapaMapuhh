# MovieSapaMapuh — Interactive Landing Page

An independent, interactive **NOIR Crimson** marketing website for **MovieSapaMapuh**, prepared for deployment on **Vercel**.

This repository contains the landing page **only**. The actual Android application, PHP server, and GitHub Releases are maintained separately in [Paim41/MovieSapaMapuh](https://github.com/Paim41/MovieSapaMapuh).

## Features

- Responsive dark/crimson layout and mobile navigation.
- Interactive demonstration of the app's five areas: **Home, Search, Library, Addons, and Settings**. All demo interactions run locally in the browser; they do **not** connect to the application server.
- Mock category search, library filters, animated reveals, an optional cursor spotlight, interactive Si Youyou walking-loader frames, copy-local-URL control, and accessible navigation.
- Direct **Download APK** links to the official GitHub testing pre-release.
- Contact/developer credits and attribution to the upstream PencariMovie Server project.

The website uses visuals extracted from the supplied single-file landing page, including the official logo/wordmark and Si Youyou animation frames. The retired interactive pet and YouTube Playlist Integration are not advertised as app features.

## File structure

```text
MovieSapaMapuhh-Landing/
├── index.html                    # Page structure and content
├── css/
│   └── styles.css                # NOIR Crimson layout, effects, and responsiveness
├── js/
│   └── main.js                   # Interactive demo and UI behavior
├── assets/
│   ├── brand/
│   │   ├── icon.webp
│   │   └── wordmark.webp
│   └── character/
│       ├── walk-01.webp
│       ├── walk-02.webp
│       ├── walk-03.webp
│       └── walk-04.webp
├── vercel.json                   # Static site Vercel settings
└── README.md
```

## Run locally

No framework, install step, Node dependencies, or environment variables are required. From this repository's root:

```bash
python -m http.server 8080
```

Then open **http://localhost:8080**. (On Windows, `py -m http.server 8080` also works.) A local HTTP server is recommended instead of double-clicking the HTML file.

## Deploy to Vercel

1. Sign in to [Vercel](https://vercel.com/) and select **Add New → Project**.
2. Import the GitHub repository **`Paim41/MovieSapaMapuhh`**.
3. Choose **Framework Preset: Other** (static HTML).
4. Leave **Build Command** empty/disabled, **Root Directory** as `./`, and **Output Directory** as the repository root (or leave it blank when Vercel detects the static site correctly).
5. Click **Deploy**. `index.html` is the landing page; assets and relative paths work from the project root.

Vercel automatically redeploys the site when changes are pushed to the connected branch. The GitHub repository and the hosting deployment are separate—pushing code does not by itself make the URL live.

## Release link and limitations

The **Download APK** button targets [MovieSapaMapuh v1.0.5-preview.1](https://github.com/Paim41/MovieSapaMapuh/releases/tag/v1.0.5-preview.1). It is a **debug-signed testing APK**, not a stable production release. Updates over another installation may fail when signing keys differ. Back up app data before reinstalling. If a later release is published, update the links in `index.html`.

The dashboard interface on this page is a **design demo**, not a player, live account session, or operational streaming server. Movie/series availability depends on the user's authorized sources. The website collects no bot tokens or Telegram credentials.

## Design and credits

- **Background:** `#0C0C0F`
- **Surface:** `#222228`
- **Crimson accent:** `#F04452`
- **Text:** `#F7F7F8`
- **Muted:** `#AFAFB9`
- **Fonts:** DM Sans and Space Grotesk (loaded from Google Fonts, with system fallbacks)

Landing-page branding/design by [Paim](https://github.com/Paim41/). The app is a customization of [PencariMovie Server](https://github.com/aiskendi/pencarimovie-server); upstream attributions remain applicable. See the Android app's [LICENSE](https://github.com/Paim41/MovieSapaMapuh/blob/main/LICENSE) and [third-party notices](https://github.com/Paim41/MovieSapaMapuh/blob/main/THIRD_PARTY_NOTICES.md).
