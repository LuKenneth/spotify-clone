import {
  ArrowCircleDownIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { PlayIcon, StarIcon } from "@heroicons/react/solid";

function PlaylistSubHeader() {
  return (
    <div className="flex flex-center justify-between">
      <div className="text-gray-500 flex items-center pl-8 pb-4 pt-4 space-x-4">
        <div className="grid grid-cols-1 grid-rows-1 h-20 w-20 cursor-pointer unsupported">
          <StarIcon className="text-white h-20 w-20" />
          <PlayIcon className="text-green-500 cursor-pointer" />
        </div>
        <ArrowCircleDownIcon className="subheader-button unsupported" />
        <DotsHorizontalIcon className="subheader-button unsupported" />
      </div>
      <div className="hidden lg:flex text-gray-400 items-end pl-8 pb-8 space-x-8 mr-8">
        <SearchIcon className="subheader-button h-5 w-5 unsupported" />
        <div className="flex cursor-pointer unsupported">
          <p>Custom order</p>
          <ChevronDownIcon className="h-5 w-5 ml-2" />
        </div>
      </div>
    </div>
  );
}

export default PlaylistSubHeader;
