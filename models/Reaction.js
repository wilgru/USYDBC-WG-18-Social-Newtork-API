const { Schema, SchemaTypes, Types } = require("mongoose");

// define schema
const reactionSchema = new Schema({
    reactionId: {
        type: SchemaTypes.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
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