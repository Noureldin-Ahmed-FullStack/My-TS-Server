import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, 'Title is too short'] // Minimum length constraint
    },
    content: {
        type: String,
        required: true
    },
    coverImage: {
        type: String
    },
    images: [{
        type: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment', 
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to User model (author of the post)
        required: true
    }
}, { timestamps: true });
export const postModel = mongoose.model("post", postSchema)