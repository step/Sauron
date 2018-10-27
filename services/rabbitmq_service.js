import RabbitMQ from '../modules/RabbitMQ';
import config from '../config';

export default {
  publish: function(key, message) {
    let rabbitMQ = new RabbitMQ(
      config.rabbitMQ.serverURL,
      config.rabbitMQ.exchange,
      config.rabbitMQ.exchangeType
    );
    return rabbitMQ
      .connect()
      .then(function() {
        return rabbitMQ.publish(key, message);
      })
      .then(function() {
        rabbitMQ.disconnect();
      });
  }
};
