import { signIn, useSession } from "next-auth/react";
import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { HeartIcon, RssIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import { playlistIdState } from "../atoms/playlistsAtom";
import { centerState } from "../atoms/CenterAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [centerStateView, setCenterStateView] = useRecoilState(centerState);

  useEffect(() => {
    const getPlaylists = async () => {
      try {
        const { body } = await spotifyApi.getUserPlaylists();
        setPlaylists(body.items);
      } catch (err) {
        if (err.body?.error?.message === "The access token expired") {
          signIn();
        } else {
          console.log("unknown error occurred", err);
        }
      }
    };
    if (spotifyApi.getAccessToken()) {
      getPlaylists();
    }
  }, [session, spotifyApi]);

  return (
    <div
      className="bg-black text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-800 
    overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem]
    lg:max-w-[15rem] hidden md:inline-flex pb-36"
    >
      <div className="space-y-4">
        {/* navigation section */}
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => setCenterStateView("library")}
        >
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-800" />
        {/* navigation section 2 */}
        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-green-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-blue-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-800" />

        {/* Playlists ... */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            className="cursor-pointer hover:text-white"
            onClick={() => {
              setPlaylistId(playlist.id);
              setCenterStateView("playlist");
            }}
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
