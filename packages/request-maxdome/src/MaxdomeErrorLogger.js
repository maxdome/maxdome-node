class MaxdomeErrorLogger {
  constructor(log = console.log) {
    this.log = log;
  }

  onError(e) {
    if (e.statusCode === 403) {
      const matches = /Reference #([a-zA-Z0-9.]*)/.exec(e.message);
      if (matches) {
        this.log(`KONA error: ${matches[0]}`);
      }
    }
  }
}

module.exports = MaxdomeErrorLogger;
