const { model, Schema } = require('mongoose');

module.exports = model('ModstatsSchema',
    new Schema({
        userId: String,
        BanCount: Number,
        WarnCount: Number,
        ClaimedCount: Number,
    })
);