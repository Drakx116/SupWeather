const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name : {
        type: String,
        required: "Enter a name."
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
});

export const City = mongoose.model('City', citySchema);
