const MongoClient = require('mongodb').MongoClient;
const fs=require('fs');
// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function getData() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Access the database and collection
    const database= client.db('Vite-news')
    const collection=database.collection('prods');
    // Query the collection and log the results
    const query = {  };
    const result = await collection.find(query).toArray();
    console.log(result);
  } catch (err) {
    console.log(err.stack);
  } finally {
    // Close the client
    await client.close();
  }

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
}

getData();
