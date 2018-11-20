const express = require('express');
const router = express.Router();

const order = require('../models/Order');
const song = require('../models/Song');
const mongoose = require('mongoose');



// Create product Route GET/POST/PATCH/DELETE
//Route initialization done on app.js

// http://localhost:3000/order/  Get Method {all order}
router.get('/',(req,res,next)=>{
    order.find()
    .select('song_id Quantity Country Ordername Datetime')
    .populate('song_id')
    .exec()
    .then(doc =>{
        const response = {
          total : doc.length,
          data  : doc.map(doc =>{
              return{
                  //id : doc.id,  
                  Quantity : doc.Quantity,
                  Country : doc.Country,
                  Order : doc.Ordername,
                  Date : doc.Datetime,
                  other : {
                      type : 'GET',
                      url  : 'http://localhost:3000/order/'+doc.id,
                      songdetails : doc.song_id
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


// http://localhost:3000/order   Post Method
router.post('/',(req,res,next)=>{

/*
Data Format for client  request method body
{
    "song_id": ,
    "Quantity": 2,
    "Country": "Bangladesh",
    "Ordername": "Order from Bangladesh",
    "Datetime": "2018-11-20 23:59:59"
}
*/

const neworder = new order({
    _id : new mongoose.Types.ObjectId,
    song_id : req.body.song_id,
    Quantity : req.body.Quantity,
    Country : req.body.Country,
    Ordername : req.body.Ordername,
    Datetime : req.body.Datetime
});
neworder.save().then(result =>{
    console.log(result);
    res.status(200).json({
        message : "New Order Received / Post request",
        NewOrderInformation : neworder
      });
}).catch(err =>{
    console.log(err);
    res.status(505).json({ Error: err });
});



});

// http://localhost:3000/order/{id}   Get Method
router.get('/:orderid',(req,res,next)=>{

});


// http://localhost:3000/order/{id}   Patch Method
router.patch('/:orderid',function(req, res) {

});

// Delete api:
// http://http://localhost:3000/order/{id}   Delete Method
router.delete('/:orderid',(req,res,next)=>{

});


module.exports = router;