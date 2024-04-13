var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
var Schema = mongoose.Schema;

var CategorieSchema = new Schema({
  code: {
    type: String,
    required: 'Enter the code of the Categorie please'
  },
  designation: {
    type: String
  }
});

// Appliquer le plugin de pagination au schéma
CategorieSchema.plugin(mongoosePaginate);

var Categorie = mongoose.model('Categorie', CategorieSchema);

module.exports = Categorie;
