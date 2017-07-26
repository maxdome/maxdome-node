class SessionOptions {
  constructor(session) {
    this.sessionId = session.sessionId;
    this.customer = {
      customerId: session.customer.customerId,
    };
  }

  toRequestOptions(options) {
    return {
      headers: {
        'mxd-session': this.sessionId,
      },
      url: {
        path: options.url.path.replace('%customerId%', this.customer.customerId),
      },
    };
  }
}

module.exports = SessionOptions;
