export default function helloAPI(req, res) {
  res.status(200).json({
    display_name: "Spotify",
    external_urls: {
      spotify: "https://open.spotify.com/user/spotify",
    },
    followers: {
      href: null,
      total: 10424880,
    },
    href: "https://api.spotify.com/v1/users/spotify",
    id: "spotify",
    images: [
      {
        height: null,
        url: "https://i.scdn.co/image/ab6775700000ee853dcda3826f553be92b0b1b63",
        width: null,
      },
    ],
    type: "user",
    uri: "spotify:user:spotify",
  });
}
