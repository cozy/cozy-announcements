module.exports = {
  routes: [
    {
      method: 'GET',
      path: "/public-announcements",
      handler: "announcement.public",
      config: {
        auth: false,
      },
    }
  ]
}
