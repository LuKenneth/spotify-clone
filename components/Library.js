import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Songs from "./Songs";
import { centerState } from "../atoms/CenterAtom";
import CenterHeader from "./CenterHeader";
import SongsHeader from "./SongsHeader";
import UserPill from "./UserPill";

function Library() {
  const centerStateView = useRecoilValue(centerState);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const data = await fetch(`/api/spotify/playlist/library`).then((res) =>
          res.json()
        );
        setTracks(data);
      } catch (err) {
        if (err.body?.error?.message === "The access token expired") {
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
  }, [centerStateView]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <UserPill />
      <CenterHeader
        playlistName={"Liked Songs"}
        description={""}
        playlistImg={
          "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
        }
        ownerImage={
          "https://i.scdn.co/image/ab6775700000ee853dcda3826f553be92b0b1b63"
        }
        ownerName={"Luke Patterson"}
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
