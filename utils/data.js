const users = [
    {
        username: 'john_doe',
        email: 'john@example.com',
        friendCount: 5
    },
    {
        username: 'jane_doe',
        email: 'jane@example.com',
        friendCount: 3
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