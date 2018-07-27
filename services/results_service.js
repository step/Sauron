import config from "../config";
import MongoDb from "../modules/MongoDB";
import logger from "./logger";
import _ from "underscore";

export default {
    save: function (req, res, next) {
        const payload = req.body;
        logger.logSavingReports(payload);

        function transformPayload(payload) {
            return {
                id: payload.id,
                flow: Object.assign(payload.flow, { end_time: new Date().toISOString() }),
                project: _.omit(payload.project, "repo_keyword"),
                commit: payload.commit,
                repository: _.omit(payload.repository, "archive_url"),
                author: payload.author,
                pusher: payload.pusher,
                job: payload.job
            }
        }

        function insertIntoDb(data) {
            let mongo = new MongoDb(config.db.serverURL, config.db.name);
            mongo.connect().then(function () {
                return mongo.insert('results', [data]);
            }).then(function (result) {
                mongo.disconnect();
                logger.logSavedReports(data);
                res.send({err: null, result: result});
            }).catch(function(err) {
                logger.logErrorSavingReports(data, err);
                mongo.disconnect();
                res.send({err: err, result: null})
            });
        }

        insertIntoDb(transformPayload(payload));


    }
};
