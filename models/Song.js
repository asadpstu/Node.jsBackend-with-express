const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    songname : String,
    singer_id : Number,
    song_type : String,
    song_duration : Number
});

//Here what we will write that will act as collection
module.exports = mongoose.model('song-heruku',SongSchema);