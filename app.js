const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');





//Mongo db connection
mongoose.connect('mongodb://root:12345@cluster0-shard-00-00-ecaim.mongodb.net:27017,cluster0-shard-00-01-ecaim.mongodb.net:27017,cluster0-shard-00-02-ecaim.mongodb.net:27017/Laravel-vue-song?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true',
);


// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyparser.json());




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods",'GET,POST,PUT,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
  });

const ProductRoute = require('./route/product');
const OrderRoute = require('./route/order');

app.use(morgan('dev'));
app.use('/product',ProductRoute);
app.use('/order',OrderRoute);

//Test first Default route
// app.use((req,res,next) =>{
//     res.status(200).json({
//         message : 'Server Created'
//     })
// });

//For Handling Error
app.use((req,res,next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    });
});




module.exports = app;