import { atom } from "recoil";

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: "1ecJKcTVoROWKXQoqdoju6",
});

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
});
