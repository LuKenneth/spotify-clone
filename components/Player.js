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
import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistsAtom";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";

const DEFAULT_VOLUME = 80;

function Player() {
  const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volumeChanged, setVolumeChanged] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [activeDevice, setActiveDevice] = useState("demo device.");
  const playlist = useRecoilValue(playlistState);
  const tub = currentTrack.name === "Crying in the Tub";
  const [trackIndex, setCurrentTrackIndex] = useState(tub ? 1 : 0);

  useEffect(() => {
    console.log(playlist);
  }, [playlist]);

  function handlePlayPause() {
    setIsPlaying(!isPlaying);
  }

  const debouncedAdjustVolume = useCallback(
    debounce(() => {}, 500),
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
            src={currentTrack?.image}
            alt=""
          />
          <div className="text-sm">
            <h3>{currentTrack?.name}</h3>
            <p className="text-gray-500">{currentTrack?.artist}</p>
          </div>
        </div>
        {/* Center */}
        <div className="flex items-center justify-evenly text-gray-500">
          <SwitchHorizontalIcon className="button ml-auto hover:text-white unsupported" />
          <RewindIcon
            className="button pl-2 w-10 hover:text-white unsupported"
            // onClick={() => skipToPrevious()}
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
            // onClick={() => skipToNext()}
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
