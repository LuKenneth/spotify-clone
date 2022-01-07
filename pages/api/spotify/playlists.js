export default function helloAPI(req, res) {
  res.status(200).json([
    {
      collaborative: false,
      description: "Bangers music picked just for you",
      external_urls: {
        spotify: "https://open.spotify.com/playlist/37i9dQZF1EIfjfKxctWGcn",
      },
      href: "https://api.spotify.com/v1/playlists/37i9dQZF1EIfjfKxctWGcn",
      id: "3",
      images: [
        {
          height: null,
          url: "https://i.scdn.co/image/ab676d630000147599607653d0a3e747904f5d4e",
          width: null,
        },
      ],
      name: "Bangers music",
      owner: {
        display_name: "Spotify",
        external_urls: {
          spotify: "https://open.spotify.com/user/spotify",
        },
        href: "https://api.spotify.com/v1/users/spotify",
        id: "3",
        type: "user",
        uri: "spotify:user:spotify",
      },
      primary_color: null,
      public: false,
      snapshot_id:
        "MTg5OTksMDAwMDAwMDA0NzE2NGMwYzVkZWIzODA3OTc2NDliNDM3MTY5MDFlZQ==",
      tracks: {
        href: "https://api.spotify.com/v1/playlists/37i9dQZF1EIfjfKxctWGcn/tracks",
        total: 50,
      },
      type: "playlist",
      uri: "spotify:playlist:37i9dQZF1EIfjfKxctWGcn",
    },
    {
      collaborative: false,
      description: "",
      external_urls: {
        spotify: "https://open.spotify.com/playlist/79Dou1buVv0OMnm8oRXM0W",
      },
      href: "https://api.spotify.com/v1/playlists/79Dou1buVv0OMnm8oRXM0W",
      id: "2",
      images: [
        {
          height: null,
          url: "https://i.scdn.co/image/ab67706c0000bebb3422a79eea3aeae0488226e5",
          width: null,
        },
      ],
      name: "shaw moves to indy",
      owner: {
        display_name: "Luke Patterson",
        external_urls: {
          spotify: "https://open.spotify.com/user/1244247689",
        },
        href: "https://api.spotify.com/v1/users/1244247689",
        id: "1",
        type: "user",
        uri: "spotify:user:1244247689",
      },
      primary_color: null,
      public: true,
      snapshot_id:
        "NDMsOTI1NjcyNDhlNDMxZTBkZmQ1MWNiYzQ0Y2UzMjM0NjI3ZWU1MjI2MA==",
      tracks: {
        href: "https://api.spotify.com/v1/playlists/79Dou1buVv0OMnm8oRXM0W/tracks",
        total: 90,
      },
      type: "playlist",
      uri: "spotify:playlist:79Dou1buVv0OMnm8oRXM0W",
    },
    {
      collaborative: false,
      description: "",
      external_urls: {
        spotify: "https://open.spotify.com/playlist/1r9yxQviERimFQLsyuJ8GW",
      },
      href: "https://api.spotify.com/v1/playlists/1r9yxQviERimFQLsyuJ8GW",
      id: "1",
      images: [
        {
          height: 640,
          url: "https://mosaic.scdn.co/640/ab67616d0000b2730011e7236c7e36e6f934248cab67616d0000b27331ca573d347fcea0dcd5e410ab67616d0000b27364255846ae3c9f12c50e75c4ab67616d0000b273a91c10fe9472d9bd89802e5a",
          width: 640,
        },
        {
          height: 300,
          url: "https://mosaic.scdn.co/300/ab67616d0000b2730011e7236c7e36e6f934248cab67616d0000b27331ca573d347fcea0dcd5e410ab67616d0000b27364255846ae3c9f12c50e75c4ab67616d0000b273a91c10fe9472d9bd89802e5a",
          width: 300,
        },
        {
          height: 60,
          url: "https://mosaic.scdn.co/60/ab67616d0000b2730011e7236c7e36e6f934248cab67616d0000b27331ca573d347fcea0dcd5e410ab67616d0000b27364255846ae3c9f12c50e75c4ab67616d0000b273a91c10fe9472d9bd89802e5a",
          width: 60,
        },
      ],
      name: "lukenneths top songs 2021",
      owner: {
        display_name: "Luke Patterson",
        external_urls: {
          spotify: "https://open.spotify.com/user/1244247689",
        },
        href: "https://api.spotify.com/v1/users/1244247689",
        id: "1",
        type: "user",
        uri: "spotify:user:1244247689",
      },
      primary_color: null,
      public: true,
      snapshot_id: "Myw5NWQ2MDk1OTM0NWZmY2QwNWJmM2Q2NWEwYzg0ODNiY2MzM2Y1NDUw",
      tracks: {
        href: "https://api.spotify.com/v1/playlists/1r9yxQviERimFQLsyuJ8GW/tracks",
        total: 101,
      },
      type: "playlist",
      uri: "spotify:playlist:1r9yxQviERimFQLsyuJ8GW",
    },
  ]);
}
