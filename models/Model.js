const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const Model = mongoose.model('Model', {
    'task': String,
    'results': String
});

module.exports = Model;
