const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  city:  String,
  zipCode: String,
  forecast: [
    {
      date: String,
      temperature: String,
      humidity : String,
      feelsLike : String
    }
  ]
});

const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);

module.exports = {
  SearchHistory
}
