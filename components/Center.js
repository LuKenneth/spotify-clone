import { ChevronDownIcon, PlayIcon } from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import _, { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistsAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";
import { ClockIcon } from "@heroicons/react/outline";
import PlaylistSubHeader from "./PlaylistSubHeader";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

function Center() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [playlistOwner, setPlaylistOwner] = useState(null);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const { body: currentPlaylist } = await spotifyApi.getPlaylist(
          playlistId
        );
        setPlaylist(currentPlaylist);
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
    if (spotifyApi.getAccessToken()) {
      getPlaylist();
    }
  }, [playlistId, spotifyApi]);

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black text-white space-x-3 
        opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={signOut}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-[#181818] 
        ${color} h-80 text-white p-8`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
          <p className="pt-4 sm text-gray-300">{playlist?.description}</p>
          <p className="pt-1">
            <div className="flex items-center">
              <img
                src={playlistOwner?.images?.[0].url}
                alt=""
                className="h-5 w-5 rounded-full mr-1"
              />
              {playlist?.owner.display_name}
              <span className="b p-1">&#183;</span>
              <span className="sm text-gray-300">
                {playlist?.followers.total} likes
                <span className="b p-1">&#183;</span>
                {playlist?.tracks.total}
                <span className="b p-1">&#183;</span>
                songs
              </span>
            </div>
          </p>
        </div>
      </section>

      <PlaylistSubHeader />

      <div>
        <div className="flex text-gray-400 text-sm grid grid-cols-2 p-2 px-8 mx-4">
          <div className="flex flex-r w-36 lg:w-64">
            <p className="mr-4 ml-2">#</p>
            <p>TITLE</p>
          </div>

          <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline">ALBUM</p>
            <ClockIcon className="h-5 w-5" />
          </div>
        </div>

        <hr className="border-t-[0.1px] border-gray-700 p-2 mx-4" />
        <Songs />
      </div>
    </div>
  );
}

export default Center;
