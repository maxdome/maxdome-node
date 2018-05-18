class MaxdomeErrorLogger {
  constructor({ log, logger: logger = console } = {}) {
    if (log) {
      this.logger = { log };
    } else {
      this.logger = logger;
    }
  }

  onError(e) {
    if (e.statusCode === 403) {
      const matches = /Reference #([a-zA-Z0-9.]*)/.exec(e.message);
      if (matches) {
        this.logger.log(`KONA error: ${matches[0]}`);
      }
    }
  }
}

module.exports = MaxdomeErrorLogger;
