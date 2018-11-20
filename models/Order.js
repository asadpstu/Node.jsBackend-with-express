const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    song_id : {type: mongoose.Schema.Types.ObjectId, required : true , ref: 'song-heruku'},
    Quantity : {type: Number, default: 1},
    Country : {type: String, required : true},
    Ordername : {type: String, required : true},
    Datetime : {type: String, required : true},
});

//Here what we will write that will act as collection
module.exports = mongoose.model('order-heruku',OrderSchema);