const express = require('express');
const router = express.Router();

// Create product Route GET/POST/PATCH/DELETE
//Route initialization done on app.js
router.get('/',(req,res,next)=>{
    res.status(200).json({
      message : "Product / Get request"
    });
});

router.post('/',(req,res,next)=>{

    const newproduct = {
        songname : req.body.song,
        singer_id : req.body.singer_id,
        song_type : req.body.song_type,
        song_duration : req.body.duration
    };

    res.status(200).json({
      message : "Product / Post request",
      NewProduct : newproduct
    });
});

router.get('/:productid',(req,res,next)=>{

    const id = req.params.productid;
    if(id == 'SPECIAL')
    {
        res.status(200).json({
          message : "You are requesting for Special Product"
        });
    }
    else
    {
        res.status(200).json({
            message : "Specific Product -"+id
          });
    }
});

router.patch('/',(req,res,next)=>{
    res.status(200).json({
      message : "Product / Update Request"
    });
});

router.delete('/',(req,res,next)=>{
    res.status(200).json({
      message : "Product / Delete Request"
    });
});


module.exports = router;