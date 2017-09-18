// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Comments schema
var CommentSchema = new Schema({
    user_mail: {
        type: String,
        required: true,
        lowercase: true, 
        trim: true
    },
    text: {
        type: String,
        required: false
    },
    vote: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    }
});

// Restaurant Schema
var RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    product: {
        type: String,
        required: true
    },
    prodDescrip: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    photo: String,
    comments: [CommentSchema]
});

// return the model
module.exports = mongoose.model('Restaurant', RestaurantSchema);