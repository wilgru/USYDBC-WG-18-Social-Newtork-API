const { Schema, model, SchemaTypes } = require("mongoose");

// define schema
const reactionSchema = new Schema({
    reactionId: {
        type: SchemaTypes.ObjectId,
        default: () => new ObjectId()
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = reactionSchema;