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
            value: "drive.cryptoart.brussels",
          },
        ],
        permanent: false,
        destination:
          "https://drive.google.com/drive/u/0/folders/1Cb7QcW9DBMGFEWm4RI7fm4yP0H9BBU95",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "discord.cryptoart.brussels",
          },
        ],
        permanent: false,
        destination: "https://discord.gg/aj6z88CRaK",
      },
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "telegram.cryptoart.brussels",
          },
        ],
        permanent: false,
        destination: "https://t.me/joinchat/y2Ybneonmn4zZmVh",
      },
    ];
  },
};
