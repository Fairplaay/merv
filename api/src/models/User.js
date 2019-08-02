import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    avatar: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        min: 2,
        max: 255,
    },
    firstName: {
        type: String,
        min: 2,
        max: 255,
    },
    lastName: {
        type: String,
        min: 2,
        max: 255,
    },
    password: {
        type: String,
        min: 6,
        max: 1024,
    },
    role: {
        type: String,
        default: 'user',
    },
});

const User = mongoose.model('user', userSchema);
export default User;
