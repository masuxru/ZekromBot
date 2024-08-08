const { model, Schema } = require('mongoose');

module.exports = model('QuSchema',
    new Schema({
        userId: String,
        roles: Array,
    })
);