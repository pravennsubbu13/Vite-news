const express = require('express')
const mongoose = require('mongoose');
const app = express();
const prod = require('./model/productmodel.js');

app.use(express.json()); //application can use express.json
app.get('/',(req,res)=>
{
    res.send("Hello Node api");
}) 
app.post('/prod', async (req,res)=>{
   try{
        const product = await prod.create(req.body)
        res.status(200).json(product);
        
   }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
    }
});

const uri='mongodb+srv://praveensubbu13:2JQRdJtKWahdPKcC@vite-news.naqlpey.mongodb.net/vite-API?retryWrites=true&w=majority'
mongoose.connect(uri)
.then(() => {
    console.log("Connected to Mongoose")
    app.listen(3000,()=>{
        console.log("Node API app is running");
    })

}).catch((err) => { console.log(err) })
