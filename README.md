# 🎧 Spotify Auth App

A React-based app that uses Spotify's OAuth 2.0 Authorization Code Flow with PKCE to authenticate users and display their playlists and liked songs. Inspired by Spotify’s UI and built using React, TailwindCSS, and the Spotify Web API.

## 🚀 Live Demo

👉 [Live App](https://your-vercel-or-netlify-link.com)

## 🔧 Tech Stack

- React.js
- TailwindCSS
- React Router
- Spotify Web API
- OAuth 2.0 (PKCE Flow)

## ⚙️ Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/spotify-auth-app.git
   cd spotify-auth-app
2. Install dependencies
3. Create a .env file in the root
4. Run the app

 Assumptions
* The Spotify Developer app is correctly configured with the redirect URI.
* The app uses preview_url from Spotify tracks. Many tracks may not include a preview and return null.
* For full track playback, Spotify Premium and Web Playback SDK are needed (not included in this app).
