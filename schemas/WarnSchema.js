const { model, Schema } = require('mongoose');

module.exports = model('WarnSchema',
    new Schema({
        userId: String,
        reasoncount: Number,
        reason: Array,
    })
);