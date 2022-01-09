import { ChevronDownIcon } from "@heroicons/react/outline";

function UserPill() {
  return (
    <header className="absolute top-5 right-8">
      <div
        className="flex items-center bg-black text-white space-x-3 
        opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
      >
        <img
          className="rounded-full w-10 h-10"
          src="https://i.scdn.co/image/ab6775700000ee853dcda3826f553be92b0b1b63"
          alt=""
        />
        <h2>Luke Patterson</h2>
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </header>
  );
}

export default UserPill;
