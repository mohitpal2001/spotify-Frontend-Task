import React from "react";

const PlaylistCard = ({ playlist }) => (
  <div className="bg-gray-800 text-white p-4 rounded-lg w-60">
    <img
      src={playlist.images[0]?.url}
      alt={playlist.name}
      className="rounded"
    />
    <h3 className="mt-2 font-semibold">{playlist.name}</h3>
  </div>
);

export default PlaylistCard;
