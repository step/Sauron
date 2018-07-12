import config from "../config";
import MongoDb from "../modules/MongoDB";
import logger from "./logger";

export default {
    save: function (req, res, next) {
        const data = req.body;
        logger.logSavingReports(data);
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
};