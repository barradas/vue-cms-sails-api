/**
 * ChatController
 *
 * @description :: Server-side logic for managing chats
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	addConv: function(req, res) {
		var data_from_client = req.params.all();

		var connectedUsers = [];
		//console.log(_.size(sails.io.sockets.subs), 'sails.io.sockets');

		console.log(connectedUsers, 'SAILS IO');
		if (req.isSocket && req.method === 'POST') {

			// This is the message from connected client
			// So add new conversation
			Chat.create(data_from_client)
				.exec(function(error, data_from_client) {
					console.log(data_from_client);
					Chat.publishCreate({
						id: data_from_client.id,
						message: data_from_client.message,
						user: data_from_client.user,
						//connectedUsers: connectedUsers
					});
				});
		} else if (req.isSocket) {
			// subscribe client to model changes
			Chat.watch(req.socket);
			console.log('User subscribed to ' + req.socket.id);
		}
		///console.log(sails.sockets.subscribers());


		//sails.io.sockets.in('chat').clients(function(err, ids){
		//	"use strict";
		//	connectedUsers = ids;
		//	console.log(ids, 'users in room chat');
		//});

	}
};

