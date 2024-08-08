const { model, Schema } = require('mongoose');

module.exports = model('HalloweenEventSchema',
    new Schema({
        userId: String,
        lastMessageTime: Number,
        points: Number,
    })
);