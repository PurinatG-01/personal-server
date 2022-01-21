const express = require("express")
const { ServerLogger, DiscordLogger } = require("../helper/logger.js")
const { CHOFONGSUA_WEB_HOOK_URL } = require("../config/discord")
const app = express()

const HOST = process.env.CURRENT_HOST || "localhost"
const PORT = process.env.PORT || 8080
const PUBLIC_PORT = process.env.PUBLIC_PORT || PORT

const discordLogger = new DiscordLogger({
  title: "chofongsua-personal-server",
  url: CHOFONGSUA_WEB_HOOK_URL,
})
const logger = new ServerLogger({ title: `${HOST} | personal-server` })

// # Setup middleware
app.use(express.json())
app.use((req, res, next) => {
  logger.message(`${req.method.toUpperCase()} : ${req.originalUrl}`)
  next()
})

// # Basic routes
app.post("/discord/send", (req, res) => {
  if (!req.body.userName || !req.body.message) {
    res.status(400).json({ message: "request body not found" })
  } else {
    const { userName, message } = req.body
    discordLogger.message(`[${HOST}] ${userName}: ${message}`)
    res.status(200).send({ message: "success" })
  }
})

app.get("/", (req, res) => {
  res.json({ message: "🚀 the server is up and running 🚀" })
})

// # Server started
app.listen(PORT, () => {
  logger.message(`🚀 server started on port ${PUBLIC_PORT}:${PORT} 🚀`)
  if (HOST !== "localhost") {
    discordLogger.message(
      `🚀 [${HOST}] server started on port ${PUBLIC_PORT}:${PORT} 🚀`
    )
  }
})
