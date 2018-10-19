module.exports = {
    find: function(req, res) {
        console.log(req.query);
        Event.find(req.query).exec(function(err, events) {
            if (err) {
                res.send(400);
            } else {
                res.send(events);
            }
        })
    },
    findOne: function(req, res) {
        var id = req.params.id;
        Event.findOne(id).exec(function(err, event) {
            if (err) {
                res.send(400);
            } else {
                res.send(event);
            }
        })
    },
    create: function(req, res, next) {
        var params = req.params.all();

        Event.create(params, function(err, event) {
            if (err) {
                res.send(201)
            } else {
                //res.send(param);
                res.json(event);
            }
        });

    },
    update: function(req, res, next) {
        var criteria = _.merge({}, req.params.all(), req.body);
        var id = req.params.id;

        Event.findOne(id, function(err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
        });

        Event.update(id, criteria, function(err, event) {
                if (event.length === 0) {
                    return res.notFound();
                }
                if (err) {
                    return next(err);
                }
                res.json(event);
            }
        );
    },
    destroy: function(req, res, next) {
        var id = req.params.id;

        if (!id) {
            return res.badRequest('No Id provided');
        }

        Event.findOne(id, function(err, result) {
            if (err) return res.serverError(err);
            if (!result) return res.notFound();
            Event.destroy(id, function(err) {
                if (err) {
                    return next(err);
                }
                return res.json(result);
            });
        });
    }
};
