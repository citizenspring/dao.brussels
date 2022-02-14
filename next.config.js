module.exports = {
  images: {
    domains: [
      "lh1.googleusercontent.com",
      "lh2.googleusercontent.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "drive.dao.brussels",
          },
        ],
        permanent: false,
        destination:
          "https://drive.google.com/drive/folders/1r3kSwu8_w4ju0fn5TQOhg7HCQW2XwnmH",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "discord.dao.brussels",
          },
        ],
        permanent: false,
        destination: "https://discord.gg/awfSTf6EHK",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "youtube.dao.brussels",
          },
        ],
        permanent: false,
        destination: "https://www.youtube.com/channel/UClgbKT6NhY2Au6xn_TquBYg",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "calendar.dao.brussels",
          },
        ],
        permanent: false,
        destination:
          "https://calendar.google.com/calendar/u/0?cid=aGFpam45amUwdTJjaTllZmo3ZzBpdDh0azRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "zoom.dao.brussels",
          },
        ],
        permanent: false,
        destination: "https://us02web.zoom.us/j/6025635806",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "telegram.dao.brussels",
          },
        ],
        permanent: false,
        destination: "https://t.me/joinchat/5NbP0-Vl5Vg3MTgx",
      },
    ];
  },
};
