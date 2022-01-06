import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistsAtom";
import Song from "./Song";

function Songs({ customTracks }) {
  const playlist = useRecoilValue(playlistState);
  const songs = customTracks || playlist?.tracks.items || [];
  return (
    <div className="text-white px-8 flex flex-col space-y-1 pb-28">
      {songs.map((track, i) => (
        <Song key={track.track.id} track={track.track} order={i + 1} />
      ))}
    </div>
  );
}

export default Songs;
