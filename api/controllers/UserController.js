module.exports = {

    find: function (req, res) {
        User.find().exec(function (err, users) {
            if (err) {
                console.log(err);
                res.send(400);
            } else {
                res.send(users);
            }
        })
    },
    findOne: function (req, res) {
        var id = req.params.id;
        User.findOne(id).exec(function (err, user) {
            if (err) {
                console.log(err);
                res.send(400);
            } else {
                res.send(user);
            }
        })
    },
    create: function (req, res, next) {
        var params = req.params.all();
        console.log('x');
        User.create(params, function (err, user) {
            console.log(params);
            if (err) {
                console.log(err);
                res.send(201)

            } else {
                //res.send(param);
                console.log(err);
                res.json(user);

            }

        });

    },
    update: function (req, res, next) {
        var criteria = _.merge({}, req.params.all(), req.body);
        var id = req.params.id;

        User.findOne(id, function (err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();
        });

        User.update(id, criteria, function (err, user) {

                if (user.length === 0) {

                    return res.notFound();
                }
                if (err) {
                    return next(err);

                }
                res.json(user);
            }
        );
    },

    destroy: function (req, res, next) {
        var id = req.param('id');

        if (!id) {
            return res.badRequest('No Id provided');
        }

        User.findOne(id, function (err, result) {
            if (err) return res.serverError(err);

            if (!result) return res.notFound();

            User.destroy(id, function (err) {
                if (err) {
                    return next(err);
                }
                return res.json(result);
            });
        });
    }
};

//create: function (req, res) {
//    if (req.body.password !== req.body.confirmPassword) {
//        return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
//    }
//    Users.create(req.body).exec(function (err, user) {
//        if (err) {
//            return res.json(err.status, {err: err});
//        }
//        // If user created successfuly we return user and token as response
//        if (user) {
//            // NOTE: payload is { id: user.id}
//            res.json(200, {user: user, token: jwToken.issue({id: user.id})});
//        }
//    });
//}



