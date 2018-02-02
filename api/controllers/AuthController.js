/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {

	_config: {
		actions: false,
		shortcuts: false,
		rest: false
	},
	login: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}

			req.logIn(user, function(err) {
				if (err) res.send(err);
				return res.send({
					message: info.message,
					loggedIn: true,
					user: user,
					token: jwToken.issue({id: user.id})
				});

				res.redirect('/homepage');
			});
		})(req, res);
	},
	authenticate: function(req, res) {
		passport.authenticate('local', function(err, user, info) {
			if ((err) || (!user)) {
				return res.send({
					message: info.message,
					user: user
				});
			}
			req.logIn(user, function(err) {
				if (err) res.send(err);
				return res.send({
					message: info.message,
					user: user,
					token: jwToken.issue({id: user.id})
				});
			});
		})(req, res);
	},
	logout: function(req, res) {
		req.logout();
		res.redirect('/');
	}
};