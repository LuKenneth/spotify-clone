export default function helloAPI(req, res) {
  res.status(200).json({
    display_name: "Luke Patterson",
    external_urls: {
      spotify: "https://open.spotify.com/user/1244247689",
    },
    followers: {
      href: null,
      total: 32,
    },
    href: "https://api.spotify.com/v1/users/1244247689",
    id: "1244247689",
    images: [
      {
        height: null,
        url: "https://i.scdn.co/image/ab6775700000ee8555c25988a6ac314394d3fbf5",
        width: null,
      },
    ],
    type: "user",
    uri: "spotify:user:1244247689",
  });
}
