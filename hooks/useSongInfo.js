import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import useSpotify from "./useSpotify";

function useSongInfo() {
  const spotifyApi = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        // const trackInfo = await fetch(
        //   `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        //   {
        //     headers: {
        //       Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
        //     },
        //   }
        // ).then((res) => res.json());
        // setSongInfo(trackInfo);
        localStorage.setItem("last_trackId", currentTrackId);
      }
    };
    if (!currentTrackId) {
      const savedTrack = localStorage.getItem("last_trackId");
      setCurrentTrackId(savedTrack);
    }
    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
