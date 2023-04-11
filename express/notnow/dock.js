const fs=require('fs');

const MongoClient= require('mongodb').MongoClient;
const uri='mongodb://localhost:27017'
console.log("Soeyj")
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.error(err);
    }
    console.log('Connected to Mongo');
    const db= client.db('Vite-news')
    const collection=db.collection('prods');
    fs.readFile('./data.json',function(err, data){
        if (err) {
            console.log('Error reading');
            return
        }
        const jsson =JSON.parse(data);
        collection.insertMany(jsson,(err,result)=>{
            if (err){
                console.log('Error inserting');
            }
            console.log(`${result.insertedCount} documents inserted`);
            client.close();
        })

    })
})
