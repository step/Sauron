const amqp = require('amqplib');

export default function (config, task) {
    function getRabbitMQServerURL() {
        return `amqp://${config.serverURL}`;
    }

    function logWaitingMessage() {
        console.log(`Waiting for ${config.routingKey} events. To exit press CTRL+C`);
    }

    function logMessageReceived(msg) {
        console.log("==>", msg.content.toString());
    }

    function performTask(msg) {
        logMessageReceived(msg);
        task(msg);
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
        logWaitingMessage();
        channel.bindQueue(q.queue, config.exchange, getRoutingKey());
        channel.consume(q.queue, performTask, {noAck: true});
    });
}


