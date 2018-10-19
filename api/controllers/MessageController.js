module.exports = {

    find: function (req, res) {
        Message.find().exec(function (err, messages) {
            if (err) {
                res.send(400);
            } else {
                res.send(messages);
            }
        })
    },
    findOne: function (req, res) {
        var id = req.params.id;
        Message.findOne(id).exec(function (err, message) {
            if (err) {
                res.send(400);
            } else {
                res.send(message);
            }
        })
    },
    create: function (req, res, next) {
        var params = req.params.all();

        Message.create(params, function (err, message) {
            if (err) {
                res.send(201)

            } else {
                //res.send(param);
                res.json(message);

            }

        });

    },
    update: function (req, res, next) {
        var criteria = _.merge({}, req.params.all(), req.body);
        var id = req.params.id;

        Message.findOne(id, function (err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();
        });

        Message.update(id, criteria, function (err, message) {

                if (message.length === 0) {

                    return res.notFound();
                }
                if (err) {
                    return next(err);

                }
                res.json(message);
            }
        );
    },

    destroy: function (req, res, next) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No Id provided');
        }

        Message.findOne(id, function (err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            Message.destroy(id, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json(result);
            });
        });
    }
};
