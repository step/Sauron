export default {
    "job": {
        "name": "Basic"
    },
    "rabbitMQ": {
        "serverURL": process.env.RABBITMQ_SERVER_URL || "localhost",
        "exchange": process.env.RABBITMQ_EXCHANGE || "task_agents",
        "exchangeType": "topic",
        "routingKey": process.env.RABBITMQ_ROUTINGKEY || "basic"
    },
    "sauron": {
        "postReportsUrl": process.env.SAURON_REPORTS_URL || "http://f8e67dfa.ngrok.io/results"
    }
}