const { model, Schema } = require('mongoose');

module.exports = model('AFKSchema',
    new Schema({
        userId: String,
        reason: String
    })
);