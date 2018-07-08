const amqp = require('amqplib/callback_api');
import {rabbitMQ as config} from "../config.json";
import task from "../index.js";
import rabbitMQListener from "./rabbitMQ_listener";

rabbitMQListener(config, task);