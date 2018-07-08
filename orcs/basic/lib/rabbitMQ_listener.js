const amqp = require('amqplib');
import logger from "./logger";

export default function (config, onMessageReceivedCallback) {
    function getRabbitMQServerURL() {
        return `amqp://${config.serverURL}`;
    }

    function onMessageReceived(message) {
        onMessageReceivedCallback(message.content.toString());
    }

    function getRoutingKey() {
        return `#.${config.routingKey}.#`;
    }

    amqp.connect(getRabbitMQServerURL()).then(function (connection) {
        return connection.createChannel();
    }).then(function (channel) {
        channel.assertExchange(config.exchange, config.exchangeType, {durable: false});
        return Promise.all([channel.assertQueue('', {exclusive: true}), channel]);
    }).then(function (args) {
        const q = args[0];
        const channel = args[1];
        logger.logWaitingMessage(config.routingKey);
        channel.bindQueue(q.queue, config.exchange, getRoutingKey());
        channel.consume(q.queue, onMessageReceived, {noAck: true});
    });
}


