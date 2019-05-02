module.exports = {
  port: parseInt(process.env.PORT) || 3000,
  mongo: process.env.MONGO_URI || `mongodb://localhost:27017/which-cat-r-u`
}
