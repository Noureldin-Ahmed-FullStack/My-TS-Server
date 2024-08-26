import mongoose from "mongoose";

const schema = new mongoose.Schema({
   
    name: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'name is too short']
    },
    email: {
        type: String,
        required: true,

    },

    About: {
        type: String,
        required: false,
        default: ""
    },
    userPFP: {
        type: String,
        required: false,
        default: ""
    },
    password: String,
    // Validated:{
    //     type:Boolean,
    //     default:false
    // },
   
    phoneNumber: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user'
    }
    ,
    decided: {
        type: Boolean,
        default: false
    },
    // pets: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'pet'
    //     },
    // ],

    // clinics: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'clinic'
    //     },
    // ]
})
export const userModel = mongoose.model("user", schema)