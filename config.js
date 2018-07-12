export default {
  "rabbitMQ": {
    "serverURL": process.env.RABBITMQ_SERVER_URL || "localhost",
    "exchange": process.env.RABBITMQ_EXCHANGE || "task_agents",
    "exchangeType": "topic"
  },
  "routingKeys": {
    "sample2": "lint.test",
    "sample1": "lint.basic",
    "Go_Slack_Integration": "lint"
  },
  "db": {
    "serverURL": process.env.MONGODB_SERVER_URL || "mongodb://localhost:27017",
    "name": "sauron"
  }
}