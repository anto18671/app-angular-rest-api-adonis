'use strict'
const Logger = use('Logger');

class LogRoute {
  async handle ({ request }, next) {
    Logger.info(`Route ${request.method()} ${request.url()} was accessed`)
    await next()
  }
}

module.exports = LogRoute