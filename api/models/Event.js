/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        type: 'string',
        author: 'string',
        title: 'string',
        description: 'string',
        location: 'string',
        date: 'date',
        visitors: {
            type: 'array',
            defaultsTo: []
        }
    },
    toJSON: function() {
        var obj = this.toObject();
        return obj;
    }
};

