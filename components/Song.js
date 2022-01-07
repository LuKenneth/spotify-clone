import { PlayIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

function Song({ track, order }) {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(track.id);
    setIsPlaying(true);
    spotifyApi
      .play({
        uris: [track.uri],
      })
      .catch((err) => {
        if (err.body.error.reason === "NO_ACTIVE_DEVICE") {
          // setIsPlaying(false);
          // alert(
          //   "Cannot find an active player. Please use spotify on another device before continuing. This app is simply a remote."
          // );
        }
      });
  };
  useEffect(() => {}, []);

  return (
    <div
      className="group grid grid-cols-2 text-gray-500 px-4 py-[2px] hover:bg-gray-800 
      rounded-lg cursor-pointer"
      onClick={playSong}
    >
      <div className="flex items-center space-x-2 py-[2px]">
        <div className="text-center text-gray-400 w-[20px] group-hover:hidden">
          {order}
        </div>
        <div className="!ml-0 text-gray-400 w-[20px] group-hover:inline hidden">
          <PlayIcon className="text-white" />
        </div>
        <img className="h-10 w-10" src={track.album.images?.[0]?.url} alt="" />
        <div>
          <p
            className={`w-36 lg:w-64 truncate text-${
              currentTrackId == track.id ? "green-500" : "white"
            }`}
          >
            {track.name}
          </p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-50">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Song;
