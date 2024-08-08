const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    friendCount: {
        type: Number,
        default: 0
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }]
});

// Method to log friend IDs
userSchema.methods.logFriendIds = function() {
    console.log(this.friends);
};

const User = mongoose.model('User', userSchema);

module.exports = User;