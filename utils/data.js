const users = [
    {
        username: 'john_doe',
        email: 'john@example.com',
        friendCount: 1,
        friends: [], // This will be populated in seed.js
        thoughts: [] // This will be populated in seed.js
    },
    {
        username: 'jane_doe',
        email: 'jane@example.com',
        friendCount: 1,
        friends: [], // This will be populated in seed.js
        thoughts: [] // This will be populated in seed.js
    }
];

const thoughts = [
    {
        text: 'This is a thought by John.',
        username: 'john_doe',
        reactions: [
            {
                reactionBody: 'Great thought!',
                username: 'jane_doe'
            }
        ]
    },
    {
        text: 'This is a thought by Jane.',
        username: 'jane_doe',
        reactions: [
            {
                reactionBody: 'Interesting!',
                username: 'john_doe'
            }
        ]
    }
];

module.exports = { users, thoughts };