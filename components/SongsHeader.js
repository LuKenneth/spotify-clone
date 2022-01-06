import { ClockIcon } from "@heroicons/react/outline";

function SongsHeader({ children }) {
  return (
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
      {children}
    </div>
  );
}

export default SongsHeader;
