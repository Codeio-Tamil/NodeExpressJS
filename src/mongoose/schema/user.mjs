import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    user_name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.Schema.Types.String,
    },
    googleId: {
        type: mongoose.Schema.Types.String,
        unique: true,
        sparse: true,
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: true,
        sparse: true,
    }

});

export const User = mongoose.model("User", UserSchema);