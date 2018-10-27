export default {
  job: {
    name: 'linter'
  },
  rabbitMQ: {
    serverURL: process.env.RABBITMQ_SERVER_URL || 'localhost',
    exchange: process.env.RABBITMQ_EXCHANGE || 'task_agents',
    exchangeType: 'topic',
    routingKey: process.env.RABBITMQ_ROUTINGKEY || 'lint'
  },
  sauron: {
    postReportsUrl:
      process.env.SAURON_REPORTS_URL || 'http://localhost:3010/results'
  }
};
