const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction.js');

// define schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    username: {
        type: String
    },
    reactions: [reactionSchema] // <- not working?
});

// create virtuals
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// create new model using schema
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;