const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert users
        const insertedUsers = await User.insertMany(users);

        // Insert thoughts and update users with thought IDs
        for (const thoughtData of thoughts) {
            const thought = new Thought(thoughtData);
            await thought.save();

            const user = insertedUsers.find(user => user.username === thought.username);
            user.thoughts.push(thought._id);
            await user.save();
        }

        // Update friends field
        const johnDoe = insertedUsers.find(user => user.username === 'john_doe');
        const janeDoe = insertedUsers.find(user => user.username === 'jane_doe');

        johnDoe.friends.push(janeDoe._id);
        janeDoe.friends.push(johnDoe._id);

        await johnDoe.save();
        await janeDoe.save();

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();