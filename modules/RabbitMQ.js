const amqp = require('amqplib/callback_api');

export default class RabbitMQ {
    constructor(serverURL, exchange, exchangeType) {
        this.serverURL = serverURL;
        this.ex = exchange;
        this.exchangeType = exchangeType;
        this.conn = null;
        this.ch = null;
    }

    connect() {
        let self = this;
        return new Promise(function (resolve, reject) {
            amqp.connect(`amqp://${self.serverURL}`, function (connError, conn) {
                if (connError) {
                    reject(err);
                } else {
                    self.conn = conn;
                    conn.createChannel(function (err, ch) {
                        if (err) {
                            reject(err);
                        } else {
                            self.ch = ch;
                            self.ch.assertExchange(self.ex, self.exchangeType, {durable: false});
                            resolve(self);
                        }

                    });
                }

            });
        });
    }

    validateOpenedConnection(errorCallback) {
        if (!this.conn || !this.ch) {
            errorCallback(new Error('RabbitMQ connection not opened'));
        }
    }

    publish(key, message) {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.validateOpenedConnection(reject);
            self.ch.publish(self.ex, key, new Buffer(message));
            resolve();
        });
    }

    disconnect() {
        let self = this;
        return new Promise(function (resolve, reject) {
            self.validateOpenedConnection(reject);
            setTimeout(function () {
                self.conn.close();
                resolve();
            }, 500);
        });
    }

}

