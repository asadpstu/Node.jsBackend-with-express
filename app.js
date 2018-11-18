const express = require('express');
const app = express();
const morgan  = require('morgan');

const ProductRoute = require('./route/product');

app.use(morgan('dev'));
app.use('/product',ProductRoute);

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