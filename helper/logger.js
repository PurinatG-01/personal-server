const axios = require("axios")

class Logger {
  constructor({ title }) {
    this.title = title
    this.createdAt = new Date()
  }

  getTitle() {
    return this.title
  }
}

class ServerLogger extends Logger {
  constructor(config) {
    super(config)
  }

  message(_message) {
    if (!console) return
    console.log(`[${this.title}] `, _message)
  }

  error(_error) {
    if (!console) return
    console.error(`[${this.title}] `, _error)
  }
}

class DiscordLogger extends Logger {
  constructor(config) {
    super(config)
    this.url = config.url
  }

  async send(_messageObj) {
    try {
      const response = await axios.post(this.url, _messageObj)
    } catch (_error) {
      console.error("> error : ", error)
    }
  }

  message(_message, onSuccess, onError) {
    const messageObj = {
      embeds: [
        {
          description: _message,
          color: 16777215,
          author: {
            name: `🟢   ${this.title}  🟢`,
          },
        },
      ],
    }
    this.send(messageObj)
      .then((_data) => {
        if (onSuccess) onSuccess(_data)
      })
      .catch((_error) => {
        if (onError) onError(_error)
      })
  }

  error(_error, onSuccess, onError) {
    const messageObj = {
      embeds: [
        {
          description: _error,
          color: 16727588,
          author: {
            name: `🚨   ${this.title}  🚨 `,
          },
        },
      ],
    }
    this.send(messageObj)
      .then((_data) => {
        if (onSuccess) onSuccess(_data)
      })
      .catch((_error) => {
        if (onError) onError(_error)
      })
  }
}

module.exports = {
  Logger,
  ServerLogger,
  DiscordLogger,
}
