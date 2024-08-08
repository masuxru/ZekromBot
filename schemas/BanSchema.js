const { model, Schema } = require('mongoose');

module.exports = model('BanSchema',
    new Schema({
        userId: String,
        reason: String
    })
);