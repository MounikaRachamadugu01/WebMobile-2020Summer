const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/weatherdb', {useNewUrlParser: true});

mongoose.Promise = global.Promise;

const Search = require('./models/search-history').SearchHistory

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../dist')))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//for inserting data into mongodb
app.post('/api/search-history', (req, res) => {
  console.log('Post request received');
  const searchResult = req.body;
  console.log(JSON.stringify(searchResult));
  const newSearch = new Search(searchResult);
  newSearch.save().then(rec => {
    if(rec){
      res.json(rec)
    } else{
      res.json ({})
    }
  })
})

//for searching data in mongodb or get data
app.post('/api/search-history/search', (req, res) => {
  console.log('POST request for search received');
  let searchRequest = {}

  if(req.body.city){
    searchRequest.city = req.body.city
  }

  if(req.body.zipCode){
    searchRequest.zipCode = req.body.zipCode
  }

  Search.find(searchRequest).then(rec => {
    if(rec) {
      res.json(rec)
    } else{
      res.json({})
    }
  })
})

app.get('/api/search-history/delete', (req, res) => {
  Search.deleteMany({}).then(rec => {
    res.send(rec)
  })
})


app.listen(3000, () => console.log('Listening on port 3000...'))
