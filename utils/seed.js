const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const { users, thoughts } = require('./data');

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/userdb', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected');

        // Clear existing data
        await User.deleteMany({});
        await Thought.deleteMany({});

        // Insert sample data
        await User.insertMany(users);
        await Thought.insertMany(thoughts);

        console.log('Database seeded successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.connection.close();
    }
};

seedDatabase();