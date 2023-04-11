const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');


request.get('https://cafemutual.com/news/industry', (error, response, html) => {
  if (!error && response.statusCode === 200) {
    const $ = cheerio.load(html);
    const data = [];
    $('#articles .right').each((i, element) => {
      const article = {};
      article.Headline = $(element).find('a').text().trim();
      var desc = $(element).find('.art-desc').text().trim().replace(/\s+by.+/g, '');
      article.desc = desc
      article.link = $(element).find('a').attr('href');
      $('#articles .left').each((i, ele) => {
        article.Image_url = $(ele).find('img').attr('src');
      })
      data.push(article);
    });
    console.log(data);

    /*MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
        if (err) {
          console.log("Error connecting to Atlas:\n", err);
        } else {
          console.log("Connected to Atlas");
          const db = client.db('vite-API');
          const collection = db.collection('prods');
      
          collection.insertMany(data, function(err, result) {
            if (err) {
              console.log("Error inserting:\n", err);
            } else {
              console.log(`${result.insertedCount} documents inserted into the collection`);
              /*collection.find().toArray(function(err, docs) {
                console.log("Documents in the collection:");
                console.log(docs);
                client.close();
              });
            }
          });
        }
      });*/


      fs.writeFile('data.json', JSON.stringify(data, null, 3), (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log('Data written to file');
      });
    }
  });