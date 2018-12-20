export default {
  job: {
    name: 'test-runner'
  },
  rabbitMQ: {
    serverURL: process.env.RABBITMQ_SERVER_URL || 'localhost',
    exchange: process.env.RABBITMQ_EXCHANGE || 'task_agents',
    exchangeType: 'topic',
    routingKey: process.env.RABBITMQ_ROUTINGKEY || 'test',
    prefetch: true,
    prefetchLimit: 1
  },
  sauron: {
    postReportsUrl:
      process.env.SAURON_REPORTS_URL || 'http://localhost:3010/results'
  },
  dependencies: ['chai'],
  debug: false
};
