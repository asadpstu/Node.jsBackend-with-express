const mongoose = require('mongoose');

const SongSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    songname : {type: String, required : true},
    singer_id : {type: Number, required : true},
    song_type : {type: String, required : true},
    song_duration : {type: Number, required : true}
});

//Here what we will write that will act as collection
module.exports = mongoose.model('song-heruku',SongSchema);