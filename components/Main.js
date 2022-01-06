import { useRecoilValue } from "recoil";
import { centerState } from "../atoms/CenterAtom";
import Center from "./Center";
import Library from "./Library";

function Main() {
  const centerStateView = useRecoilValue(centerState);
  return (
    <>
      {centerStateView === "library" && <Library />}
      {centerStateView === "playlist" && <Center />}
    </>
  );
}

export default Main;
