let express = require('express');
let router = express.Router();
import githubHandler from "../services/github_handler";
import resultsService from "../services/results_service";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/event', githubHandler);

router.post('/results', resultsService.save);

module.exports = router;
