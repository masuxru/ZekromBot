const { model, Schema } = require('mongoose');

module.exports = model('zwangsSchema',
    new Schema({
        userId: String,
    })
);