const mongoose = require('mongoose');
const constants = require('../util/constants');

module.exports = {
    connectToDb: function (callback) {
        mongoose
            .connect(
                constants.URI_DB, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false
                }
            ).then((client, err) => {
                return callback(err);
            })
    }
};