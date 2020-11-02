const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: 3,
    },
},
    {
        timestamp: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
