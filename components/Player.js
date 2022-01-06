import {
  VolumeUpIcon as VolumeDownIcon,
  MicrophoneIcon,
  DesktopComputerIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  FastForwardIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(80);

  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
      });

      spotifyApi.getMyCurrentPlaybackState().then((data) => {
        setIsPlaying(data.body?.is_playing);
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  }

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((err) => {});
    }, 500),
    [500]
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume, spotifyApi]);

  return (
    <div
      className="h-24 bg-[#181818] border-t-[1px] border-gray-800
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8 text-white"
    >
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-[60px] w-[60px]"
          src={songInfo?.album?.images?.[0]?.url}
          alt=""
        />
        <div className="text-sm">
          <h3>{songInfo?.name}</h3>
          <p className="text-gray-500">{songInfo?.artists?.[0].name}</p>
        </div>
      </div>
      {/* Center */}
      <div className="flex items-center justify-evenly text-gray-500">
        <SwitchHorizontalIcon className="button ml-auto hover:text-white unsupported" />
        <RewindIcon
          className="button pl-2 w-10 hover:text-white unsupported"
          //   onClick={() => spotifyApi.skipToPrevious()}
        />
        {isPlaying ? (
          <PauseIcon
            className="button w-20 h-20 px-3 text-white"
            onClick={handlePlayPause}
          />
        ) : (
          <PlayIcon
            className="button w-20 h-20 px-3 text-white"
            onClick={handlePlayPause}
          />
        )}
        <FastForwardIcon
          className="button pr-2 w-10 hover:text-white unsupported"
          onClick={() => spotifyApi.skipToNext()}
        />
        <ReplyIcon className="button mr-auto hover:text-white unsupported" />
      </div>

      {/* Right */}
      <div className=" text-gray-500 flex items-center space-x-3 md:space-x-4 justify-end">
        <MicrophoneIcon className="button hover:text-white unsupported" />
        <DesktopComputerIcon className="button hover:text-white unsupported" />
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button hover:text-white"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button hover:text-white"
        />
      </div>
    </div>
  );
}

export default Player;
