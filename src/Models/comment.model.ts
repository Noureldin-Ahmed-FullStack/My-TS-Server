import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    
    content: {
        type: String,
        required: true
    },
    
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // Reference to User model (author of the post)
        required: true
    },
    
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', // Reference to User model (author of the post)
    }
}, { timestamps: true });
export const commentModel = mongoose.model("comment", commentSchema)