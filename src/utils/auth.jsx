import { generateCodeVerifier, generateCodeChallenge } from "./pkce";

const CLIENT_ID = "bab626bb6bbd44b495c7e9f93ea01cdd";
const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const SCOPE =
  "user-read-private user-read-email playlist-read-private user-library-read";

export async function redirectToAuthCodeFlow() {
  try {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    localStorage.setItem("verifier", verifier);

    const url =
      `https://accounts.spotify.com/authorize?` +
      `client_id=${CLIENT_ID}` +
      `&response_type=code` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${encodeURIComponent(SCOPE)}` +
      `&code_challenge=${challenge}` +
      `&code_challenge_method=S256`;

    window.location.href = url;
  } catch (error) {
    console.error("Error generating PKCE challenge or redirecting:", error);
    alert(
      "An error occurred during the login redirection process. Please refresh and try again."
    );
  }
}

export async function getAccessToken(code) {
  try {
    const verifier = localStorage.getItem("verifier");
    if (!verifier)
      throw new Error(
        "Missing PKCE code verifier in localStorage. Try logging in again."
      );

    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: verifier,
    });

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(
        `Spotify token request failed: ${
          err.error_description || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to get access token:", error);
    alert(error.message || "Failed to complete login. Please try again.");
    throw error;
  }
}
