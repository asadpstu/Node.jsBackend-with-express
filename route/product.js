const express = require('express');
const router = express.Router();

const song = require('../models/Song');
const mongoose = require('mongoose');



// Create product Route GET/POST/PATCH/DELETE
//Route initialization done on app.js

// http://localhost:3000/product/  Get Method {all product}
router.get('/',(req,res,next)=>{
    song.find()
    .select('songname song_type song_duration')
    .exec()
    .then(doc =>{
        const response = {
          total : doc.length,
          data  : doc.map(doc =>{
              return{
                  //id : doc.id,  
                  name : doc.songname,
                  type : doc.song_type,
                  duration : doc.song_duration,
                  other : {
                      type : 'GET',
                      url  : 'http://localhost:3000/product/'+doc.id
                  }
              }
          })
        };
       console.log(response);
       res.status(200).json({response});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({err:err});
    });
});


// http://localhost:3000/product   Post Method
router.post('/',(req,res,next)=>{

/*
Data Format for client  request method body
{
    "song": "Amar Sombol",
    "singer_id": 17,
    "song_type": "Folk Song",
    "song_duration": 5.9
}
*/

    const newsong = new song({
        _id : new mongoose.Types.ObjectId,
        songname : req.body.song,
        singer_id : req.body.singer_id,
        song_type : req.body.song_type,
        song_duration : req.body.song_duration
    });
    newsong.save().then(result =>{
        console.log(result);
        res.status(200).json({
            message : "New Song Inserted / Post request",
            NewSongInformation : newsong
          });
    }).catch(err =>{
        console.log(err);
        res.status(505).json({ Error: err });
    });


});

// http://localhost:3000/product/{id}   Get Method
router.get('/:productid',(req,res,next)=>{

    const id = req.params.productid;
    song.findById(id)
    .exec()
    .then(doc =>{
       console.log(doc);
       if(doc)
       {
        res.status(200).json({doc});
       }
       else{
        res.status(404).json({reponse : 'Record Found Null' });  
       }
       
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({err:err});
    });
});


// http://localhost:3000/product/{id}   Patch Method
router.patch('/:productid',function(req, res) {
//data format to accept
/*
Data Format for client 
{
    "song": "Amar Sombol",
    "singer_id": 17,
    "song_type": "Folk Song",
    "song_duration": 5.9
}
*/
 
 const id = req.params.productid;
 //const props = req.body;
 const props = {
    songname : req.body.song,
    singer_id : req.body.singer_id,
    song_type : req.body.song_type,
    song_duration : req.body.song_duration
  };

 song.update({_id: id}, props, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.send(raw);
  });
});

// Delete api:
// http://http://localhost:3000/product/   Delete Method
router.delete('/:productid',(req,res,next)=>{
    const id = req.params.productid;
    song.remove({_id : id})
    .exec()
    .then(doc =>{
       console.log(doc);
       res.status(200).json({reponse : 'Document Deleted'});
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({err:err});
    });
});


module.exports = router;