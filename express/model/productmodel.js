const mongoose = require('mongoose');

const pro_sch= mongoose.Schema(
    {
          Headline:{
            type: String,
            required : true,
          },
          link:{
            type: String,
            required: true,
          },
          desc:{
            type : String,
            required: true,
            default :'No description'
          },
          Image_url:{
            type: String,
            required: true,
            default :'https://github.com/pravennsubbu13/HosNet-Visualiser/blob/main/money.jpg?raw=true'
        }
    },
    {
        timestapms: true
    }
)

const prod= mongoose.model('prods',pro_sch)
module.exports = prod;

