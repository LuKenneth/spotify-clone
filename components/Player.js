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

const DEFAULT_VOLUME = 80;

function Player() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volumeChanged, setVolumeChanged] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [activeDevice, setActiveDevice] = useState(null);

  const songInfo = useSongInfo();
  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
      });
    }
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      setActiveDevice(data.body?.device?.name);
      setIsPlaying(data.body?.is_playing);
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      fetchCurrentSong();
    }
  }, [currentTrackId, spotifyApi, session]);

  function handlePlayPause() {
    spotifyApi.getMyCurrentPlaybackState().then((data) => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play().catch((err) => {
          if (err.body.error.reason === "NO_ACTIVE_DEVICE") {
            setIsPlaying(false);
            alert(
              "Cannot find an active player. Please use spotify on another device before continuing. This app is simply a remote."
            );
          }
        });
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

  function changeVolume(delta, newVolume) {
    setVolumeChanged(true);
    const changedVolume = newVolume ? newVolume + delta : volume + delta;
    setVolume(changedVolume);
  }
  useEffect(() => {
    if (volume > 0 && volume <= 100 && volumeChanged) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  return (
    <>
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
          <MicrophoneIcon className="button hover:text-white unsupported hidden md:inline lg:inline" />
          <DesktopComputerIcon className="button hover:text-white unsupported hidden md:inline lg:inline" />
          <VolumeDownIcon
            onClick={() => changeVolume(-10)}
            className="button hover:text-white"
          />
          <input
            className="w-14 md:w-28"
            type="range"
            value={volume}
            onChange={(e) =>
              volume > 0 && changeVolume(0, Number(e.target.value))
            }
            min={0}
            max={100}
          />
          <VolumeUpIcon
            onClick={() => volume < 100 && changeVolume(10)}
            className="button hover:text-white"
          />
        </div>
      </div>
      {activeDevice && (
        <div className="flex h-[25px] w-screen bg-green-500 items-center">
          <p className="text-black ml-auto mr-[40px]">{`Listening on ${activeDevice}`}</p>
        </div>
      )}
    </>
  );
}

export default Player;
