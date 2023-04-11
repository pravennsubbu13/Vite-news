const express = require('express')
const cheerio = require('cheerio');
const request = require('request');
const cors = require('cors');
const app = express()

app.use(cors());

const port = process.env.PORT ||  3000;
function dothis()
{
    request.get('https://cafemutual.com/news/industry',(error,response,html) => {
    if(!error && response.statusCode===200)
    {
        const $=cheerio.load(html);
        const data=[]
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
    }
    })
    return data;
}
app.get('/', (req, res) => {
    res.send('hello');
})

app.get('/industry', (req, res) => {
    const data = dothis()
    res.send(data);
})

app.listen(port,() => {
    console.log('listening on port');
})