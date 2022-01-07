import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { centerState } from "../atoms/CenterAtom";
import CenterHeader from "./CenterHeader";
import SongsHeader from "./SongsHeader";
import UserPill from "./UserPill";

function Library() {
  const spotifyApi = useSpotify();
  const centerStateView = useRecoilValue(centerState);
  const { data: session } = useSession();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        // const data = await spotifyApi.getMySavedTracks(session?.user?.id);
        const data = { body: {} };
        console.log(`getMySavedTracks`, data);
        setTracks(data.body);
      } catch (err) {
        if (err.body?.error?.message === "The access token expired") {
          signIn();
        } else {
          console.log("unknown error occurred", err);
        }
      }
    };
    if (true) {
      if (centerStateView === "library") {
        getTracks();
      }
    }
  }, [spotifyApi, centerStateView]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <UserPill />
      <CenterHeader
        playlistName={"Liked Songs"}
        description={""}
        playlistImg={
          "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
        }
        ownerImage={session?.user?.image}
        ownerName={session?.user?.name}
        likes={-1}
        trackCount={tracks.total}
        customColor={"from-[#4e2eb5]"}
      />
      <SongsHeader>
        <Songs customTracks={tracks.items} />
      </SongsHeader>
    </div>
  );
}

export default Library;
