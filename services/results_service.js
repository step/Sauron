import {db as config} from "../config.json";
import MongoDb from "../modules/MongoDB";

export default {
    save: function (req, res, next) {
        const data = req.body;
        let mongo = new MongoDb(config.serverURL, config.name);
        mongo.connect().then(function () {
            return mongo.insert('results', [data]);
        }).then(function (result) {
            mongo.disconnect();
            res.send({err: null, result: result});
        }).catch(function(err) {
            mongo.disconnect();
            res.send({err: err, result: null})
        });
    }
};