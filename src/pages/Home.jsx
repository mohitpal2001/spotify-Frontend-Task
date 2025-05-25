import React, { useEffect, useState, useRef } from "react";
import PlaylistCard from "../components/PlaylistCard";
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
} from "lucide-react";

const Home = () => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [currentTrack, setCurrentTrack] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        // if (!token)
        //   throw new Error("No access token found. Please log in again.");
        if (!token) {
          alert("No valid token found. Please log in again.");
          localStorage.removeItem("access_token");
          window.location.href = "/"; // or your login route
          return;
        }

        const [playlistsRes, tracksRes] = await Promise.all([
          fetch("https://api.spotify.com/v1/me/playlists", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("https://api.spotify.com/v1/me/tracks", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (!playlistsRes.ok || !tracksRes.ok) {
          const errData = await playlistsRes.json();
          throw new Error(
            `Spotify API error: ${errData.error?.message || "Unknown error"}`
          );
        }

        const playlistsData = await playlistsRes.json();
        const tracksData = await tracksRes.json();
        console.log(playlistsData);
        console.log(tracksData);

        setPlaylists(playlistsData.items);
        setTracks(tracksData.items);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const currentTrack = tracks[currentTrackIndex];

  const playTrack = (index) => {
    if (!tracks[index].track.preview_url) {
      console.log(tracks[index]);
      alert("No preview available for this track.");
      return;
    }
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (currentTrackIndex !== null && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setIsPlaying(true);
    }
  };

  const playPrev = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setIsPlaying(true);
    }
  };

  if (loading)
    return <div className="text-white">Loading playlists and tracks...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h2 className="text-xl font-bold mb-4">Your Playlists</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>

      <h2 className="text-xl font-bold mb-4">Your Liked Tracks</h2>
      <div className="space-y-2">
        {tracks.map(({ track }, index) => (
          <div
            key={track.id}
            className={`flex items-center justify-between p-2 rounded ${
              track.preview_url
                ? "bg-gray-800 cursor-pointer"
                : "bg-gray-700 opacity-50"
            }`}
            onClick={() => track.preview_url && playTrack(index)}
          >
            <span>
              {track.name} - {track.artists[0].name}
            </span>
            <span className="text-sm">{track.album.name}</span>
          </div>
        ))}
      </div>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-900 p-4 flex items-center justify-between">
          <div>
            <p className="text-white font-bold">
              Now Playing: {currentTrack.name}
            </p>
            <p className="text-gray-400 text-sm">
              {currentTrack.artists.map((a) => a.name).join(", ")}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={playPrev}>
              <SkipBack size={24} />
            </button>
            <button onClick={togglePlay}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={playNext}>
              <SkipForward size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-2 w-64">
            <Volume2 size={20} />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              defaultValue="1"
              onChange={(e) => (audioRef.current.volume = e.target.value)}
              className="w-full"
            />
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.preview_url}
            autoPlay
            onEnded={playNext}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
