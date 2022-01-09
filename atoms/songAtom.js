import { atom } from "recoil";

export const currentTrackState = atom({
  key: "currentTrackState",
  default: {
    id: "1ecJKcTVoROWKXQoqdoju6",
    name: "Crying in the Tub",
    artist: "Who Saved Who",
    image: "https://i.scdn.co/image/ab67616d0000b273653d321acf13fe574fe54845",
  },
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
