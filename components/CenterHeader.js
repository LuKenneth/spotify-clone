import { useEffect, useState } from "react";
import { shuffle } from "lodash";
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

function CenterHeader({
  playlistName,
  description,
  playlistImg,
  ownerImage,
  ownerName,
  likes,
  trackCount,
  customColor,
}) {
  const [color, setColor] = useState(null);
  useEffect(() => {
    if (!customColor) {
      setColor(shuffle(colors).pop());
    }
  }, [playlistImg]);

  return (
    <div>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-[#181818] 
        ${customColor || color} h-80 text-white p-8`}
      >
        <img className="h-44 w-44 shadow-2xl" src={playlistImg} alt="" />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text3xl xl:text-5xl font-bold">
            {playlistName}
          </h1>
          <p className="pt-4 sm text-gray-300">{description}</p>
          <p className="pt-1">
            <div className="flex items-center">
              <img
                src={ownerImage}
                alt=""
                className="h-5 w-5 rounded-full mr-1"
              />
              {ownerName}
              <span className="hidden md:inline lg:inline">
                <span className="b p-1">&#183;</span>
                <span className="sm text-gray-300">
                  {likes > -1 && (
                    <span>
                      <span>{Number(likes).toLocaleString()} likes</span>
                      <span className="b p-1">&#183;</span>
                    </span>
                  )}
                  {Number(trackCount).toLocaleString() + " "}
                  songs
                </span>
              </span>
            </div>
          </p>
        </div>
      </section>

      <PlaylistSubHeader />
    </div>
  );
}

export default CenterHeader;
