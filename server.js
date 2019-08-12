const http = require("http")
const app  = require("./app")

// .env File
require("dotenv/config")

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
    console.log("running on port", process.env.PORT)
})