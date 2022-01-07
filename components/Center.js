import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistsAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { centerState } from "../atoms/CenterAtom";
import CenterHeader from "./CenterHeader";
import SongsHeader from "./SongsHeader";
import UserPill from "./UserPill";

function Center() {
  const spotifyApi = useSpotify();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlistOwner, setPlaylistOwner] = useState(null);
  const centerStateView = useRecoilValue(centerState);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const data = await fetch(`/api/spotify/playlist/${playlistId}`).then(
          (res) => res.json()
        );
        console.log(data);
        const currentPlaylist = { ...data };
        setPlaylist({ ...data });
        const { body: playlistOwner } = await spotifyApi.getUser(
          currentPlaylist?.owner.id
        );
        setPlaylistOwner(playlistOwner);
      } catch (err) {
        if (err.body?.error?.message === "The access token expired") {
          signIn();
        } else {
          console.log("unknown error occurred", err);
        }
      }
    };
    if (true) {
      if (centerStateView === "playlist") {
        getPlaylist();
      }
    }
  }, [playlistId, spotifyApi, centerStateView]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <UserPill />
      <CenterHeader
        playlistName={playlist?.name}
        description={playlist?.description}
        playlistImg={playlist?.images?.[0]?.url}
        ownerImage={playlistOwner?.images?.[0]?.url}
        ownerName={playlist?.owner.display_name}
        likes={playlist?.followers.total}
        trackCount={playlist?.tracks.total}
      />
      <SongsHeader>
        <Songs />
      </SongsHeader>
    </div>
  );
}

export default Center;
