const { Schema, model, SchemaTypes } = require("mongoose");

// define schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [function (email) {
            var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(email)
        }]
    },
    thoughts: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'Thought',
        },
    ],
    friends: [
        {
          type: SchemaTypes.ObjectId,
          ref: 'User',
        },
    ]
});

// create virtuals
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// create new model using schema
const User = model('User', userSchema);

module.exports = User;