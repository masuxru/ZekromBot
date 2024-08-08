const { model, Schema } = require('mongoose');

module.exports = model('MuteSchema',
    new Schema({
        userId: String,
        reason: String,
        time: Number
    })
);