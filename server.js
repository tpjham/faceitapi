const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const faceitRouter = require("./faceit")

app.use(cors())
app.use(express.static("build"))
app.use(express.json())

app.use("/api/faceit/", faceitRouter)

app.use("/search/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

module.exports = app