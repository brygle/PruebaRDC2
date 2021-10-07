exports.config = () => {
  if (!process.env.SERVER_ID) {
    process.env.SERVER_ID = `2000${Math.abs(Math.random()) * 9999 + 1}`
  }
}
