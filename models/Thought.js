const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    reactionBody: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const thoughtSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema]
});

// Virtual for reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Method to format timestamp
thoughtSchema.methods.formatTimestamp = function(timestamp) {
    return timestamp.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).replace(/, (\d{4}),/, ' $1 at');
};

// Override toJSON method to include formatted timestamp for thought and reactions
thoughtSchema.methods.toJSON = function() {
    const obj = this.toObject();
    obj.formattedTimestamp = this.formatTimestamp(this.timestamp);

    if (obj.reactions) {
        obj.reactions = obj.reactions.map(reaction => {
            reaction.formattedTimestamp = this.formatTimestamp(reaction.timestamp);
            return reaction;
        });
    }

    obj.reactionCount = this.reactionCount; // Include reaction count

    return obj;
};

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;